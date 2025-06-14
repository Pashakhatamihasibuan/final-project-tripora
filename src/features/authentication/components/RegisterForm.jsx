"use client";

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register } from "@/features/authentication/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  Briefcase,
  Eye,
  EyeOff,
} from "lucide-react";

function SubmitButton({ isDisabled, isPending }) {
  return (
    <Button
      type="submit"
      className="w-full bg-sky-500 hover:bg-sky-600 text-white disabled:opacity-50"
      disabled={isPending || isDisabled}
    >
      {isPending ? "Mendaftarkan..." : "Buat Akun Petualang"}
    </Button>
  );
}

function IconInput({
  icon: Icon,
  showPassword,
  onTogglePassword,
  error,
  ...props
}) {
  return (
    <div className="w-full">
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
        <Input
          className={cn(
            "pl-10 w-full",
            props.type === "password" && "pr-10",
            error &&
              "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
          )}
          {...props}
        />
        {props.type === "password" && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600 z-10"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="mt-1">
          <p className="text-red-500 text-sm leading-tight">{error}</p>
        </div>
      )}
    </div>
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const initialState = { message: null, status: null };
  const [state, dispatch, isPending] = useActionState(register, initialState);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordRepeat: "",
  });
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Nama lengkap wajib diisi";
        } else if (value.trim().length < 2) {
          newErrors.name = "Nama minimal 2 karakter";
        } else {
          delete newErrors.name;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = "Email wajib diisi";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Format email tidak valid";
        } else {
          delete newErrors.email;
        }
        break;

      case "phoneNumber":
        const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
        if (!value) {
          newErrors.phoneNumber = "Nomor telepon wajib diisi";
        } else if (!phoneRegex.test(value.replace(/[\s-]/g, ""))) {
          newErrors.phoneNumber = "Format nomor telepon tidak valid";
        } else {
          delete newErrors.phoneNumber;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password wajib diisi";
        } else if (value.length < 6) {
          newErrors.password = "Password minimal 6 karakter";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password =
            "Password harus mengandung huruf besar, kecil, dan angka";
        } else {
          delete newErrors.password;
        }

        if (formData.passwordRepeat && value !== formData.passwordRepeat) {
          newErrors.passwordRepeat = "Password tidak cocok";
        } else if (
          formData.passwordRepeat &&
          value === formData.passwordRepeat
        ) {
          delete newErrors.passwordRepeat;
        }
        break;

      case "passwordRepeat":
        if (!value) {
          newErrors.passwordRepeat = "Konfirmasi password wajib diisi";
        } else if (value !== formData.password) {
          newErrors.passwordRepeat = "Password tidak cocok";
        } else {
          delete newErrors.passwordRepeat;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    const noErrors = Object.keys(errors).length === 0;
    return allFieldsFilled && noErrors;
  };

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      setTimeout(() => {
        router.push("/auth/login?status=success_register");
      }, 1500);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state, router]);

  const handleSubmit = (e) => {
    const allValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key])
    );

    if (!allValid) {
      e.preventDefault();
      setTouched(
        Object.keys(formData).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      );
      toast.error("Mohon perbaiki kesalahan pada form");
    }
  };

  return (
    <form action={dispatch} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-3">
          <Label htmlFor="role" className="font-semibold text-slate-600">
            Daftar Sebagai
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setRole("user")}
              className={cn(
                "flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 gap-2",
                role === "user"
                  ? "border-sky-500 bg-sky-50"
                  : "border-slate-200 bg-slate-50 hover:border-sky-400"
              )}
            >
              <User
                className={cn(
                  "h-5 w-5",
                  role === "user" ? "text-sky-600" : "text-slate-500"
                )}
              />
              <span
                className={cn(
                  "font-semibold",
                  role === "user" ? "text-sky-700" : "text-slate-600"
                )}
              >
                User
              </span>
            </div>
            <div
              onClick={() => setRole("admin")}
              className={cn(
                "flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 gap-2",
                role === "admin"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 bg-slate-50 hover:border-emerald-400"
              )}
            >
              <Briefcase
                className={cn(
                  "h-5 w-5",
                  role === "admin" ? "text-emerald-600" : "text-slate-500"
                )}
              />
              <span
                className={cn(
                  "font-semibold",
                  role === "admin" ? "text-emerald-700" : "text-slate-600"
                )}
              >
                Admin
              </span>
            </div>
          </div>
          <input type="hidden" name="role" value={role} />
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <IconInput
            icon={User}
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
          />
        </div>

        {/* Email and Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <IconInput
              icon={Mail}
              id="email"
              name="email"
              type="email"
              placeholder="kamu@contoh.com"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Nomor Telepon</Label>
            <IconInput
              icon={Phone}
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="08123456789"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.phoneNumber && errors.phoneNumber}
            />
          </div>
        </div>

        {/* Password Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <IconInput
              icon={Lock}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              error={touched.password && errors.password}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="passwordRepeat">Ulangi Password</Label>
            <IconInput
              icon={ShieldCheck}
              id="passwordRepeat"
              name="passwordRepeat"
              type={showPasswordRepeat ? "text" : "password"}
              value={formData.passwordRepeat}
              onChange={handleInputChange}
              onBlur={handleBlur}
              showPassword={showPasswordRepeat}
              onTogglePassword={() =>
                setShowPasswordRepeat(!showPasswordRepeat)
              }
              error={touched.passwordRepeat && errors.passwordRepeat}
            />
          </div>
        </div>
      </div>

      <SubmitButton isDisabled={!isFormValid()} isPending={isPending} />
    </form>
  );
}
