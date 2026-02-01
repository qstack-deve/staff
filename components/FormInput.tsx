"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import {
  UseFormRegister,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { cn } from "@/lib/utils";



interface InputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  success?: string;
  disabled?: boolean;
  validation?: object;
  className?: string;
  [key: string]: any;
}

export function FormInput<T extends FieldValues>({
  name,
  register,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  error,
  success,
  disabled = false,
  validation = {},
  className = "",
  ...props
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const getContainerClasses = () => {
    const base =
      "relative flex items-center rounded-lg transition-all duration-200 border";
    const state = error
      ? "border-red-500 bg-red-50 dark:bg-red-950/20"
      : success
      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
      : focused
      ? "border-ring bg-background/60 ring-2 ring-ring/10 shadow-sm"
      : "border-input bg-background hover:border-ring/50";
    const disabledState = disabled ? "opacity-50 cursor-not-allowed" : "";
    return cn(base, state, disabledState);
  };

  const getIconClasses = () =>
    error
      ? "text-red-500 dark:text-red-400"
      : success
      ? "text-green-500 dark:text-green-400"
      : "text-muted-foreground";

  const fieldClass = cn(
    "flex-1 px-4 py-2.5 bg-transparent outline-none text-foreground placeholder:text-muted-foreground",
    className
  );

  return (
    <div className="mb-6 w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-foreground text-left"
        >
          {label}
        </label>
      )}
      <div className={getContainerClasses()}>
        {Icon && (
          <Icon size={20} className={cn("ml-4", getIconClasses())} />
        )}
        <input
          type={inputType}
          {...register(name, validation)}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={fieldClass}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mr-4 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
          <X size={14} className="mr-1" /> {error.message}
        </p>
      )}
      {success && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center">
          <Check size={14} className="mr-1" /> {success}
        </p>
      )}
    </div>
  );
}


