"use client";

import { FormEvent, useState } from "react";
import { counselingPartners } from "@/lib/app-data";

export default function CounselingPage() {
  const [partner, setPartner] = useState(counselingPartners[0].name);
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitReferral(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reason.trim()) {
      return;
    }

    setSubmitted(true);
    setReason("");
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-3xl font-semibold text-slate-900">Special Counseling</h1>
        <p className="mt-2 text-sm text-slate-600">
          Connect employees with external service providers for confidential support.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {counselingPartners.map((service) => (
          <article key={service.name} className="rounded-2xl border border-slate-200 bg-white/85 p-4">
            <h2 className="font-display text-lg font-semibold text-slate-900">{service.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{service.specialty}</p>
            <p className="mt-2 text-sm text-slate-600">Response: {service.responseTime}</p>
            <a
              className="mt-3 inline-block text-sm font-medium text-teal-700 underline"
              href={service.url}
              rel="noreferrer noopener"
              target="_blank"
            >
              Visit provider
            </a>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white/85 p-5">
        <h2 className="font-display text-xl font-semibold text-slate-900">Request Referral</h2>
        <form className="mt-4 grid gap-3" onSubmit={submitReferral}>
          <select
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={partner}
            onChange={(event) => setPartner(event.target.value)}
          >
            {counselingPartners.map((service) => (
              <option key={service.name} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          <textarea
            className="min-h-24 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Briefly describe the support needed"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
          <button className="w-fit rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white">
            Submit Referral Request
          </button>
        </form>

        {submitted && (
          <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            Referral submitted to {partner}. HR will follow up with a confidential next step.
          </p>
        )}
      </section>
    </div>
  );
}
