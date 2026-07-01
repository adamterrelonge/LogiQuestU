// src/components/Logo.js
// Imports and displays "logo2.png" from the assets folder

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = ({ size = 'large' }) => {
  const isLarge = size === 'large';
  const dimension = isLarge ? 160 : 60;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={{ width: dimension, height: dimension }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});