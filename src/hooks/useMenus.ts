import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Menu } from '../types/database';

interface UseMenusResult {
  menus: Menu[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMenus(storeId: string): UseMenusResult {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('menus')
        .select('*')
        .eq('store_id', storeId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      setMenus(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menus');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchMenus();
    }
  }, [storeId]);

  return { menus, loading, error, refetch: fetchMenus };
}

interface UseMenuResult {
  menu: Menu | null;
  loading: boolean;
  error: string | null;
}

export function useMenu(menuId: string): UseMenuResult {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('menus')
          .select('*')
          .eq('id', menuId)
          .single();

        if (fetchError) throw fetchError;
        setMenu(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch menu');
      } finally {
        setLoading(false);
      }
    };

    if (menuId) {
      fetchMenu();
    }
  }, [menuId]);

  return { menu, loading, error };
}
