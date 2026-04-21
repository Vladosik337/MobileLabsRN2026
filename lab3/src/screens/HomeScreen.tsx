import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ClickerObject } from '../components/ClickerObject';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

interface GestureInfoProps {
  icon: string;
  iconFamily: 'material' | 'fontawesome';
  text: string;
  color: string;
}

const GestureInfo: React.FC<GestureInfoProps> = ({ icon, iconFamily, text, color }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.gestureItem}>
      {iconFamily === 'material' ? (
        <MaterialCommunityIcons name={icon as any} size={20} color={color} />
      ) : (
        <FontAwesome name={icon as any} size={20} color={color} />
      )}
      <Text style={[styles.gestureText, { color: theme.text }]}>{text}</Text>
    </View>
  );
};

export const HomeScreen: React.FC = () => {
  const { score } = useGame();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>SCORE</Text>
        <Text style={[styles.scoreValue, { color: theme.primary }]}>{score}</Text>
      </View>

      <View style={styles.clickerContainer}>
        <ClickerObject />
      </View>

      <View style={[styles.infoContainer, { backgroundColor: theme.surface }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <GestureInfo
            icon="gesture-tap"
            iconFamily="material"
            text="Tap: +1 point"
            color="#4CAF50"
          />
          <GestureInfo
            icon="gesture-double-tap"
            iconFamily="material"
            text="Double-tap: +2 points"
            color="#2196F3"
          />
          <GestureInfo
            icon="gesture-tap-hold"
            iconFamily="material"
            text="Long-press (3s): +5 points"
            color="#9C27B0"
          />
          <GestureInfo
            icon="gesture-swipe-horizontal"
            iconFamily="material"
            text="Swipe: +1-10 random points"
            color="#E91E63"
          />
          <GestureInfo
            icon="gesture-pinch"
            iconFamily="material"
            text="Pinch: +3 points"
            color="#795548"
          />
          <GestureInfo
            icon="rotate-3d-variant"
            iconFamily="material"
            text="Rotate: +4 points"
            color="#607D8B"
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
  scoreValue: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  clickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: 200,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gestureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  gestureText: {
    marginLeft: 12,
    fontSize: 14,
  },
});
