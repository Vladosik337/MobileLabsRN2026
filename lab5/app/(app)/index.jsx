import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

export default function CatalogScreen() {
  const { logout, user } = useAuth();

  const renderProduct = ({ item }) => (
    <Link href={`/details/${item.id}`} asChild>
      <TouchableOpacity style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>{item.price.toLocaleString()} грн</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Вітаємо{user?.name ? `, ${user.name}` : ''}!
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Вийти</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
