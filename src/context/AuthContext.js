// src/context/AuthContext.js
// Provides session, loading state, and auth actions to the whole app.

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { supabase, fetchUserProfile, upsertUserProfile } from '../utils/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [session,            setSession]            = useState(null);
    const [loading,            setLoading]            = useState(true);
    const [isProfileCompleted, setIsProfileCompleted] = useState(false);

    // ── 1. Listen for auth state changes ──────────────────────────
    useEffect(() => {
        // Grab any existing session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Subscribe to future changes (login / logout / token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, currentSession) => {
                setSession(currentSession);

                // When a brand-new account is confirmed, create the profile row
                if (event === 'SIGNED_IN' && currentSession?.user) {
                    const { user } = currentSession;
                    const { error } = await upsertUserProfile(user.id, user.email);
                    if (error) {
                        console.error('Profile upsert failed:', error.message);
                    }
                }

                setLoading(false);
            }
        );

        // Correct cleanup: use the subscription returned above
        return () => subscription.unsubscribe();
    }, []);

    // ── 2. Check profile completeness whenever session changes ────
    useEffect(() => {
        const user = session?.user ?? null;

        if (!user) {
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

    // ── 3. Sign out helper ────────────────────────────────────────
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) Alert.alert('Sign Out Error', error.message);
    };

    const value = { session, loading, isProfileCompleted, signOut };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};