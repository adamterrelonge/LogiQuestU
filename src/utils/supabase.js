// src/utils/supabase.js
// Supabase client + all auth/profile helpers

import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL      = 'https://miufthxvuvhzhojugrmo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pdWZ0aHh2dXZoemhvanVncm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NDM1OTgsImV4cCI6MjA5MjIxOTU5OH0.pf3Q9xIoRBS12HUaoD4PXmNd_VrWgx8ZhvSeqMVl3fk';

// ── Client (declared first so all helpers below can use it) ────────
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Guest (anonymous) sign-in ──────────────────────────────────────
// Creates a real but anonymous Supabase session — no email needed.
// NOTE: Enable this in Supabase dashboard →
//       Authentication → Settings → Anonymous sign-ins → ON
export async function signInAsGuest() {
    const { data, error } = await supabase.auth.signInAnonymously();
    return { data, error };
}

// ── Fetch a user's profile row ─────────────────────────────────────
export async function fetchUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('nickname, profile_completed')
        .eq('user_id', userId)
        .single();

    // PGRST116 = no row found → new user, treat as incomplete
    if (error && error.code === 'PGRST116') {
        return { profile: { profile_completed: false }, error: null };
    }
    return { profile: data, error };
}

// ── Create or update a profile row ────────────────────────────────
export async function upsertUserProfile(userId, email) {
    const { data, error } = await supabase
        .from('profiles')
        .upsert(
            {
                user_id:           userId,
                email:             email,
                profile_completed: false,
                created_at:        new Date().toISOString(),
            },
            { onConflict: 'user_id' }
        )
        .select()
        .single();
    return { data, error };
}