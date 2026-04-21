import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const GalleryItem = ({ item }) => (
  <View style={styles.galleryItem}>
    <View style={styles.galleryImagePlaceholder}>
      <Ionicons name="image-outline" size={50} color={COLORS.textMuted} />
      <Text style={styles.galleryItemText}>Фото {item.id}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  galleryItem: {
    flex: 1,
    margin: 6,
    aspectRatio: 1,
  },
  galleryImagePlaceholder: {
    flex: 1,
    backgroundColor: COLORS.placeholder,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  galleryItemText: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default GalleryItem;
