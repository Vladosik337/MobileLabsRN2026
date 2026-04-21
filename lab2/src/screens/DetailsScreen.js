import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
});

export default DetailsScreen;
