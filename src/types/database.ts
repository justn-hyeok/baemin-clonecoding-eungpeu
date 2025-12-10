export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          allergies: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          allergies?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          allergies?: string[];
          created_at?: string;
        };
      };
      stores: {
        Row: {
          id: string;
          name: string;
          image: string | null;
          rating: number;
          delivery_time: string | null;
          min_order: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          image?: string | null;
          rating?: number;
          delivery_time?: string | null;
          min_order?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          image?: string | null;
          rating?: number;
          delivery_time?: string | null;
          min_order?: number | null;
          created_at?: string;
        };
      };
      menus: {
        Row: {
          id: string;
          store_id: string;
          name: string;
          price: number;
          image: string | null;
          description: string | null;
          allergies: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          name: string;
          price: number;
          image?: string | null;
          description?: string | null;
          allergies?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          name?: string;
          price?: number;
          image?: string | null;
          description?: string | null;
          allergies?: string[];
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          store_id: string;
          user_id: string;
          parent_id: string | null;
          content: string;
          rating: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          user_id: string;
          parent_id?: string | null;
          content: string;
          rating?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          user_id?: string;
          parent_id?: string | null;
          content?: string;
          rating?: number | null;
          created_at?: string;
        };
      };
    };
  };
}

// Helper types
export type Store = Database['public']['Tables']['stores']['Row'];
export type Menu = Database['public']['Tables']['menus']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type User = Database['public']['Tables']['users']['Row'];

// Extended types with relations
export interface ReviewWithReplies extends Review {
  replies?: Review[];
  user?: User;
}

export interface StoreWithDetails extends Store {
  menus?: Menu[];
  reviews?: ReviewWithReplies[];
}
