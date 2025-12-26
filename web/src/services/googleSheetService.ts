export interface KegiatanItem {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  images: string[];
}

const SHEET_ID = "1hLXVuJbKvO_UW1LIvBorqyB6SfCFAtV3xqUt5BDDTtA";

interface GoogleSheetCell {
  v?: string | number;
  f?: string;
}

interface GoogleSheetRow {
  c: (GoogleSheetCell | null)[];
}

export const googleSheetService = {
  async getKegiatan(): Promise<KegiatanItem[]> {
    try {
      // Use t=${Date.now()} to prevent caching
      const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&t=${Date.now()}`;

      const response = await fetch(URL);
      if (!response.ok) throw new Error("Failed to fetch sheet");

      const text = await response.text();
      // Remove Google's JSONp wrapper
      const jsonText = text.substring(47).slice(0, -2);
      const json = JSON.parse(jsonText);

      const rows: GoogleSheetRow[] = json.table.rows;

      return rows.map((row, index) => {
        const c = row.c;
        const getVal = (idx: number) =>
          c[idx] && c[idx]?.v ? String(c[idx]?.v) : "";

        return {
          id: index + 1,
          title: getVal(0) || "Tanpa Judul",
          category: getVal(1) || "Umum",
          description: getVal(2),
          date: c[3] && c[3]?.f ? c[3]?.f : getVal(3),
          images: this.parseImages(row, 4, 5),
        };
      });
    } catch (error) {
      console.error("Error fetching sheet:", error);
      return [];
    }
  },

  parseImages(
    row: GoogleSheetRow,
    startIndex: number,
    count: number
  ): string[] {
    const images: string[] = [];
    for (let i = 0; i < count; i++) {
      const cell = row.c[startIndex + i];
      if (cell && cell.v) {
        const url = String(cell.v);
        // Filter out placeholders, booleans, and empty strings
        const lowerUrl = url.toLowerCase();
        if (
          url &&
          url.trim() !== "" &&
          url !== "[URL]" &&
          lowerUrl !== "false" &&
          lowerUrl !== "true"
        ) {
          const converted = this.convertDriveLink(url);
          if (converted) images.push(converted);
        }
      }
    }
    return images;
  },

  convertDriveLink(url: string): string | null {
    if (!url) return null;
    let cleanUrl = url.trim();

    // Check if it's a Google Drive Link
    if (cleanUrl.includes("drive.google.com") && cleanUrl.includes("/d/")) {
      const matches = cleanUrl.match(/\/d\/(.*?)(\/|$)/);
      if (matches && matches[1]) {
        return `https://drive.google.com/uc?export=view&id=${matches[1]}`;
      }
    }

    // Ensure protocol exists for external links
    if (!cleanUrl.startsWith("http") && !cleanUrl.startsWith("/")) {
      cleanUrl = `https://${cleanUrl}`;
    }

    // Basic validation to prevent crash
    try {
      new URL(cleanUrl); // Will error if invalid
      return cleanUrl;
    } catch (e) {
      console.warn("Invalid image URL:", cleanUrl);
      return null;
    }
  },
};
