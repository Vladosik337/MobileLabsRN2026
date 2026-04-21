import React, { useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const OBJECT_SIZE = 120;

export const ClickerObject: React.FC = () => {
  const { theme } = useTheme();
  const {
    incrementTap,
    incrementDoubleTap,
    incrementLongPress,
    incrementDrag,
    incrementSwipeRight,
    incrementSwipeLeft,
    incrementPinch,
    incrementRotation,
  } = useGame();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedRotation = useSharedValue(0);
  const backgroundColor = useSharedValue(theme.primary);

  const hasDragged = useRef(false);
  const hasPinched = useRef(false);
  const hasRotated = useRef(false);

  const animatePulse = () => {
    scale.value = withSequence(
      withSpring(1.2, { damping: 2 }),
      withSpring(1, { damping: 2 })
    );
  };

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      runOnJS(incrementTap)();
      runOnJS(animatePulse)();
    });

  const doubleTapGesture = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(incrementDoubleTap)();
      scale.value = withSequence(
        withSpring(1.4, { damping: 2 }),
        withSpring(1, { damping: 2 })
      );
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(3000)
    .onStart(() => {
      runOnJS(incrementLongPress)();
      scale.value = withSequence(
        withSpring(1.5, { damping: 3 }),
        withSpring(1, { damping: 3 })
      );
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      hasDragged.current = false;
    })
    .onUpdate((event) => {
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
      if (Math.abs(event.translationX) > 20 || Math.abs(event.translationY) > 20) {
        if (!hasDragged.current) {
          hasDragged.current = true;
          runOnJS(incrementDrag)();
        }
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;

      // Bound checking
      const maxX = (SCREEN_WIDTH - OBJECT_SIZE) / 2;
      const maxY = (SCREEN_HEIGHT - OBJECT_SIZE) / 2 - 150;

      if (Math.abs(translateX.value) > maxX) {
        translateX.value = withSpring(Math.sign(translateX.value) * maxX);
        savedTranslateX.value = Math.sign(translateX.value) * maxX;
      }
      if (Math.abs(translateY.value) > maxY) {
        translateY.value = withSpring(Math.sign(translateY.value) * maxY);
        savedTranslateY.value = Math.sign(translateY.value) * maxY;
      }
    });

  const flingRightGesture = Gesture.Fling()
    .direction(1) // Right
    .onStart(() => {
      runOnJS(incrementSwipeRight)();
      translateX.value = withSequence(
        withTiming(translateX.value + 50, { duration: 100 }),
        withSpring(translateX.value)
      );
    });

  const flingLeftGesture = Gesture.Fling()
    .direction(2) // Left
    .onStart(() => {
      runOnJS(incrementSwipeLeft)();
      translateX.value = withSequence(
        withTiming(translateX.value - 50, { duration: 100 }),
        withSpring(translateX.value)
      );
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      hasPinched.current = false;
    })
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
      if (!hasPinched.current && Math.abs(event.scale - 1) > 0.1) {
        hasPinched.current = true;
        runOnJS(incrementPinch)();
      }
    })
    .onEnd(() => {
      savedScale.value = Math.min(Math.max(scale.value, 0.5), 2);
      scale.value = withSpring(savedScale.value);
    });

  const rotationGesture = Gesture.Rotation()
    .onStart(() => {
      hasRotated.current = false;
    })
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
      if (!hasRotated.current && Math.abs(event.rotation) > 0.3) {
        hasRotated.current = true;
        runOnJS(incrementRotation)();
      }
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composedGesture = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTapGesture, tapGesture),
    longPressGesture,
    panGesture,
    Gesture.Simultaneous(flingRightGesture, flingLeftGesture),
    pinchGesture,
    rotationGesture
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={[styles.object, { backgroundColor: theme.primary }]}>
          <MaterialCommunityIcons name="hand-clap" size={50} color="white" />
          <Text style={styles.tapText}>TAP ME</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  object: {
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    borderRadius: OBJECT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tapText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
  },
});
