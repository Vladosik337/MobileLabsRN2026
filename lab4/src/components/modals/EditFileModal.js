import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';

export const EditFileModal = ({ visible, fileName, content, onChangeContent, onClose, onSave }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={[styles.modalContent, styles.largeModal]}>
        <Text style={styles.modalTitle}>Редагування: {fileName}</Text>
        <TextInput
          style={[styles.input, styles.editTextArea]}
          value={content}
          onChangeText={onChangeContent}
          multiline
        />
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Скасувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.confirmButton]}
            onPress={onSave}
          >
            <Text style={styles.confirmButtonText}>Зберегти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);
