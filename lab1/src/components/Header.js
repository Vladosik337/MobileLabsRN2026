import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const Header = () => (
  <View style={styles.header}>
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
    <Text style={styles.headerTitle}>FirstMobileApp</Text>
    <View style={styles.headerRight} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logoContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  logo: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerRight: {
    width: 40,
  },
});

export default Header;
