"use client";

import { FormField } from "@/components/contact/FormField";
import { Button } from "@/components/ui/Button";
import {
  budgetRanges,
  contactContent,
  projectTypes,
} from "@/data/contact";
import {
  normalizeInquiry,
  validateInquiry,
  type InquiryFieldErrors,
  type ProjectInquiry,
} from "@/lib/inquiry";
import { useId, useState, type FormEvent } from "react";

type FormStatus =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success" }
  | { type: "error"; message: string }
  | { type: "not_configured"; message: string };

const initialValues: ProjectInquiry = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  details: "",
  projectLink: "",
  website: "",
};

export function ProjectInquiryForm() {
  const formId = useId();
  const [values, setValues] = useState<ProjectInquiry>(initialValues);
  const [errors, setErrors] = useState<InquiryFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const updateField = <K extends keyof ProjectInquiry>(
    key: K,
    value: ProjectInquiry[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.type === "submitting") return;

    const normalized = normalizeInquiry(values);
    const validation = validateInquiry(normalized);

    if (!validation.ok) {
      setErrors(validation.errors);
      setStatus({ type: "idle" });
      return;
    }

    setErrors({});
    setStatus({ type: "submitting" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
      });

      const payload = (await response.json()) as {
        status?: string;
        message?: string;
        errors?: InquiryFieldErrors;
      };

      if (response.status === 501 || payload.status === "not_configured") {
        setStatus({
          type: "not_configured",
          message: payload.message ?? contactContent.notConfiguredBody,
        });
        return;
      }

      if (response.status === 400 && payload.errors) {
        setErrors(payload.errors);
        setStatus({ type: "idle" });
        return;
      }

      if (!response.ok || payload.status === "error") {
        setStatus({
          type: "error",
          message: payload.message ?? contactContent.errorBody,
        });
        return;
      }

      setValues(initialValues);
      setStatus({ type: "success" });
    } catch {
      setStatus({
        type: "error",
        message: contactContent.errorBody,
      });
    }
  };

  if (status.type === "success") {
    return (
      <div
        className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-label text-accent">{contactContent.formEyebrow}</p>
        <h3 className="text-h3 mt-3 text-text">{contactContent.successTitle}</h3>
        <p className="text-body-lg mt-3">{contactContent.successBody}</p>
        <Button
          className="mt-6"
          variant="secondary"
          onClick={() => setStatus({ type: "idle" })}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-[var(--radius-lg)] border border-border bg-bg-elevated/80 p-5 sm:p-7"
      aria-labelledby={`${formId}-title`}
    >
      <p id={`${formId}-title`} className="text-label text-text-muted">
        {contactContent.formEyebrow}
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <FormField
          id={`${formId}-name`}
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          error={errors.name}
          required
        />

        <FormField
          id={`${formId}-email`}
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          error={errors.email}
          required
        />

        <FormField
          as="select"
          id={`${formId}-type`}
          label="Project type"
          name="projectType"
          value={values.projectType}
          onChange={(event) => updateField("projectType", event.target.value)}
          error={errors.projectType}
          required
        >
          <option value="">Select a type</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </FormField>

        <FormField
          as="select"
          id={`${formId}-budget`}
          label="Budget range (optional)"
          name="budget"
          value={values.budget ?? ""}
          onChange={(event) => updateField("budget", event.target.value)}
          error={errors.budget}
          hint="Ranges are for inquiry context only — not fixed rates."
        >
          <option value="">Select a range</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </FormField>

        <FormField
          as="textarea"
          id={`${formId}-details`}
          label="Project details"
          name="details"
          value={values.details}
          onChange={(event) => updateField("details", event.target.value)}
          error={errors.details}
          placeholder="What you need, approximate length, deliverables, references…"
          required
        />

        <FormField
          id={`${formId}-link`}
          label="Project / reference link (optional)"
          name="projectLink"
          type="url"
          inputMode="url"
          value={values.projectLink ?? ""}
          onChange={(event) => updateField("projectLink", event.target.value)}
          error={errors.projectLink}
          placeholder="https://"
        />

        {/* Honeypot */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website ?? ""}
            onChange={(event) => updateField("website", event.target.value)}
          />
        </div>
      </div>

      {status.type === "error" || status.type === "not_configured" ? (
        <div
          className="mt-5 rounded-[var(--radius-md)] border border-border-subtle bg-bg px-4 py-3"
          role="alert"
        >
          <p className="text-label text-accent">
            {status.type === "not_configured"
              ? contactContent.notConfiguredTitle
              : contactContent.errorTitle}
          </p>
          <p className="mt-2 text-body-sm text-text-secondary">
            {status.message}
          </p>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-text-muted">
          No spam. Only project-related messages.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status.type === "submitting"}
        >
          {status.type === "submitting"
            ? contactContent.submittingLabel
            : `${contactContent.submitLabel} →`}
        </Button>
      </div>
    </form>
  );
}
