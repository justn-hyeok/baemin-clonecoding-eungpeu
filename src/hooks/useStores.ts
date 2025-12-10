import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Store } from '../types/database';

interface UseStoresResult {
  stores: Store[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStores(): UseStoresResult {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('stores')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setStores(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return { stores, loading, error, refetch: fetchStores };
}

interface UseStoreResult {
  store: Store | null;
  loading: boolean;
  error: string | null;
}

export function useStore(storeId: string): UseStoreResult {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('stores')
          .select('*')
          .eq('id', storeId)
          .single();

        if (fetchError) throw fetchError;
        setStore(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch store');
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchStore();
    }
  }, [storeId]);

  return { store, loading, error };
}
