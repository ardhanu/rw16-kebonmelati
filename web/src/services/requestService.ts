import { supabase } from "@/lib/supabase";
import { authService } from "./authService";

export interface RequestItem {
  id: number;
  created_at: string;
  status: "pending" | "approved" | "rejected";
  notes: string;
  service_type: {
    name: string;
  };
}

export const requestService = {
  async getServiceTypes() {
    const { data } = await supabase.from("service_types").select("*");
    return data || [];
  },

  async getMyRequests() {
    const user = await authService.getUser();
    if (!user) return [];

    const { data } = await supabase
      .from("requests")
      .select(
        `
        *,
        service_type:service_types(name)
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    return (data as RequestItem[]) || [];
  },

  async createRequest(
    serviceTypeId: number,
    notes: string,
    files: File[] = []
  ) {
    const user = await authService.getUser();
    if (!user) throw new Error("User not logged in");

    // 1. Upload Files
    const attachments: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        // Pass serviceTypeId to organize files by service
        const path = await this.uploadDocument(file, user.id, serviceTypeId);
        if (path) attachments.push(path);
      }
    }

    // 2. Create DB Record
    const { data, error } = await supabase
      .from("requests")
      .insert({
        user_id: user.id,
        service_type_id: serviceTypeId,
        notes: notes,
        status: "pending",
        attachments: attachments,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async uploadDocument(file: File, userId: string, serviceTypeId: number) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}.${fileExt}`;
    // Structure: {userId}/{serviceId}/{fileName}
    const filePath = `${userId}/${serviceTypeId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("requests") // Changed from 'documents' to 'requests'
      .upload(filePath, file);

    if (error) throw new Error(`Upload failed: ${error.message}`);
    return data.path;
  },
};
