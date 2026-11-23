import { cn } from "@/lib/utils";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type BaseFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  required?: boolean;
};

type InputFieldProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
    as?: "input";
  };

type TextareaFieldProps = BaseFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> & {
    as: "textarea";
  };

type SelectFieldProps = BaseFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className"> & {
    as: "select";
    children: ReactNode;
  };

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

const controlClass =
  "w-full rounded-[var(--radius-md)] border border-border bg-bg-elevated px-4 py-3 text-body text-text outline-none transition-[border-color,background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] placeholder:text-text-muted focus:border-accent focus:shadow-[var(--focus-ring)] disabled:opacity-50";

const metaKeys = [
  "id",
  "label",
  "error",
  "hint",
  "className",
  "as",
  "required",
  "children",
] as const;

export function FormField(props: FormFieldProps) {
  const { id, label, error, hint, className, required } = props;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const nativeProps = omitMeta(props);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-label text-text-muted">
        {label}
        {required ? (
          <span className="text-accent" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>

      {props.as === "textarea" ? (
        <textarea
          {...(nativeProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={id}
          required={required}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(controlClass, "min-h-[9rem] resize-y")}
        />
      ) : props.as === "select" ? (
        <select
          {...(nativeProps as SelectHTMLAttributes<HTMLSelectElement>)}
          id={id}
          required={required}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(controlClass, "appearance-none pr-10")}
        >
          {props.children}
        </select>
      ) : (
        <input
          {...(nativeProps as InputHTMLAttributes<HTMLInputElement>)}
          id={id}
          required={required}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={controlClass}
        />
      )}

      {hint && !error ? (
        <p id={`${id}-hint`} className="text-body-sm text-text-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${id}-error`} className="text-body-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function omitMeta(props: FormFieldProps) {
  const rest: Record<string, unknown> = { ...props };
  for (const key of metaKeys) {
    delete rest[key];
  }
  return rest;
}
