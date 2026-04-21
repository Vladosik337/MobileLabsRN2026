import { Platform, Alert } from 'react-native';

export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('uk-UA');
};

export const getFileExtension = (filename) => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'Unknown';
};

export const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}: ${message}`);
  } else {
    Alert.alert(title, message);
  }
};
