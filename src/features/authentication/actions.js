"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function apiAuth(endpoint, rawData) {
  const baseUrl =
    process.env.API_BASE_URL ||
    "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1";
  const apiKey = process.env.API_KEY || "24405e01-fbc1-45a5-9f5a-be13afcd757c";

  const fullUrl = `${baseUrl}${endpoint}`;

  // 🔍 Debug logging
  console.log("🌐 API Call Details:");
  console.log("   URL:", fullUrl);
  console.log("   Method: POST");
  console.log("   Payload:", JSON.stringify(rawData, null, 2));

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        apiKey: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawData),
    });

    const result = await response.json();

    // 🔍 Response logging
    console.log("📡 API Response:");
    console.log("   Status:", response.status);
    console.log("   OK:", response.ok);
    console.log("   Result:", JSON.stringify(result, null, 2));

    // Better error handling based on response status
    if (!response.ok) {
      console.error("❌ API Error:", result);
      return {
        ok: false,
        status: "error",
        message: result.message || `Server error: ${response.status}`,
        code: response.status,
      };
    }

    console.log("✅ API Success");
    return { ok: true, ...result };
  } catch (error) {
    console.error("🚨 Network Error:", error);
    return {
      ok: false,
      status: "error",
      message: "Gagal terhubung ke server. Periksa koneksi internet Anda.",
      code: "NETWORK_ERROR",
    };
  }
}

// Validation helpers
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password && password.length >= 6;
}

function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  return phoneRegex.test(phoneNumber.replace(/[\s-]/g, ""));
}

function sanitizeInput(input) {
  return input?.toString().trim() || "";
}

export async function login(prevState, formData) {
  console.log("🔐 Login attempt started");

  try {
    const email = sanitizeInput(formData.get("email"));
    const password = sanitizeInput(formData.get("password"));
    const callbackUrl = sanitizeInput(formData.get("callbackUrl"));

    console.log("📝 Login data:", { email, callbackUrl });

    // Server-side validation
    if (!email || !password) {
      return {
        status: "error",
        message: "Email dan password wajib diisi.",
      };
    }

    if (!validateEmail(email)) {
      return {
        status: "error",
        message: "Format email tidak valid.",
      };
    }

    if (!validatePassword(password)) {
      return {
        status: "error",
        message: "Password minimal 6 karakter.",
      };
    }

    const result = await apiAuth("/login", { email, password });

    if (!result.ok) {
      // More specific error messages
      let errorMessage = result.message || "Login gagal.";
      if (
        result.code === 401 ||
        errorMessage.toLowerCase().includes("unauthorized")
      ) {
        errorMessage = "Email atau password salah.";
      }
      return {
        status: "error",
        message: errorMessage,
      };
    }

    if (!result.data || !result.data.token || !result.data.user) {
      return {
        status: "error",
        message: "Respons server tidak valid.",
      };
    }

    const { token, user } = result.data;

    const cookieOptions = {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    };

    cookies().set("token", token, cookieOptions);
    cookies().set("userName", user.name, { ...cookieOptions, httpOnly: false }); // Allow client access for display
    cookies().set("role", user.role, cookieOptions);
    cookies().set("userId", user.id?.toString() || "", cookieOptions);

    console.log("✅ Login successful for:", user.name);

    return {
      status: "success",
      message: `Selamat datang, ${user.name}!`,
      callbackUrl: callbackUrl || "/dashboard",
    };
  } catch (error) {
    console.error("🚨 Login error:", error);
    return {
      status: "error",
      message: "Terjadi kesalahan sistem. Silakan coba lagi.",
    };
  }
}

export async function register(prevState, formData) {
  console.log("📝 Register attempt started");

  try {
    const name = sanitizeInput(formData.get("name"));
    const email = sanitizeInput(formData.get("email"));
    const phoneNumber = sanitizeInput(formData.get("phoneNumber"));
    const password = sanitizeInput(formData.get("password"));
    const passwordRepeat = sanitizeInput(formData.get("passwordRepeat"));
    const role = sanitizeInput(formData.get("role")) || "user";

    // Comprehensive validation
    if (!name || !email || !phoneNumber || !password || !passwordRepeat) {
      return { status: "error", message: "Semua field wajib diisi." };
    }
    if (name.length < 2) {
      return { status: "error", message: "Nama minimal 2 karakter." };
    }
    if (!validateEmail(email)) {
      return { status: "error", message: "Format email tidak valid." };
    }
    if (!validatePhoneNumber(phoneNumber)) {
      return {
        status: "error",
        message:
          "Format nomor telepon tidak valid. Gunakan format Indonesia (08xxxxxxxxxx).",
      };
    }
    if (!validatePassword(password)) {
      return { status: "error", message: "Password minimal 6 karakter." };
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return {
        status: "error",
        message:
          "Password harus mengandung huruf besar, huruf kecil, dan angka.",
      };
    }
    if (password !== passwordRepeat) {
      return {
        status: "error",
        message: "Password dan konfirmasi password tidak cocok.",
      };
    }
    if (!["user", "admin"].includes(role)) {
      return { status: "error", message: "Role tidak valid." };
    }

    const firstInitial = name.charAt(0).toUpperCase();
    const dataToSend = {
      email,
      name,
      password,
      passwordRepeat,
      role,
      phoneNumber: phoneNumber.replace(/[\s-]/g, ""),
      profilePictureUrl: `https://placehold.co/200x200/E2E8F0/4A5568?text=${firstInitial}`,
    };

    const result = await apiAuth("/register", dataToSend);

    if (!result.ok) {
      let errorMessage = result.message || "Registrasi gagal.";
      if (
        errorMessage.toLowerCase().includes("email") &&
        errorMessage.toLowerCase().includes("exist")
      ) {
        errorMessage = "Email sudah terdaftar. Gunakan email lain atau login.";
      }
      return { status: "error", message: errorMessage };
    }

    console.log("✅ Registration successful");

    return {
      status: "success",
      message: "Registrasi berhasil! Silakan login dengan akun baru Anda.",
    };
  } catch (error) {
    console.error("🚨 Registration error:", error);
    return {
      status: "error",
      message: "Terjadi kesalahan sistem. Silakan coba lagi.",
    };
  }
}

export async function logout() {
  try {
    const cookieNames = ["token", "userName", "role", "userId"];

    for (const cookieName of cookieNames) {
      cookies().delete(cookieName);
    }

    // Optional: Call API logout endpoint if it exists
    try {
      const token = cookies().get("token")?.value;
      if (token) {
        await fetch(
          `${
            process.env.API_BASE_URL ||
            "https://travel-journal-api-bootcamp.do.dibimbing.id"
          }/logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey:
                process.env.API_KEY || "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (apiError) {
      console.warn("Logout API call failed:", apiError.message);
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    redirect("/auth/login?status=logged_out");
  }
}

// Additional utility functions
export async function checkAuth() {
  try {
    const token = cookies().get("token")?.value;
    const userName = cookies().get("userName")?.value;
    const role = cookies().get("role")?.value;
    const userId = cookies().get("userId")?.value;

    if (!token || !userName || !role) {
      return { authenticated: false, user: null };
    }

    return {
      authenticated: true,
      user: {
        id: userId,
        name: userName,
        role: role,
        token: token,
      },
    };
  } catch (error) {
    console.error("Auth check error:", error);
    return { authenticated: false, user: null };
  }
}

// Environment variable checker
export async function checkEnvironment() {
  console.log("🔧 Environment Check:");
  console.log("   NODE_ENV:", process.env.NODE_ENV);
  console.log(
    "   API_BASE_URL:",
    process.env.API_BASE_URL || "NOT SET (using fallback)"
  );
  console.log(
    "   API_KEY:",
    process.env.API_KEY ? "SET" : "NOT SET (using fallback)"
  );

  return {
    apiBaseUrl:
      process.env.API_BASE_URL ||
      "https://travel-journal-api-bootcamp.do.dibimbing.id",
    apiKey: process.env.API_KEY || "24405e01-fbc1-45a5-9f5a-be13afcd757c",
    nodeEnv: process.env.NODE_ENV,
  };
}
