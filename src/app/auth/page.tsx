"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "signup";
type Step = "credentials" | "otp" | "success";

const demoOtpCode = "246810";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState<Step>("credentials");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = document.cookie.includes("session=true");
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  function validatePassword(pw: string): string | null {
    if (pw.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pw)) return "Password must include an uppercase letter.";
    if (!/[a-z]/.test(pw)) return "Password must include a lowercase letter.";
    if (!/[0-9]/.test(pw)) return "Password must include a number.";
    return null;
  }

  function submitCredentials(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim() || (mode === "signup" && !fullName.trim())) {
      setError("Please complete all required fields.");
      return;
    }

    if (mode === "signup") {
      const pwError = validatePassword(password.trim());
      if (pwError) {
        setError(pwError);
        return;
      }
    }

    const existingUser = JSON.parse(localStorage.getItem("users") || "[]");

    if (mode === "signup") {
      if (existingUser.some((user: any) => user.email === email.trim())) {
        setError("Email already in use. Please log in or use a different email.");
        return;
      }
      setFullName(fullName);
    } else {
      const user = existingUser.find(
        (u: any) => u.email === email.trim() && u.password === password.trim()
      );
      if (!user) {
        setError("Invalid credentials. Please check your email and password.");
        return;
      }
      setFullName(user.fullName);
    }

    setStep("otp");
  }

  function skipOtp() {
    if (mode === "signup") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({ email, fullName, password });
      localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.setItem("fullName", fullName);
    document.cookie = "session=true; path=/; max-age=3600";
    window.location.href = "/";
  }

  function submitOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.trim() !== demoOtpCode) {
      setError("Invalid 2FA code. Try 246810 for this demo.");
      return;
    }

    if (mode === "signup") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({ email, fullName, password });
      localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.setItem("fullName", fullName);

    setError("");
    document.cookie = "session=true; path=/; max-age=3600";
    window.location.href = "/";
    setStep("success");
  }

  function resetFlow(nextMode: Mode) {
    setMode(nextMode);
    setStep("credentials");
    setEmail("");
    setPassword("");
    setFullName("");
    setOtp("");
    setError("");
  }

  return (
    <div className="space-y-10">
      <section>
        <h1 className="font-display text-3xl font-semibold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
          Secure Sign Up / Login
        </h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Simulated credentials flow plus a second-factor verification checkpoint.
        </p>
      </section>

      <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
              mode === "login"
                ? "bg-white text-slate-900 shadow-sm scale-[1.02]"
                : "text-slate-600 hover:text-slate-800"
            }`}
            onClick={() => resetFlow("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
              mode === "signup"
                ? "bg-white text-slate-900 shadow-sm scale-[1.02]"
                : "text-slate-600 hover:text-slate-800"
            }`}
            onClick={() => resetFlow("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>

        {step === "credentials" && (
          <form className="mt-5 grid gap-3" onSubmit={submitCredentials}>
            {mode === "signup" && (
              <input
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                placeholder="Full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            )}
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
              placeholder="Work email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button className="rounded-lg bg-gradient-to-r from-indigo-600 to-teal-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
              Continue to 2FA (optional)
            </button>
          </form>
        )}

        {step === "otp" && (
          <form className="mt-5 grid gap-3" onSubmit={submitOtp}>
            <p className="animate-pulse rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs text-teal-800">
              Demo verification code: {demoOtpCode}
            </p>

            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
              placeholder="Enter 2FA code"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />

            <button className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800">
              Verify and Access App
            </button>
            <button
              type="button"
              onClick={skipOtp}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Skip 2FA
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
            2FA verified. {mode === "signup" ? "Account created" : "Login successful"}.
            User can now access all internal communication features.
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}
      </section>
    </div>
  );
}