// src/utils/supabase.js
// Supabase client + profile helpers

import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL     = 'https://miufthxvuvhzhojugrmo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pdWZ0aHh2dXZoemhvanVncm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NDM1OTgsImV4cCI6MjA5MjIxOTU5OH0.pf3Q9xIoRBS12HUaoD4PXmNd_VrWgx8ZhvSeqMVl3fk';

// ── Client (declared FIRST so helpers below can use it) ────────────
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Fetch a user's profile row ─────────────────────────────────────
export async function fetchUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('nickname, profile_completed')
        .eq('user_id', userId)   // fixed: was 'user_Id' (case-sensitive in Postgres)
        .single();

    // PGRST116 = no row found → treat as incomplete profile, not an error
    if (error && error.code === 'PGRST116') {
        return { profile: { profile_completed: false }, error: null };
    }

    return { profile: data, error };
}

// ── Create or update a profile row ────────────────────────────────
// Called right after a new user signs up so Profiles table stays in sync.
export async function upsertUserProfile(userId, email) {
    const { data, error } = await supabase
        .from('profiles')
        .upsert(
            {
                user_id:           userId,
                email:             email,
                profile_completed: false,   // user fills this in later
                created_at:        new Date().toISOString(),
            },
            { onConflict: 'user_id' }       // safe to call on every login too
        )
        .select()
        .single();

    return { data, error };
}