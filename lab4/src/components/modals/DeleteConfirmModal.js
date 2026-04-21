import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';

export const DeleteConfirmModal = ({ visible, itemName, onClose, onDelete }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Підтвердження</Text>
        <Text style={styles.deleteText}>
          Ви дійсно хочете видалити "{itemName}"?
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Скасувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.deleteButton]}
            onPress={onDelete}
          >
            <Text style={styles.confirmButtonText}>Видалити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);
