import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const NewsItem = ({ item }) => (
  <View style={styles.newsItem}>
    <View style={styles.newsImagePlaceholder}>
      <Ionicons name="image-outline" size={40} color={COLORS.textMuted} />
    </View>
    <View style={styles.newsContent}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDate}>{item.date}</Text>
      <Text style={styles.newsText} numberOfLines={2}>
        {item.text}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  newsItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.placeholder,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  newsText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default NewsItem;
