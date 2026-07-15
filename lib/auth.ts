import { checkProfileExists } from "@/app/actions/db";

// Helper for generating UUIDs on the client side
function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const isBrowser = typeof window !== "undefined";

const mockAuth = {
  signUp: async ({ email, password: _password }: any) => {
    try {
      const existingUser = await checkProfileExists(email);
      if (existingUser) {
        return { data: { user: null }, error: { message: "User already exists." } };
      }
      const userId = generateUUID();
      const user = { id: userId, email };
      if (isBrowser) {
        localStorage.setItem("pricis_user", JSON.stringify(user));
      }
      return { data: { user }, error: null };
    } catch (e: any) {
      return { data: { user: null }, error: { message: e.message || "Sign up failed" } };
    }
  },
  signInWithPassword: async ({ email, password: _password }: any) => {
    try {
      const user = await checkProfileExists(email);
      if (!user) {
        return { data: { user: null }, error: { message: "User not found. Please sign up." } };
      }
      if (isBrowser) {
        localStorage.setItem("pricis_user", JSON.stringify(user));
      }
      return { data: { user, session: { user } }, error: null };
    } catch (e: any) {
      return { data: { user: null }, error: { message: e.message || "Sign in failed" } };
    }
  },
  getUser: async () => {
    if (!isBrowser) {
      return { data: { user: null }, error: null };
    }
    const stored = localStorage.getItem("pricis_user");
    if (!stored) {
      return { data: { user: null }, error: null };
    }
    try {
      const user = JSON.parse(stored);
      return { data: { user }, error: null };
    } catch {
      return { data: { user: null }, error: null };
    }
  },
  getSession: async () => {
    if (!isBrowser) {
      return { data: { session: null }, error: null };
    }
    const stored = localStorage.getItem("pricis_user");
    if (!stored) {
      return { data: { session: null }, error: null };
    }
    try {
      const user = JSON.parse(stored);
      return { data: { session: { user } }, error: null };
    } catch {
      return { data: { session: null }, error: null };
    }
  },
  signOut: async () => {
    if (isBrowser) {
      localStorage.removeItem("pricis_user");
    }
    return { error: null };
  }
};

export const supabaseAuth = {
  auth: mockAuth
};
