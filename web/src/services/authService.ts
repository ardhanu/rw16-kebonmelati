import { supabase } from "@/lib/supabase";

export const authService = {
  async getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  },

  async getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async register(
    email: string,
    password: string,
    fullname: string,
    phone: string,
    rt: string
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullname,
          phone,
          rt,
        },
      },
    });

    if (error) throw error;

    // Sync to public.profiles as required by Admin Dashboard
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullname,
        role: "user",
        updated_at: new Date().toISOString(),
      });

      // If profile creation fails, we should probably warn or handle it,
      // but for now we log it. Note: RLS policies must allow insert.
      if (profileError) {
        console.error("Failed to create user profile:", profileError);
      }
    }

    return data;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    if (error) throw error;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
