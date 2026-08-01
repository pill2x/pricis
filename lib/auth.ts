class CustomAuthClient {
  auth = {
    async getSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          return { data, error: null };
        }
      } catch (e) {}
      return { data: { session: null }, error: null };
    },

    async getUser() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          return { data: { user: data.session?.user || null }, error: null };
        }
      } catch (e) {}
      return { data: { user: null }, error: null };
    },

    async signInWithPassword({ email, password }: any) {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          return { data: null, error: { message: data.error || "Login failed" } };
        }
        return { data, error: null };
      } catch (e: any) {
        return { data: null, error: { message: e.message || "Network error" } };
      }
    },

    async signUp({ email, password, options }: any) {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            fullName: options?.data?.full_name || "",
            businessName: options?.data?.business_name || "",
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          return { data: { user: null }, error: { message: data.error || "Signup failed" } };
        }
        return { data: { user: { id: data.userId, email } }, error: null };
      } catch (e: any) {
        return { data: { user: null }, error: { message: e.message || "Network error" } };
      }
    },

    async signOut() {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (e) {}
      return { error: null };
    },

    async signInWithOAuth({ provider }: any) {
      if (provider === "google") {
        window.location.href = "/api/auth/google";
      }
      return { data: {}, error: null };
    }
  };
}

export const supabaseAuth = new CustomAuthClient();
export const createBrowserClient = () => supabaseAuth;
