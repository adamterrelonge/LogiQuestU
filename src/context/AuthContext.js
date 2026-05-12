import React, { createContext, useState, useEffect, useContext } from 'react'; 
import { Alert } from 'react-native';
import { supabase, fetchUserProfile } from '../utils/supabase';

const AuthContext = createContext(); 

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
const [session, setSession] = useState(null);
const [loading, setLoading] = useState(true);
const [isProfileCompleted, setIsProfileCompleted] = useState(false); // New state for profile status 

// 1. Listen for Auth State Changes
useEffect(() => {
    // Initial check for sesion
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);   
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
            setSession(currentSession);
            setLoading(false);
        }
    );

    return () => {
        if (listener && typeof listener.unsubscribe === 'function') {
            listener.unsubscribe();
        }
    };
}, []);

useEffect(() => {
    const user = session?.user ?? null;

    if (user) {
        const checkProfileStatus = async() => {
            setLoading(true);
            const { profile, error } = await fetchUserProfile(user.id);

            if (error) {
                console.error("Failed to check profile status:", error);
                //Assuming navigation will handle this error by defaulting to onboarding
                setIsProfileCompleted(false);
            } else if (profile) {
                setIsProfileCompleted(profile.profile_completed);
            } else {
                setIsProfileCompleted(false);
            }
            setLoading(false);
        };

        checkProfileStatus();

    } else {
        setIsProfileCompleted(false);
        if (loading) setLoading(false);
    }

    return () => {
    };
}, [session]); // Depend on session object 

const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        Alert.alert('Sign Out Error',error.message);
    }
};

const value = {
    session,
    loading,
    isProfileCompleted,
    signOut,
};

return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
);
};
