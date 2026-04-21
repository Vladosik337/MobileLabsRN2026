import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';

export const FileInfoModal = ({ visible, info, onClose }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Інформація</Text>
        {info && (
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Назва:</Text>
              <Text style={styles.infoValue}>{info.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Тип:</Text>
              <Text style={styles.infoValue}>{info.type}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Розмір:</Text>
              <Text style={styles.infoValue}>{info.size}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Змінено:</Text>
              <Text style={styles.infoValue}>{info.modificationTime}</Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={[styles.modalButton, styles.confirmButton, { marginTop: 15 }]}
          onPress={onClose}
        >
          <Text style={styles.confirmButtonText}>Закрити</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
