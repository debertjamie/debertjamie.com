"use client";
import { useT } from "next-i18next/client";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

interface FormState {
  state: Form;
  message?: string;
}

const subjectOptions = ["general", "project", "job", "other"] as const;

interface FormDataProps {
  name: string;
  email: string;
  subject: (typeof subjectOptions)[number] | "";
  message: string;
}

const initialFormData: FormDataProps = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const fieldClass =
  "block w-full rounded-xl border border-mist-300 bg-mist-100 px-4 py-3 text-lg placeholder:text-mist-500 transition-colors hover:border-mist-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-mark";

export function EmailForm() {
  const { t } = useT("contact");
  const id = useId();
  const [formData, setFormData] = useState<FormDataProps>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<FormDataProps>>({});
  const [form, setForm] = useState<FormState>({ state: Form.Initial });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: value || name === "name" ? undefined : `${name} ${t("form.error.required")}`,
    });
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setForm({ state: Form.Loading });
    const errors = Object.values(formErrors).some((err) => err);

    if (!errors) {
      // Honeypot: hidden from people, often filled in by bots.
      const website = new FormData(e.currentTarget as HTMLFormElement).get("website") ?? "";
      const res = await fetch("/api/email", {
        body: JSON.stringify({ ...formData, website }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }).catch(() => null);

      if (res?.status === 200) {
        setFormData(initialFormData);
        setFormErrors({});
        setForm({ state: Form.Success });
      } else {
        setForm({ state: Form.Error, message: t("form.error.failed") });
      }
    } else {
      setForm({ state: Form.Error });
    }
    setTimeout(() => setForm({ state: Form.Initial }), 5000);
  }

  const allFieldsFilled =
    Boolean(formData.email.trim()) &&
    Boolean(formData.subject.trim()) &&
    Boolean(formData.message.trim());
  const allFieldsEmpty =
    !formData.name.trim() && !formData.email.trim() && !formData.subject && !formData.message.trim();
  const disabledSubmit =
    !allFieldsFilled || form.state === Form.Loading || Object.values(formErrors).some((err) => err);
  const submitLabel =
    form.state === Form.Loading
      ? t("form.submit.loading")
      : allFieldsFilled
        ? t("form.submit.complete")
        : allFieldsEmpty
          ? t("form.submit.empty")
          : t("form.submit.partial");

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t("form.title")}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="absolute left-[-9999px] size-px overflow-hidden" aria-hidden>
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-name`} className="text-base font-medium">
              {t("form.label.name")}
            </label>
            <input
              id={`${id}-name`}
              className={fieldClass}
              type="text"
              autoComplete="name"
              placeholder={t("form.placeholder.name")}
              name="name"
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-email`} className="text-base font-medium">
              {t("form.label.email")} *
            </label>
            <input
              id={`${id}-email`}
              className={fieldClass}
              type="email"
              autoComplete="email"
              placeholder={t("form.placeholder.email")}
              name="email"
              maxLength={254}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-subject`} className="text-base font-medium">
            {t("form.label.subject")} *
          </label>
          <div className="relative">
            <select
              id={`${id}-subject`}
              className={`${fieldClass} appearance-none pr-12 cursor-pointer ${formData.subject ? "" : "text-mist-500"}`}
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("form.placeholder.subject")}
              </option>
              {subjectOptions.map((option) => (
                <option key={option} value={option} className="text-mist-900">
                  {t(`form.subjects.${option}`)}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-5 text-mist-600"
              aria-hidden
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-message`} className="text-base font-medium">
            {t("form.label.message")} *
          </label>
          <textarea
            id={`${id}-message`}
            className={`${fieldClass} resize-y min-h-40`}
            placeholder={t("form.placeholder.message")}
            name="message"
            maxLength={5000}
            value={formData.message}
            onChange={handleChange}
            rows={6}
            required
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            className="rounded-full bg-mist-900 text-mist-50 px-7 py-3 text-base font-semibold transition-colors enabled:hover:bg-accent enabled:hover:text-accent-ink enabled:active:scale-[0.98] disabled:bg-mist-300 disabled:text-mist-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-mark"
            type="submit"
            disabled={disabledSubmit}
          >
            {submitLabel}
          </button>
          <p role="status" className="text-base">
            {form.state === Form.Error && (
              <span className="text-red-700 dark:text-red-400">
                {form.message ?? t("form.error.other")}
              </span>
            )}
            {form.state === Form.Success && (
              <span className="text-green-700 dark:text-green-400">{t("form.success")}</span>
            )}
          </p>
        </div>
      </form>
    </section>
  );
}
