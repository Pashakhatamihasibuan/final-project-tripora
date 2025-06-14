"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom"; // Impor dari react-dom
import { toast } from "sonner";
import { login } from "@/features/authentication/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";

function SubmitButton({ isDisabled }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-sky-500 hover:bg-sky-600 text-white"
      disabled={pending || isDisabled}
    >
      {pending ? "Logging in..." : "Login"}
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

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState = { message: null, status: null, callbackUrl: null };

  const [state, dispatch] = useFormState(login, initialState);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmit = formData.email && formData.password;

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      setTimeout(() => {
        router.push(state.callbackUrl);
        router.refresh();
      }, 1000);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={dispatch} className="space-y-6">
      {/* Menggunakan hidden input untuk membawa callbackUrl */}
      {callbackUrl && (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      )}

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
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <IconInput
          icon={Lock}
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <SubmitButton isDisabled={!canSubmit} />
    </form>
  );
}
