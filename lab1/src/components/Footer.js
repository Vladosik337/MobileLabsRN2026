import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FOOTER_TEXT, COLORS } from '../constants';

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>{FOOTER_TEXT}</Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default Footer;
