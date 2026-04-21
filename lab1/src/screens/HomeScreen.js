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
import { Header, Footer, NewsItem } from '../components';
import { NEWS_DATA } from '../data/newsData';
import { COLORS } from '../constants';

const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <Header />
    <View style={styles.screenContent}>
      <Text style={styles.pageTitle}>Новини</Text>
      <FlatList
        data={NEWS_DATA}
        renderItem={({ item }) => <NewsItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.newsList}
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
  newsList: {
    paddingBottom: 16,
  },
});

export default HomeScreen;
