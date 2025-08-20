import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
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
  const carouselData = [...catalog.items, ...catalog.items];

  const renderItem = ({ item }: { item: Item }) => (
    <Pressable
    onPress={() =>
      router.push({ pathname: '/details', params: { itemId: item.id } })
    }
    style={({ pressed }) => [
      styles.tile,
      pressed && { opacity: 0.8 }, // small feedback when clicked
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

   const onScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (width * 0.6));
    if (index >= catalog.items.length) {
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.topBar}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

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
            onPress={() => router.push({ pathname: '/details', params: { itemId: featuredItem.id } })}
          />
         </View>
      </View>

      <Text style={styles.heading}>Browse All</Text>
      <View style={styles.headingLine} />
      <FlatList
        ref={listRef}
        data={carouselData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </ScrollView>
  );
}
