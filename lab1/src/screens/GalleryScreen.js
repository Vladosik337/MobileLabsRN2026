import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Header, Footer, GalleryItem } from '../components';
import { GALLERY_DATA } from '../data/galleryData';
import { COLORS } from '../constants';

const GalleryScreen = () => (
  <SafeAreaView style={styles.container}>
    <Header />
    <View style={styles.screenContent}>
      <Text style={styles.pageTitle}>Фотогалерея</Text>
      <FlatList
        data={GALLERY_DATA}
        renderItem={({ item }) => <GalleryItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.galleryList}
        showsVerticalScrollIndicator={false}
      />
    </View>
    <Footer />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: 16,
  },
  galleryList: {
    paddingBottom: 16,
  },
});

export default GalleryScreen;
