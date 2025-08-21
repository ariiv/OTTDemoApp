import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import catalog from '../../assets/catalog.json';
import { PlayButton } from '../../components/PlayButton';
import { styles } from '../../styles/HomeScreen.styles';

type Item = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  streamUrl: string;
  duration: number;
};

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const listRef = useRef<FlatList<Item>>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setFeaturedIndex((prev) => (prev + 1) % catalog.items.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const featuredItem = catalog.items[featuredIndex];
  const [isFocused, setIsFocused] = useState(false);
  const carouselData = [...catalog.items, ...catalog.items, ...catalog.items];
  const initialIndex = catalog.items.length;
  const [loading, setLoading] = useState(true);
  const [catalogItems, setCatalogItems] = useState<Item[]>([]);

  const renderItem = ({ item, index }: { item: Item, index: number }) => (
  <Pressable
      focusable={true}
      onFocus={() => {
        setIsFocused(true);
        listRef.current?.scrollToIndex({ index: initialIndex, animated: true }); }}
      onBlur={() => setIsFocused(false)}
      onPress={() =>
        router.push({ pathname: '/details', params: { itemId: item.id } })
      }
      style={({ pressed }) => [
        styles.tile,
        pressed && { opacity: 0.8 },
        isFocused && { borderColor: 'white', borderWidth: 2, overflow: 'visible' },
      ]}
    >
    <View>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

      <View style={styles.playButtonOverlay}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </View>
  </Pressable>
  );

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      listRef.current?.scrollToIndex({ index: initialIndex, animated: false });
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCatalogItems(catalog.items);
      setLoading(false);
    };
    loadData();
  }, []);

  const onScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const itemWidth = width * 0.6;
    let index = Math.round(offsetX / itemWidth);
    const totalItems = catalog.items.length;


    if (index >= totalItems) {
      index = index % totalItems;
      listRef.current?.scrollToIndex({ index, animated: false });
    }
  };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
      scrollEnabled={!loading}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.topBar}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      {!loading && (
        <>
          <View style={styles.heroContainer}>
            <Animated.Image
              source={{ uri: featuredItem.thumbnail }}
              style={[styles.heroImage, { opacity: fadeAnim }]}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.9)']}
              style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.heroTitle}>{featuredItem.title}</Text>
            <View style={styles.playButtonOverlay}>
              <PlayButton
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: { itemId: featuredItem.id },
                  })
                }
              />
            </View>
          </View>

          <Text style={styles.heading}>Browse All</Text>
          <View style={styles.headingLine} />
          <FlatList
            ref={listRef}
            data={carouselData}
            renderItem={({ item, index }) => renderItem({ item, index })}
            keyExtractor={(item, index) => item.id + index}
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScrollEnd}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </>
      )}
    </ScrollView>

    {loading && (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: '#fff', marginTop: 10, fontSize: 16 }}>
          Loading catalog...
        </Text>
      </View>
    )}
  </View>
  );
}
