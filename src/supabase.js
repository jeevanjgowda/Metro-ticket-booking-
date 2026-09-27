import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase Project URL and Publishable / Anon Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://YOUR_SUPABASE_URL.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

const isConfigured = 
  supabaseUrl && 
  supabaseKey && 
  !supabaseUrl.includes("YOUR_SUPABASE_URL") && 
  !supabaseKey.includes("YOUR_SUPABASE_ANON_KEY");

// Fallback in-memory/localStorage store so the app works seamlessly even before setting up Supabase
const mockStore = {
  from(tableName) {
    return {
      async insert(items) {
        const existing = JSON.parse(localStorage.getItem(`mock_${tableName}`) || "[]");
        const newItems = items.map((item, index) => ({
          id: Date.now() + index,
          created_at: new Date().toISOString(),
          ...item
        }));
        const updated = [...existing, ...newItems];
        localStorage.setItem(`mock_${tableName}`, JSON.stringify(updated));
        return { data: newItems, error: null };
      },
      async select() {
        const data = JSON.parse(localStorage.getItem(`mock_${tableName}`) || "[]");
        // Return latest first
        return { data: [...data].reverse(), error: null };
      }
    };
  }
};

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseKey) : mockStore;
