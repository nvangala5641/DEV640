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

  function submitCredentials(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim() || (mode === "signup" && !fullName.trim())) {
      setError("Please complete all required fields.");
      return;
    }

    setStep("otp");
  }

  function submitOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (otp.trim() !== demoOtpCode) {
      setError("Invalid 2FA code. Try 246810 for this demo.");
      return;
    }

    setError("");
    document.cookie = "session=valid; path=/; max-age=3600"; 
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
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-3xl font-semibold text-slate-900">Secure Sign Up / Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Simulated credentials flow plus a second-factor verification checkpoint.
        </p>
      </section>

      <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white/85 p-5">
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
              mode === "login" ? "bg-white text-slate-900 shadow" : "text-slate-600"
            }`}
            onClick={() => resetFlow("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
              mode === "signup" ? "bg-white text-slate-900 shadow" : "text-slate-600"
            }`}
            onClick={() => resetFlow("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>

        {step === "credentials" && (
          <form className="mt-4 grid gap-3" onSubmit={submitCredentials}>
            {mode === "signup" && (
              <input
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            )}
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Work email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Continue to 2FA
            </button>
          </form>
        )}

        {step === "otp" && (
          <form className="mt-4 grid gap-3" onSubmit={submitOtp}>
            <p className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs text-teal-800">
              Demo verification code: {demoOtpCode}
            </p>
            <input
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Enter 2FA code"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
            <button className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">
              Verify and Access App
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
            2FA verified. {mode === "signup" ? "Account created" : "Login successful"}. User can now
            access all internal communication features.
          </div>
        )}

        {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
      </section>
    </div>
  );
}
