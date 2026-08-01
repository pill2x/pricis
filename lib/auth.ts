class CustomAuthClient {
  private cachedSession: any = null;

  auth = {
    getSession: async () => {
      if (this.cachedSession) {
        return { data: { session: this.cachedSession }, error: null };
      }
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          this.cachedSession = data.session;
          return { data, error: null };
        }
      } catch (e) {}
      return { data: { session: null }, error: null };
    },

    getUser: async () => {
      if (this.cachedSession) {
        return { data: { user: this.cachedSession.user || null }, error: null };
      }
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          this.cachedSession = data.session;
          return { data: { user: data.session?.user || null }, error: null };
        }
      } catch (e) {}
      return { data: { user: null }, error: null };
    },

    signInWithPassword: async ({ email, password }: any) => {
      this.cachedSession = null;
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

    signUp: async ({ email, password, options }: any) => {
      this.cachedSession = null;
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

    signOut: async () => {
      this.cachedSession = null;
      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (e) {}
      return { error: null };
    },

    signInWithOAuth: async ({ provider }: any) => {
      this.cachedSession = null;
      if (provider === "google") {
        window.location.href = "/api/auth/google";
      }
      return { data: {}, error: null };
    }
  };
}

export const supabaseAuth = new CustomAuthClient();
export const createBrowserClient = () => supabaseAuth;
