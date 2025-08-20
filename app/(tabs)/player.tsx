import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, Text, TouchableOpacity, View } from 'react-native';
import catalog from '../../assets/catalog.json';
import { PlayerStyles as styles } from '../../styles/PlayerStyles'; // <-- import your refactored styles

const { width, height } = Dimensions.get('window');

type Item = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  streamUrl: string;
  duration: number;
};

export default function PlayerScreen() {
  const params = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const item: Item | undefined = catalog.items.find(i => i.id === params.itemId);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Video not found</Text>
      </View>
    );
  }

  useEffect(() => {
    if (overlayVisible) {
      const timer = setTimeout(() => setOverlayVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [overlayVisible]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pauseAsync().catch(() => {});
      }
    };
  }, []);

  const togglePlayPause = async () => {
    if (!videoRef.current) return;
    const status = await videoRef.current.getStatusAsync();

    if ('isPlaying' in status && status.isPlaying) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
    setOverlayVisible(true);
  };

  const skipSeconds = async (seconds: number) => {
    if (!videoRef.current) return;

    const status = await videoRef.current.getStatusAsync();

    if ('positionMillis' in status) {
      const newPosition = (status.positionMillis || 0) + seconds * 1000;
      await videoRef.current.setPositionAsync(newPosition);
      setOverlayVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={() => setOverlayVisible(!overlayVisible)}
      >
        <Video
          ref={videoRef}
          source={{ uri: item.streamUrl }}
          style={styles.video}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
        />
      </TouchableOpacity>

      {overlayVisible && (
        <Animated.View style={styles.overlay}>
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} style={styles.topButton}>
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </Pressable>
            <Pressable onPress={() => router.push('/')} style={styles.topButton}>
              <Ionicons name="home" size={28} color="#fff" />
            </Pressable>
            <Text style={styles.videoTitle}>{item.title}</Text>
          </View>

          <View style={styles.middleControls}>
            <Pressable onPress={() => skipSeconds(-5)} style={styles.controlButton}>
              <Ionicons name="play-back" size={40} color="#fff" />
              <Text style={styles.controlText}>-5s</Text>
            </Pressable>

            <Pressable onPress={togglePlayPause} style={styles.controlButton}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={60} color="#fff" />
            </Pressable>

            <Pressable onPress={() => skipSeconds(5)} style={styles.controlButton}>
              <Ionicons name="play-forward" size={40} color="#fff" />
              <Text style={styles.controlText}>+5s</Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
