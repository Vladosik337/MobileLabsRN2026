import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';

export const CreateFileModal = ({
  visible,
  fileName,
  fileContent,
  onChangeName,
  onChangeContent,
  onClose,
  onCreate
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Створити файл</Text>
        <TextInput
          style={styles.input}
          placeholder="Назва файлу (без .txt)"
          value={fileName}
          onChangeText={onChangeName}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Вміст файлу"
          value={fileContent}
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
            onPress={onCreate}
          >
            <Text style={styles.confirmButtonText}>Створити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);
