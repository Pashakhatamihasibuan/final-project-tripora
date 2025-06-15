"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const API_CONFIG = {
  baseUrl: process.env.API_BASE_URL || "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1",
  apiKey: process.env.API_KEY || "24405e01-fbc1-45a5-9f5a-be13afcd757c",
};

async function apiAuth(endpoint, rawData) {
  const fullUrl = `${API_CONFIG.baseUrl}${endpoint}`;
  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        apiKey: API_CONFIG.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawData),
    });
    const result = await response.json();
    return { ok: response.ok, ...result };
  } catch (error) {
    return {
      ok: false,
      message: "Gagal terhubung ke server. Periksa koneksi Anda.",
    };
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const callbackUrl = formData.get("callbackUrl")?.toString().trim();

  if (!email || !password) {
    return { status: "error", message: "Email dan password wajib diisi." };
  }

  const result = await apiAuth("/login", { email, password });

  if (!result.ok) {
    return { status: "error", message: result.message || "Email atau password salah." };
  }

  const user = result.data;
  const token = result.token;

  if (!token || !user) {
    return { status: "error", message: "Respons server tidak valid." };
  }

  const cookieOptions = {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  };

  cookies().set("token", token, cookieOptions);
  cookies().set("user", JSON.stringify(user), cookieOptions);

  let redirectPath = callbackUrl || "/";
  if (!callbackUrl && user.role === "admin") {
    redirectPath = "/admin/dashboard";
  }

  return { status: "success", message: `Selamat datang, ${user.name}!`, redirectPath: redirectPath };
}

export async function register(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phoneNumber = formData.get("phoneNumber")?.toString().trim();
  const password = formData.get("password")?.toString();
  const passwordRepeat = formData.get("passwordRepeat")?.toString();

  if (password !== passwordRepeat) {
    return { status: "error", message: "Password tidak cocok." };
  }

  const dataToSend = {
    name,
    email,
    phoneNumber,
    password,
    passwordRepeat,
    role: formData.get("role") || "user",
    profilePictureUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.charAt(0))}&background=random`,
  };

  const result = await apiAuth("/register", dataToSend);

  if (!result.ok) {
    return { status: "error", message: result.message || "Registrasi gagal." };
  }

  return { status: "success", message: "Registrasi berhasil! Anda akan diarahkan ke halaman login." };
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  redirect("/");
}
