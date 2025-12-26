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
