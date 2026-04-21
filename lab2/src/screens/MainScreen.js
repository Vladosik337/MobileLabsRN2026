import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { NewsItem, ListHeader, ListFooter, ItemSeparator } from '../components';
import { generateNewsData } from '../data';

const MainScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setNews(generateNewsData(1, 10));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNews(generateNewsData(1, 10));
      setRefreshing(false);
    }, 1500);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const newItems = generateNewsData(news.length + 1, 10);
      setNews(prevNews => [...prevNews, ...newItems]);
      setLoadingMore(false);
    }, 1500);
  }, [loadingMore, news.length]);

  const renderItem = ({ item }) => (
    <NewsItem
      item={item}
      onPress={() => navigation.navigate('Details', { item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<ListHeader title="Новини" />}
        ListFooterComponent={<ListFooter loading={loadingMore} />}
        ItemSeparatorComponent={ItemSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default MainScreen;
