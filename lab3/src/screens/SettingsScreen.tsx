import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  rightElement,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
        <MaterialCommunityIcons name={icon as any} size={24} color={theme.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement}
    </TouchableOpacity>
  );
};

export const SettingsScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { score, challenges, resetGame } = useGame();

  const completedChallenges = challenges.filter(c => c.completed).length;

  const handleReset = () => {
    Alert.alert(
      'Reset Game',
      'Are you sure you want to reset all progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetGame },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          APPEARANCE
        </Text>
        <SettingItem
          icon="theme-light-dark"
          title="Dark Mode"
          subtitle={isDark ? 'Currently using dark theme' : 'Currently using light theme'}
          rightElement={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={isDark ? theme.primary : '#f4f3f4'}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          STATISTICS
        </Text>
        <SettingItem
          icon="star-circle"
          title="Total Score"
          subtitle={`You have earned ${score} points`}
        />
        <SettingItem
          icon="trophy"
          title="Challenges Completed"
          subtitle={`${completedChallenges} of ${challenges.length} challenges`}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          GAME
        </Text>
        <SettingItem
          icon="refresh"
          title="Reset Progress"
          subtitle="Clear all scores and challenges"
          onPress={handleReset}
          rightElement={
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={theme.textSecondary}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          ABOUT
        </Text>
        <SettingItem
          icon="information"
          title="Gesture Clicker"
          subtitle="Version 1.0.0 | Lab 3"
        />
      </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginLeft: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});
