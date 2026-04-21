import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';

export const CreateFolderModal = ({ visible, folderName, onChangeName, onClose, onCreate }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Створити папку</Text>
        <TextInput
          style={styles.input}
          placeholder="Назва папки"
          value={folderName}
          onChangeText={onChangeName}
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
            onPress={onCreate}
          >
            <Text style={styles.confirmButtonText}>Створити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);
