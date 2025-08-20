import catalog from '@/assets/catalog.json';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

export default function DetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ itemId: string }>();
  const item: Item | undefined = catalog.items.find((i) => i.id === params.itemId);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontSize: 18 }}>Item not found</Text>
      </View>
    );
  }

  // Format duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Top Bar like Home Screen */}
      <View style={styles.topBar}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      {/* Poster */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.heroImage} />

        {/* Fade overlay at the top */}
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Back button overlay */}
        <Pressable
          onPress={() => router.push('/')}
          style={{
            position: 'absolute',
            top: 15,
            left: 15,
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: 8,
            borderRadius: 20,
          }}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </Pressable>

        {/* Title overlay */}
        <Text style={[styles.heroTitle, { bottom: 60 }]}>{item.title}</Text>

        {/* PlayButton overlay */}
        <View style={[styles.playButtonOverlay, { bottom: 10 }]}>
          <PlayButton
            onPress={() =>
              router.push({ pathname: '/player', params: { itemId: item.id } })
            }
          />
        </View>
      </View>

      <View style={styles.headingLine} />

      {/* Description */}
      <Text style={{ color: '#fff', fontSize: 16, marginHorizontal: 20, marginBottom: 10 }}>
        {item.description}
      </Text>

      {/* Duration */}
      <Text style={{ color: '#0a714e', fontSize: 16, marginHorizontal: 20, marginBottom: 20 }}>
        Duration: {formatDuration(item.duration)}
      </Text>
    </ScrollView>
  );
}
