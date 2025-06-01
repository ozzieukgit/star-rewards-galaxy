
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Child {
  id: string;
  name: string;
  stars: number;
  monthly_stars: number;
  family_id: string;
  user_id?: string;
}

export interface Family {
  id: string;
  name: string;
  children: Child[];
  created_at: string;
}

export const useFamily = () => {
  const { user } = useAuth();
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.familyId) {
      loadFamily();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadFamily = async () => {
    if (!user?.familyId) return;

    try {
      // Load family details
      const { data: familyData, error: familyError } = await supabase
        .from('families')
        .select('*')
        .eq('id', user.familyId)
        .single();

      if (familyError) throw familyError;

      // Load children
      const { data: childrenData, error: childrenError } = await supabase
        .from('children')
        .select('*')
        .eq('family_id', user.familyId);

      if (childrenError) throw childrenError;

      setFamily({
        ...familyData,
        children: childrenData || []
      });
    } catch (error) {
      console.error('Error loading family:', error);
    } finally {
      setLoading(false);
    }
  };

  const createFamily = async (familyName: string, children: { name: string }[]) => {
    if (!user) return;

    try {
      // Create family
      const { data: familyData, error: familyError } = await supabase
        .from('families')
        .insert({
          name: familyName,
          created_by: user.id
        })
        .select()
        .single();

      if (familyError) throw familyError;

      // Create children
      const childrenToInsert = children.map(child => ({
        name: child.name,
        family_id: familyData.id,
        stars: 0,
        monthly_stars: 0
      }));

      const { data: childrenData, error: childrenError } = await supabase
        .from('children')
        .insert(childrenToInsert)
        .select();

      if (childrenError) throw childrenError;

      // Update user profile with family_id
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ family_id: familyData.id })
        .eq('id', user.id);

      if (profileError) throw profileError;

      const newFamily = {
        ...familyData,
        children: childrenData || []
      };

      setFamily(newFamily);
      return newFamily;
    } catch (error) {
      console.error('Error creating family:', error);
      throw error;
    }
  };

  const addStarsToChild = async (childId: string, stars: number, reason: string) => {
    if (!user) return;

    try {
      // Create star transaction
      const { error: transactionError } = await supabase
        .from('star_transactions')
        .insert({
          child_id: childId,
          stars,
          reason,
          created_by: user.id
        });

      if (transactionError) throw transactionError;

      // Update child stars
      const { error: updateError } = await supabase
        .from('children')
        .update({
          stars: supabase.rpc('increment_stars', { child_id: childId, amount: stars }),
          monthly_stars: supabase.rpc('increment_monthly_stars', { child_id: childId, amount: stars })
        })
        .eq('id', childId);

      if (updateError) {
        // Fallback: fetch current values and update
        const { data: currentChild } = await supabase
          .from('children')
          .select('stars, monthly_stars')
          .eq('id', childId)
          .single();

        if (currentChild) {
          await supabase
            .from('children')
            .update({
              stars: currentChild.stars + stars,
              monthly_stars: currentChild.monthly_stars + stars
            })
            .eq('id', childId);
        }
      }

      // Reload family data
      await loadFamily();
    } catch (error) {
      console.error('Error adding stars:', error);
      throw error;
    }
  };

  return {
    family,
    loading,
    createFamily,
    addStarsToChild,
    reloadFamily: loadFamily
  };
};
