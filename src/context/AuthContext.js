// src/context/AuthContext.js
// Provides session, loading, isGuest, and auth actions to the whole app.

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { supabase, fetchUserProfile, upsertUserProfile } from '../utils/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [session,            setSession]            = useState(null);
    const [loading,            setLoading]            = useState(true);
    const [isProfileCompleted, setIsProfileCompleted] = useState(false);

    // isGuest is true when the current session belongs to an anonymous user.
    // Supabase sets user.is_anonymous = true for signInAnonymously() sessions.
    const [isGuest, setIsGuest] = useState(false);

    // ── 1. Subscribe to auth state changes ────────────────────────
    useEffect(() => {
        // Check for any session that already exists (e.g. app reopen)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsGuest(session?.user?.is_anonymous ?? false);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, currentSession) => {
                setSession(currentSession);

                // Keep isGuest flag in sync on every auth event
                setIsGuest(currentSession?.user?.is_anonymous ?? false);

                // Only upsert a profile row for real (non-anonymous) sign-ins
                if (event === 'SIGNED_IN' && currentSession?.user) {
                    const { user } = currentSession;
                    if (!user.is_anonymous) {
                        const { error } = await upsertUserProfile(user.id, user.email);
                        if (error) console.error('Profile upsert failed:', error.message);
                    }
                }

                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    // ── 2. Fetch profile completeness for real users ───────────────
    useEffect(() => {
        const user = session?.user ?? null;

        // Guests have no profile row — skip the fetch
        if (!user || user.is_anonymous) {
            setIsProfileCompleted(false);
            setLoading(false);
            return;
        }

        const checkProfile = async () => {
            setLoading(true);
            const { profile, error } = await fetchUserProfile(user.id);
            if (error) {
                console.error('Failed to fetch profile:', error.message);
                setIsProfileCompleted(false);
            } else {
                setIsProfileCompleted(profile?.profile_completed ?? false);
            }
            setLoading(false);
        };

        checkProfile();
    }, [session]);

    // ── 3. Sign out (works for both guests and real users) ─────────
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) Alert.alert('Sign Out Error', error.message);
    };

    const value = {
        session,
        loading,
        isGuest,               // ← use this anywhere to gate features
        isProfileCompleted,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};