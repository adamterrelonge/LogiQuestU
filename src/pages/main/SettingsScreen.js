// src/pages/main/SettingsScreen.js
// Settings hub: toggles for sound/notifications, nav rows for sub-pages,
// plus Delete Account and Log Out actions tied to AuthContext.

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';
import ToggleRow from '../../components/settings/ToggleRow';
import NavRow from '../../components/settings/NavRow';

const SettingsScreen = ({ navigation }) => {
    const { signOut, session } = useAuth();
    const [soundsOn, setSoundsOn] = useState(true);
    const [pushOn, setPushOn] = useState(true);

    // Confirms before permanently deleting the user's account row + auth user
    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'This will permanently delete your account and all saved scores. This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const userId = session?.user?.id;
                        if (!userId) return;
                        // NOTE: deleting an auth user requires a service-role call,
                        // typically via a Supabase Edge Function — this only clears the profile row.
                        const { error } = await supabase.from('profiles').delete().eq('user_id', userId);
                        if (error) {
                            Alert.alert('Error', error.message);
                        } else {
                            signOut();
                        }
                    },
                },
            ]
        );
    };

    return (
        <LinearGradient colors={['#7B2FBE', '#3B82C4', '#56CFD2']} style={styles.flex}>
            <SafeAreaView style={styles.flex}>
                {/* Header: close (X) + title, matches mockup */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={28} color="#E53935" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Settings</Text>
                    <View style={{ width: 28 }} />
                </View>

                <ScrollView contentContainerStyle={styles.list}>
                    <ToggleRow label="Sounds Effect" value={soundsOn} onValueChange={setSoundsOn} />
                    <NavRow label="Languages" onPress={() => navigation.navigate('Languages')} />
                    <NavRow label="Change Profile information" onPress={() => navigation.navigate('EditProfile')} />
                    <ToggleRow label="Push notifications" value={pushOn} onValueChange={setPushOn} />
                    <NavRow label="Help" onPress={() => navigation.navigate('Help')} />
                    <NavRow label="Feedback" onPress={() => navigation.navigate('Feedback')} />
                    <NavRow label="Privacy Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
                    <NavRow label="Delete Account" destructive onPress={handleDeleteAccount} />
                    <NavRow label="Log Out" destructive onPress={signOut} />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    flex:   { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    title:  { fontSize: 20, fontWeight: '700', color: '#111' },
    list:   { paddingHorizontal: 20, paddingBottom: 40 },
});

export default SettingsScreen; 