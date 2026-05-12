import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { supabase, fetchUserProfile } from '../utils/supabase';

const AuthContext = createContext();

// Custom hook for easy access to auth logic
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isProfileCompleted, setIsProfileCompleted] = useState(false);

    /**
     * 1. AUTH STATE LISTENER
     * Runs once on mount to check for an existing session and 
     * sets up a listener for any future login/logout events.
     */
    useEffect(() => {
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (!session) setLoading(false);
        });

        // Listen for changes (sign in, sign out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, currentSession) => {
                setSession(currentSession);
                if (!currentSession) {
                    setIsProfileCompleted(false);
                    setLoading(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    /**
     * 2. PROFILE COMPLETION CHECK
     * Whenever the session changes (user logs in), we check the 
     * 'profiles' table to see if they've finished their setup.
     */
    useEffect(() => {
        if (!session?.user) return;

        const checkProfileStatus = async () => {
            setLoading(true);
            try {
                const { profile, error } = await fetchUserProfile(session.user.id);

                if (error) {
                    console.error('Error fetching profile:', error.message);
                    setIsProfileCompleted(false);
                } else {
                    // Update the state based on the database flag
                    setIsProfileCompleted(profile?.profile_completed ?? false);
                }
            } catch (err) {
                console.error('Profile check failed:', err);
            } finally {
                setLoading(false);
            }
        };

        checkProfileStatus();
    }, [session]);

    /**
     * 3. SIGN UP LOGIC
     * Creates the auth user AND the initial row in your 'profiles' table.
     */
    const signUp = async (email, password, fullName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;

        // Create the profile entry in your database immediately
        if (data?.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    user_Id: data.user.id,    // Matches your DB column name
                    nickname: fullName,       // Stores the name from the Register screen
                    profile_completed: false,
                });

            if (profileError) {
                console.error('Initial profile creation failed:', profileError.message);
            }
        }

        return data;
    };

    /**
     * 4. SIGN IN LOGIC
     */
    const signIn = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    };

    /**
     * 5. SIGN OUT LOGIC
     */
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) Alert.alert('Sign Out Error', error.message);
    };

    return (
        <AuthContext.Provider 
            value={{ session, loading, isProfileCompleted, setIsProfileCompleted, signIn, signUp, signOut }}>
            {!loading || session ? children : null} 
            {/* Prevents UI flickering while checking session */}
        </AuthContext.Provider>
    );
};