"use client";
import { useT } from "next-i18next/client";
import { ChevronDown, MessageSquare } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent, MouseEvent } from "react";

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

export function EmailForm() {
  const { t } = useT("contact");
  const [formData, setFormData] = useState<FormDataProps>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<FormDataProps>>({});
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [subjectDirection, setSubjectDirection] = useState<"above" | "below">(
    "below",
  );
  const subjectRef = useRef<HTMLDivElement>(null);
  const subjectMenuRef = useRef<HTMLDivElement>(null);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: value ? undefined : `${name} ${t("form.error.required")}`,
    });
  }

  const handleSubjectSelect = useCallback(
    (subject: (typeof subjectOptions)[number] | "") => {
      setFormData((current) => ({
        ...current,
        subject,
      }));
      setFormErrors((current) => ({
        ...current,
        subject: undefined,
      }));
      setIsSubjectOpen(false);
    },
    [],
  );

  const handleSubjectToggle = useCallback(() => {
    setIsSubjectOpen((current) => !current);
  }, []);

  const handleSubjectMouseDown = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handleSubjectToggle();
    },
    [handleSubjectToggle],
  );

  useEffect(() => {
    function handleOutsideClick(event: globalThis.MouseEvent) {
      if (
        subjectRef.current &&
        !subjectRef.current.contains(event.target as Node)
      ) {
        setIsSubjectOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSubjectOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!isSubjectOpen) {
      return;
    }

    function updateSubjectDirection() {
      const triggerElement = subjectRef.current;
      const menuElement = subjectMenuRef.current;

      if (!triggerElement || !menuElement) {
        return;
      }

      const triggerRect = triggerElement.getBoundingClientRect();
      const menuHeight = menuElement.scrollHeight;
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        setSubjectDirection("above");
      } else {
        setSubjectDirection("below");
      }
    }

    updateSubjectDirection();

    window.addEventListener("resize", updateSubjectDirection);
    window.addEventListener("scroll", updateSubjectDirection, true);

    return () => {
      window.removeEventListener("resize", updateSubjectDirection);
      window.removeEventListener("scroll", updateSubjectDirection, true);
    };
  }, [isSubjectOpen]);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setForm({ state: Form.Loading });
    const errors = Object.values(formErrors).some((err) => err);

    if (!errors) {
      const res = await fetch("/api/email", {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.status === 200) {
        setFormData(initialFormData);
        setFormErrors({});
        setForm({ state: Form.Success });
        setTimeout(() => setForm({ state: Form.Initial }), 5000);
      } else {
        setForm({ state: Form.Error, message: t("form.error.failed") });
        setTimeout(() => setForm({ state: Form.Initial }), 5000);
      }
    } else {
      setForm({ state: Form.Error });
      setTimeout(() => setForm({ state: Form.Initial }), 5000);
    }
  }

  const disabledSubmit =
    !formData.email.trim() ||
    !formData.subject.trim() ||
    !formData.message.trim() ||
    Object.values(formErrors).some((err) => err);

  const allFieldsEmpty =
    !formData.name.trim() &&
    !formData.email.trim() &&
    !formData.subject.trim() &&
    !formData.message.trim();
  const allFieldsFilled =
    Boolean(formData.email.trim()) &&
    Boolean(formData.subject.trim()) &&
    Boolean(formData.message.trim());
  const submitLabel =
    form.state === Form.Loading
      ? t("form.submit.loading")
      : allFieldsFilled
        ? t("form.submit.complete")
        : allFieldsEmpty
          ? t("form.submit.empty")
          : t("form.submit.partial");

  return (
    <section className="px-4 py-6 border rounded-xl border-mist-400 bg-mist-200">
      <div className="flex items-center gap-x-2 pl-2">
        <MessageSquare className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">{t("form.title")}</h2>
      </div>
      <form onSubmit={handleSubmit} className="text-lg mt-4 space-y-2">
        <div className="flex gap-x-4">
          <div className="w-1/2">
            <p className="text-base pl-2">{t("form.label.name")}</p>
            <input
              className="block w-full rounded-lg bg-mist-100 focus:outline-none p-2"
              type="text"
              placeholder={t("form.placeholder.name")}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <input type="text" name="honeypot" className="hidden" />
          <div className="w-1/2">
            <p className="text-base pl-2">{t("form.label.email")} *</p>
            <input
              className="block w-full rounded-lg bg-mist-100 focus:outline-none p-2"
              type="email"
              placeholder={t("form.placeholder.email")}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <p className="text-base pl-2">{t("form.label.subject")} *</p>
          <div ref={subjectRef} className="relative">
            <input type="hidden" name="subject" value={formData.subject} />
            <button
              className="block w-full cursor-pointer rounded-lg bg-mist-100 focus:outline-none px-3 py-2 text-left shadow-sm shadow-transparent transition-all duration-200 hover:bg-mist-50 focus:ring-2 focus:ring-mist-400"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isSubjectOpen}
              onMouseDown={handleSubjectMouseDown}
            >
              <span>
                {formData.subject
                  ? t(`form.subjects.${formData.subject}`)
                  : t("form.placeholder.subject")}
              </span>
              <ChevronDown
                className={`absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-mist-900 duration-200 ${isSubjectOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              ref={subjectMenuRef}
              className={`absolute left-0 right-0 z-20 overflow-hidden rounded-xl border border-mist-400 bg-mist-100 shadow-lg shadow-mist-400/10 transition-all duration-200 ${subjectDirection === "above" ? "bottom-full mb-2 origin-bottom" : "top-full mt-1 origin-top"} ${isSubjectOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"}`}
            >
              <div className="max-h-72 overflow-auto p-1">
                {subjectOptions.map((option) => {
                  const isSelected = formData.subject === option;

                  return (
                    <button
                      key={option}
                      className={`block cursor-pointer w-full rounded-md px-3 py-2 text-left transition-colors duration-150 ${isSelected ? "bg-mist-300" : "hover:bg-mist-50"}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSubjectSelect(option)}
                    >
                      {t(`form.subjects.${option}`)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-base pl-2">{t("form.label.message")} *</p>
          <textarea
            className="block w-full resize-none rounded-lg bg-mist-100 focus:outline-none p-2"
            placeholder={t("form.placeholder.message")}
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
        <button
          className="px-2 py-1 w-1/2 bg-mist-100 disabled:bg-mist-300 rounded-lg enabled:hover:scale-95 duration-200 delay-75 disabled:cursor-not-allowed"
          type="submit"
          disabled={disabledSubmit}
        >
          {submitLabel}
        </button>
        <div className="h-4">
          {form.state === Form.Error && (
            <p className="text-red-800">
              {form.message ?? t("form.error.other")}
            </p>
          )}
          {form.state === Form.Success && (
            <p className="text-green-800">{t("form.success")}</p>
          )}
        </div>
      </form>
    </section>
  );
}
