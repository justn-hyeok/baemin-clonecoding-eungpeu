import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Review, ReviewWithReplies } from '../types/database';

interface UseReviewsResult {
  reviews: ReviewWithReplies[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addReview: (content: string, rating: number) => Promise<void>;
  addReply: (parentId: string, content: string) => Promise<void>;
}

export function useReviews(storeId: string, userId?: string): UseReviewsResult {
  const [reviews, setReviews] = useState<ReviewWithReplies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all reviews for the store (including replies)
      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select(`
          *,
          user:users(id, name, email)
        `)
        .eq('store_id', storeId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Organize reviews with their replies
      const reviewsMap = new Map<string, ReviewWithReplies>();
      const topLevelReviews: ReviewWithReplies[] = [];

      // First pass: create map of all reviews
      (data || []).forEach((review: ReviewWithReplies) => {
        reviewsMap.set(review.id, { ...review, replies: [] });
      });

      // Second pass: organize into parent-child relationships
      (data || []).forEach((review: ReviewWithReplies) => {
        const reviewWithReplies = reviewsMap.get(review.id)!;
        if (review.parent_id) {
          const parent = reviewsMap.get(review.parent_id);
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(reviewWithReplies);
          }
        } else {
          topLevelReviews.push(reviewWithReplies);
        }
      });

      setReviews(topLevelReviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  const addReview = async (content: string, rating: number) => {
    if (!userId) {
      setError('User not logged in');
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('reviews')
        .insert({
          store_id: storeId,
          user_id: userId,
          content,
          rating,
        });

      if (insertError) throw insertError;
      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add review');
    }
  };

  const addReply = async (parentId: string, content: string) => {
    if (!userId) {
      setError('User not logged in');
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('reviews')
        .insert({
          store_id: storeId,
          user_id: userId,
          parent_id: parentId,
          content,
          rating: null, // Replies don't have ratings
        });

      if (insertError) throw insertError;
      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add reply');
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchReviews();
    }
  }, [storeId, fetchReviews]);

  return { reviews, loading, error, refetch: fetchReviews, addReview, addReply };
}
