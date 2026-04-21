import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../../../data/products';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Товар не знайдено</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()} грн</Text>

        <View style={styles.divider} />

        <Text style={styles.descriptionTitle}>Опис</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  notFoundText: {
    fontSize: 18,
    color: '#666',
  },
});
