"use client";

import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register } from "@/features/authentication/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { User, Mail, Phone, Lock, ShieldCheck, Briefcase, Loader2 } from "lucide-react";

function SubmitButton({ isDisabled }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white disabled:opacity-50" disabled={pending || isDisabled}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Mendaftarkan...</span>
        </>
      ) : (
        "Buat Akun Petualang"
      )}
    </Button>
  );
}

function IconInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input className="pl-10" {...props} />
    </div>
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const initialState = { message: null, status: null };
  const [state, dispatch] = useFormState(register, initialState);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordRepeat: "",
  });
  const [role, setRole] = useState("user");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmit = Object.values(formData).every(Boolean);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
      setTimeout(() => {
        router.push("/auth/login?status=success_register");
      }, 1500);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="role" className="font-semibold text-slate-600">
            Daftar Sebagai
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setRole("user")}
              className={cn(
                "flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 gap-2",
                role === "user" ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-slate-50 hover:border-sky-400"
              )}
            >
              <User className={cn("h-5 w-5", role === "user" ? "text-sky-600" : "text-slate-500")} />
              <span className={cn("font-semibold", role === "user" ? "text-sky-700" : "text-slate-600")}>User</span>
            </div>
            <div
              onClick={() => setRole("admin")}
              className={cn(
                "flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 gap-2",
                role === "admin" ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-slate-50 hover:border-emerald-400"
              )}
            >
              <Briefcase className={cn("h-5 w-5", role === "admin" ? "text-emerald-600" : "text-slate-500")} />
              <span className={cn("font-semibold", role === "admin" ? "text-emerald-700" : "text-slate-600")}>Admin</span>
            </div>
          </div>
          <input type="hidden" name="role" value={role} />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <IconInput icon={User} id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
        </div>
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
            required
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
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <IconInput icon={Lock} id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passwordRepeat">Ulangi Password</Label>
          <IconInput
            icon={ShieldCheck}
            id="passwordRepeat"
            name="passwordRepeat"
            type="password"
            value={formData.passwordRepeat}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <SubmitButton isDisabled={!canSubmit} />
    </form>
  );
}
