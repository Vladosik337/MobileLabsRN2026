import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';

export const ViewFileModal = ({ visible, fileName, content, onClose, onEdit }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={[styles.modalContent, styles.largeModal]}>
        <Text style={styles.modalTitle}>{fileName}</Text>
        <ScrollView style={styles.fileContentContainer}>
          <Text style={styles.fileContent}>{content}</Text>
        </ScrollView>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Закрити</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.editButton]}
            onPress={onEdit}
          >
            <Text style={styles.confirmButtonText}>Редагувати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);
