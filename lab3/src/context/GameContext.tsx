import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  icon: string;
  color: string;
}

interface GameContextType {
  score: number;
  tapCount: number;
  doubleTapCount: number;
  longPressCount: number;
  dragCount: number;
  swipeRightCount: number;
  swipeLeftCount: number;
  pinchCount: number;
  rotationCount: number;
  challenges: Challenge[];
  addScore: (points: number) => void;
  incrementTap: () => void;
  incrementDoubleTap: () => void;
  incrementLongPress: () => void;
  incrementDrag: () => void;
  incrementSwipeRight: () => void;
  incrementSwipeLeft: () => void;
  incrementPinch: () => void;
  incrementRotation: () => void;
  resetGame: () => void;
}

const initialChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Tap 10 times',
    description: 'Tap on the clicker object 10 times',
    target: 10,
    current: 0,
    completed: false,
    icon: 'hand-pointer-o',
    color: '#4CAF50',
  },
  {
    id: '2',
    title: 'Double-tap 5 times',
    description: 'Double-tap on the clicker 5 times',
    target: 5,
    current: 0,
    completed: false,
    icon: 'hand-peace-o',
    color: '#2196F3',
  },
  {
    id: '3',
    title: 'Long press 3 seconds',
    description: 'Hold the clicker for 3 seconds',
    target: 1,
    current: 0,
    completed: false,
    icon: 'hand-rock-o',
    color: '#9C27B0',
  },
  {
    id: '4',
    title: 'Drag the object',
    description: 'Drag the clicker around the screen',
    target: 1,
    current: 0,
    completed: false,
    icon: 'arrows',
    color: '#FF9800',
  },
  {
    id: '5',
    title: 'Swipe right',
    description: 'Perform a quick swipe right gesture',
    target: 1,
    current: 0,
    completed: false,
    icon: 'arrow-right',
    color: '#E91E63',
  },
  {
    id: '6',
    title: 'Swipe left',
    description: 'Perform a quick swipe left gesture',
    target: 1,
    current: 0,
    completed: false,
    icon: 'arrow-left',
    color: '#00BCD4',
  },
  {
    id: '7',
    title: 'Pinch to resize',
    description: 'Use pinch gesture to resize the clicker',
    target: 1,
    current: 0,
    completed: false,
    icon: 'expand',
    color: '#795548',
  },
  {
    id: '8',
    title: 'Reach 100 points',
    description: 'Accumulate a total of 100 points',
    target: 100,
    current: 0,
    completed: false,
    icon: 'star',
    color: '#FFC107',
  },
  {
    id: '9',
    title: 'Rotate the object',
    description: 'Use two fingers to rotate the clicker',
    target: 1,
    current: 0,
    completed: false,
    icon: 'refresh',
    color: '#607D8B',
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [dragCount, setDragCount] = useState(0);
  const [swipeRightCount, setSwipeRightCount] = useState(0);
  const [swipeLeftCount, setSwipeLeftCount] = useState(0);
  const [pinchCount, setPinchCount] = useState(0);
  const [rotationCount, setRotationCount] = useState(0);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);

  const updateChallenge = useCallback((id: string, current: number) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, current: Math.min(current, c.target), completed: current >= c.target }
          : c
      )
    );
  }, []);

  const addScore = useCallback((points: number) => {
    setScore(prev => {
      const newScore = prev + points;
      updateChallenge('8', newScore);
      return newScore;
    });
  }, [updateChallenge]);

  const incrementTap = useCallback(() => {
    setTapCount(prev => {
      const newCount = prev + 1;
      updateChallenge('1', newCount);
      return newCount;
    });
    addScore(1);
  }, [addScore, updateChallenge]);

  const incrementDoubleTap = useCallback(() => {
    setDoubleTapCount(prev => {
      const newCount = prev + 1;
      updateChallenge('2', newCount);
      return newCount;
    });
    addScore(2);
  }, [addScore, updateChallenge]);

  const incrementLongPress = useCallback(() => {
    setLongPressCount(prev => {
      const newCount = prev + 1;
      updateChallenge('3', newCount);
      return newCount;
    });
    addScore(5);
  }, [addScore, updateChallenge]);

  const incrementDrag = useCallback(() => {
    setDragCount(prev => {
      const newCount = prev + 1;
      updateChallenge('4', newCount);
      return newCount;
    });
  }, [updateChallenge]);

  const incrementSwipeRight = useCallback(() => {
    setSwipeRightCount(prev => {
      const newCount = prev + 1;
      updateChallenge('5', newCount);
      return newCount;
    });
    addScore(Math.floor(Math.random() * 10) + 1);
  }, [addScore, updateChallenge]);

  const incrementSwipeLeft = useCallback(() => {
    setSwipeLeftCount(prev => {
      const newCount = prev + 1;
      updateChallenge('6', newCount);
      return newCount;
    });
    addScore(Math.floor(Math.random() * 10) + 1);
  }, [addScore, updateChallenge]);

  const incrementPinch = useCallback(() => {
    setPinchCount(prev => {
      const newCount = prev + 1;
      updateChallenge('7', newCount);
      return newCount;
    });
    addScore(3);
  }, [addScore, updateChallenge]);

  const incrementRotation = useCallback(() => {
    setRotationCount(prev => {
      const newCount = prev + 1;
      updateChallenge('9', newCount);
      return newCount;
    });
    addScore(4);
  }, [addScore, updateChallenge]);

  const resetGame = useCallback(() => {
    setScore(0);
    setTapCount(0);
    setDoubleTapCount(0);
    setLongPressCount(0);
    setDragCount(0);
    setSwipeRightCount(0);
    setSwipeLeftCount(0);
    setPinchCount(0);
    setRotationCount(0);
    setChallenges(initialChallenges);
  }, []);

  return (
    <GameContext.Provider
      value={{
        score,
        tapCount,
        doubleTapCount,
        longPressCount,
        dragCount,
        swipeRightCount,
        swipeLeftCount,
        pinchCount,
        rotationCount,
        challenges,
        addScore,
        incrementTap,
        incrementDoubleTap,
        incrementLongPress,
        incrementDrag,
        incrementSwipeRight,
        incrementSwipeLeft,
        incrementPinch,
        incrementRotation,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
