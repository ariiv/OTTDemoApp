import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';

type PlayButtonProps = {
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  label?: string;
};

export const PlayButton: React.FC<PlayButtonProps> = ({ onPress, style, label = 'Play' }) => {
  return (
   <TouchableOpacity 
    focusable={true} 
    style={[styles.playButton, style]} 
    onPress={onPress}
  >
      <Text style={styles.playTriangle}>▶</Text>
      <Text style={styles.playText}>{label}</Text>
    </TouchableOpacity>
  );
};