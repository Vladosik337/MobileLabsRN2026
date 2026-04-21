import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGame, Challenge } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const ChallengeItem: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const { theme } = useTheme();
  const progress = Math.min(challenge.current / challenge.target, 1);

  const getIcon = () => {
    const iconMap: { [key: string]: string } = {
      'hand-pointer-o': 'gesture-tap',
      'hand-peace-o': 'gesture-double-tap',
      'hand-rock-o': 'gesture-tap-hold',
      'arrows': 'cursor-move',
      'arrow-right': 'arrow-right',
      'arrow-left': 'arrow-left',
      'expand': 'gesture-pinch',
      'star': 'star',
      'refresh': 'rotate-3d-variant',
    };
    return iconMap[challenge.icon] || 'help-circle';
  };

  return (
    <View style={[styles.challengeItem, { backgroundColor: theme.cardBackground }]}>
      <View style={[styles.iconContainer, { backgroundColor: challenge.color + '20' }]}>
        <MaterialCommunityIcons
          name={getIcon() as any}
          size={24}
          color={challenge.color}
        />
      </View>
      <View style={styles.challengeContent}>
        <View style={styles.challengeHeader}>
          <Text style={[styles.challengeTitle, { color: theme.text }]}>
            {challenge.title}
          </Text>
          {challenge.completed && (
            <MaterialCommunityIcons name="check-circle" size={20} color={theme.success} />
          )}
        </View>
        <Text style={[styles.challengeDescription, { color: theme.textSecondary }]}>
          {challenge.description}
        </Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: challenge.completed ? theme.success : challenge.color,
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            {challenge.current}/{challenge.target}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const ChallengesScreen: React.FC = () => {
  const { challenges } = useGame();
  const { theme } = useTheme();
  const completedCount = challenges.filter(c => c.completed).length;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Challenges
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          {completedCount} of {challenges.length} completed
        </Text>
      </View>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChallengeItem challenge={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  challengeItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  challengeContent: {
    flex: 1,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  challengeDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    minWidth: 40,
    textAlign: 'right',
  },
});
