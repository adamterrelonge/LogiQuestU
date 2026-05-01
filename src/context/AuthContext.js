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
    supabase.auth.getSession().then(({ data: { session } })) => {
        setSession(session);
        setLoading(false);   
    }
})
}
