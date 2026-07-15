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

// ── Fetch top N scores for the leaderboard ─────────────────────────
// Joins scores -> profiles to get each player's nickname.
// Adjust 'scores' / column names if your table differs.
export async function fetchLeaderboard(limit = 3) {
    const { data, error } = await supabase
        .from('scores')
        .select('score, user_id, profiles ( nickname )')
        .order('score', { ascending: false })
        .limit(limit);

    if (error) return { leaderboard: [], error };

    // Flatten the joined profile so the UI doesn't need to know about it
    const leaderboard = (data ?? []).map((row) => ({
        userId: row.user_id,
        score: row.score,
        nickname: row.profiles?.nickname ?? 'Player',
    }));

    return { leaderboard, error: null };
} 

// ── Record a wrong answer (or bump miss_count if already recorded) ─
export async function recordIncorrectAnswer(userId, subject, grade, questionId) {
    const { data: existing } = await supabase
        .from('incorrect_answers')
        .select('id, miss_count')
        .eq('user_id', userId)
        .eq('subject', subject)
        .eq('question_id', questionId)
        .maybeSingle();

    if (existing) {
        return supabase
            .from('incorrect_answers')
            .update({ miss_count: existing.miss_count + 1, last_missed_at: new Date().toISOString() })
            .eq('id', existing.id);
    }

    return supabase
        .from('incorrect_answers')
        .insert({ user_id: userId, subject, grade, question_id: questionId });
}

// ── Remove a mistake once the user answers it correctly in review ──
export async function clearIncorrectAnswer(userId, subject, questionId) {
    return supabase
        .from('incorrect_answers')
        .delete()
        .eq('user_id', userId)
        .eq('subject', subject)
        .eq('question_id', questionId);
}

// ── Fetch all recorded mistakes for a user ──────────────────────────
export async function fetchIncorrectAnswers(userId) {
    const { data, error } = await supabase
        .from('incorrect_answers')
        .select('subject, grade, question_id, miss_count')
        .eq('user_id', userId);
    return { mistakes: data ?? [], error };
} 