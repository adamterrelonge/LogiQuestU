import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseURL = 'https://miufthxvuvhzhojugrmo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pdWZ0aHh2dXZoemhvanVncm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NDM1OTgsImV4cCI6MjA5MjIxOTU5OH0.pf3Q9xIoRBS12HUaoD4PXmNd_VrWgx8ZhvSeqMVl3fk';

// ✅ Declare BEFORE use
export const supabase = createClient(supabaseURL, supabaseAnonKey);

export async function fetchUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('nickname, profile_completed')
        .eq('user_Id', userId)
        .single();

    if (error && error.code === 'PGRST116') {
        return { profile: { profile_completed: false }, error: null };
    }
    return { profile: data, error };
}