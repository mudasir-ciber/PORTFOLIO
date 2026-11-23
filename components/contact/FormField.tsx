import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

type BaseFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
};

type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

type SelectFieldProps = BaseFieldProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    children: ReactNode;
  };

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

const controlClass =
  "w-full rounded-[var(--radius-md)] border border-border bg-bg-elevated px-4 py-3 text-body text-text outline-none transition-[border-color,background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] placeholder:text-text-muted focus:border-accent focus:shadow-[var(--focus-ring)] disabled:opacity-50";

export function FormField(props: FormFieldProps) {
  const { id, label, error, hint, className } = props;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-label text-text-muted">
        {label}
      </label>

      {props.as === "textarea" ? (
        <textarea
          {...omitFieldMeta(props)}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(controlClass, "min-h-[9rem] resize-y")}
        />
      ) : props.as === "select" ? (
        <select
          {...omitFieldMeta(props)}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(controlClass, "appearance-none pr-10")}
        >
          {props.children}
        </select>
      ) : (
        <input
          {...omitFieldMeta(props)}
          id={id}
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

function omitFieldMeta<T extends FormFieldProps>(props: T) {
  const {
    id: _id,
    label: _label,
    error: _error,
    hint: _hint,
    className: _className,
    as: _as,
    ...rest
  } = props;
  return rest;
}
