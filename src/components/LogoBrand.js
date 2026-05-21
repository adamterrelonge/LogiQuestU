// src/components/LogoBrand.js
// Displays the LogiQuest hexagon logo and app name.

import React from 'react';
import { View, Text } from 'react-native';
import { loginStyles as styles } from '../styles/LoginStyles';

const LogoBrand = () => (
    <View style={styles.brandBlock}>
        <View style={styles.iconOuter}>
            <Text style={styles.iconGlyph}>⬡</Text>
            {[0, 1, 2, 3].map(i => (
                <View key={i} style={[styles.pin, styles[`pin${i}`]]} />
            ))}
        </View>
        <Text style={styles.brandName}>LogiQuest</Text>
    </View>
);

export default LogoBrand;