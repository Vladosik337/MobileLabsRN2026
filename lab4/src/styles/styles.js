import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  pathContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  upButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 10,
  },
  upButtonText: {
    fontSize: 14,
  },
  pathText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  actionsBar: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  itemIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 12,
  },
  actionIcon: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  largeModal: {
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  editTextArea: {
    height: 200,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#2196F3',
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fileContentContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    maxHeight: 300,
  },
  fileContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 80,
    color: '#555',
  },
  infoValue: {
    flex: 1,
    color: '#333',
  },
  deleteText: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
});
