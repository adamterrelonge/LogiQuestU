// src/styles/loginStyles.js
// Shared styles for the login flow.

import { StyleSheet } from 'react-native';

export const BTN_PURPLE = '#8B3FCC';

export const loginStyles = StyleSheet.create({
    gradient: { flex: 1 },
    safe:     { flex: 1 },
    flex:     { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title:    {flex: 1, color: 'white', fontSize: 20, marginBottom: 20, paddingBottom: 20},

    card: {
        width: '82%',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 24,
        paddingVertical: 32,
        alignItems: 'center',
    },

    // ── Brand ──────────────────────────────────────────────────────
    brandBlock:  { alignItems: 'center', marginBottom: 22 },
    iconOuter: {
        width: 62, height: 62, borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.45)',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 8, position: 'relative',
    },
    iconGlyph: { fontSize: 30, color: '#fff' },
    pin:  { position: 'absolute', width: 5, height: 5, borderRadius: 3, backgroundColor: '#fff' },
    pin0: { top: -4,    left: '35%' },
    pin1: { top: -4,    right: '35%' },
    pin2: { bottom: -4, left: '35%' },
    pin3: { bottom: -4, right: '35%' },
    brandName: { fontSize: 26, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },

    // ── Inputs ─────────────────────────────────────────────────────
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 10, borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 12, marginBottom: 12,
        width: '100%', height: 46,
    },
    inputIcon: { marginRight: 8 },
    input: { flex: 1, color: '#fff', fontSize: 14, height: '100%' },

    // ── Buttons ────────────────────────────────────────────────────
    submitBtn: {
        backgroundColor: BTN_PURPLE, borderRadius: 10,
        height: 44, width: '55%',
        justifyContent: 'center', alignItems: 'center',
        marginTop: 4, marginBottom: 10,
        shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
    },
    submitText: { color: '#fff', fontWeight: '700', fontSize: 15 },

    forgotText: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginBottom: 14 },

    outlineBtn: {
        borderRadius: 10, height: 42, width: '80%',
        justifyContent: 'center', alignItems: 'center', marginBottom: 10,
        borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    outlineBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },

    solidBtn: {
        backgroundColor: BTN_PURPLE, borderRadius: 10,
        height: 42, width: '80%',
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, elevation: 3,
    },
    solidBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

    userIconWrapper: { marginTop: 18 },
});