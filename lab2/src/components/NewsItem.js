import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const NewsItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default NewsItem;
