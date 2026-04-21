import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

const STORAGE_KEY = 'fileManagerStorage';

const loadStorageFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.log(e);
  }
  return {
    '/': {
      type: 'directory',
      children: {},
      modificationTime: Date.now(),
    },
  };
};

const saveStorageToLocalStorage = (storage) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (e) {
    console.log(e);
  }
};

const createVirtualFileSystem = () => {
  let storage = loadStorageFromLocalStorage();

  const getNode = (path) => {
    if (path === '/') return storage['/'];
    const parts = path.split('/').filter(Boolean);
    let current = storage['/'];
    for (const part of parts) {
      if (!current.children || !current.children[part]) return null;
      current = current.children[part];
    }
    return current;
  };

  const getParentPath = (path) => {
    const parts = path.split('/').filter(Boolean);
    parts.pop();
    return '/' + parts.join('/');
  };

  const getName = (path) => {
    const parts = path.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  };

  return {
    documentDirectory: '/',

    async getInfoAsync(path) {
      const node = getNode(path);
      if (!node) {
        return { exists: false };
      }
      return {
        exists: true,
        isDirectory: node.type === 'directory',
        size: node.content ? node.content.length : 0,
        modificationTime: node.modificationTime || Date.now(),
        uri: path,
      };
    },

    async readDirectoryAsync(path) {
      const node = getNode(path);
      if (!node || node.type !== 'directory') return [];
      return Object.keys(node.children || {});
    },

    async makeDirectoryAsync(path) {
      const parentPath = getParentPath(path);
      const name = getName(path);
      const parent = getNode(parentPath);
      if (!parent) throw new Error('Parent directory does not exist');
      if (!parent.children) parent.children = {};
      parent.children[name] = {
        type: 'directory',
        children: {},
        modificationTime: Date.now(),
      };
      saveStorageToLocalStorage(storage);
    },

    async writeAsStringAsync(path, content) {
      const parentPath = getParentPath(path);
      const name = getName(path);
      const parent = getNode(parentPath);
      if (!parent) throw new Error('Parent directory does not exist');
      if (!parent.children) parent.children = {};
      parent.children[name] = {
        type: 'file',
        content: content,
        modificationTime: Date.now(),
      };
      saveStorageToLocalStorage(storage);
    },

    async readAsStringAsync(path) {
      const node = getNode(path);
      if (!node || node.type !== 'file') throw new Error('File not found');
      return node.content || '';
    },

    async deleteAsync(path) {
      const parentPath = getParentPath(path);
      const name = getName(path);
      const parent = getNode(parentPath);
      if (parent && parent.children) {
        delete parent.children[name];
      }
      saveStorageToLocalStorage(storage);
    },
  };
};

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('uk-UA');
};

const getFileExtension = (filename) => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'Unknown';
};

const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}: ${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Файловий менеджер</Text>
  </View>
);

const PathBar = ({ currentPath, canGoUp, onGoUp }) => (
  <View style={styles.pathContainer}>
    {canGoUp && (
      <TouchableOpacity style={styles.upButton} onPress={onGoUp}>
        <Text style={styles.upButtonText}>Вгору</Text>
      </TouchableOpacity>
    )}
    <Text style={styles.pathText} numberOfLines={1}>
      {currentPath}
    </Text>
  </View>
);

const ActionBar = ({ onCreateFolder, onCreateFile }) => (
  <View style={styles.actionsBar}>
    <TouchableOpacity style={styles.createButton} onPress={onCreateFolder}>
      <Text style={styles.createButtonText}>+ Нова папка</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.createButton} onPress={onCreateFile}>
      <Text style={styles.createButtonText}>+ Новий файл</Text>
    </TouchableOpacity>
  </View>
);

const FileItem = ({ item, onPress, onInfo, onDelete }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity style={styles.itemContent} onPress={onPress}>
      <Text style={styles.itemIcon}>
        {item.isDirectory ? '\uD83D\uDCC1' : '\uD83D\uDCC4'}
      </Text>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemMeta}>
          {item.isDirectory ? 'Папка' : formatBytes(item.size)}
        </Text>
      </View>
    </TouchableOpacity>
    <View style={styles.itemActions}>
      <TouchableOpacity style={styles.actionButton} onPress={onInfo}>
        <Text style={styles.actionIcon}>i</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
        <Text style={styles.actionIcon}>X</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const FileList = ({ items, onItemPress, onItemInfo, onItemDelete }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => (
      <FileItem
        item={item}
        onPress={() => onItemPress(item)}
        onInfo={() => onItemInfo(item)}
        onDelete={() => onItemDelete(item)}
      />
    )}
    keyExtractor={(item) => item.path}
    style={styles.list}
    ListEmptyComponent={
      <Text style={styles.emptyText}>Папка порожня</Text>
    }
  />
);

const CreateFolderModal = ({ visible, folderName, onChangeName, onClose, onCreate }) => (
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
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Скасувати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={onCreate}>
            <Text style={styles.confirmButtonText}>Створити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const CreateFileModal = ({ visible, fileName, fileContent, onChangeName, onChangeContent, onClose, onCreate }) => (
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
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Скасувати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={onCreate}>
            <Text style={styles.confirmButtonText}>Створити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const ViewFileModal = ({ visible, fileName, content, onClose, onEdit }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={[styles.modalContent, styles.largeModal]}>
        <Text style={styles.modalTitle}>{fileName}</Text>
        <ScrollView style={styles.fileContentContainer}>
          <Text style={styles.fileContent}>{content}</Text>
        </ScrollView>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Закрити</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.editButton]} onPress={onEdit}>
            <Text style={styles.confirmButtonText}>Редагувати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const EditFileModal = ({ visible, fileName, content, onChangeContent, onClose, onSave }) => (
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
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Скасувати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={onSave}>
            <Text style={styles.confirmButtonText}>Зберегти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const FileInfoModal = ({ visible, info, onClose }) => (
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
        <TouchableOpacity style={[styles.modalButton, styles.confirmButton, { marginTop: 15 }]} onPress={onClose}>
          <Text style={styles.confirmButtonText}>Закрити</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const DeleteConfirmModal = ({ visible, itemName, onClose, onDelete }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Підтвердження</Text>
        <Text style={styles.deleteText}>
          Ви дійсно хочете видалити "{itemName}"?
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Скасувати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={onDelete}>
            <Text style={styles.confirmButtonText}>Видалити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const FS = createVirtualFileSystem();
const ROOT_DIR = '/';

export default function App() {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [items, setItems] = useState([]);

  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [createFileModal, setCreateFileModal] = useState(false);
  const [viewFileModal, setViewFileModal] = useState(false);
  const [editFileModal, setEditFileModal] = useState(false);
  const [fileInfoModal, setFileInfoModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [currentFileContent, setCurrentFileContent] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemInfo, setSelectedItemInfo] = useState(null);

  useEffect(() => {
    loadDirectory();
  }, [currentPath]);

  const loadDirectory = async () => {
    try {
      const contents = await FS.readDirectoryAsync(currentPath);
      const itemsWithInfo = await Promise.all(
        contents.map(async (name) => {
          const path = currentPath.endsWith('/')
            ? `${currentPath}${name}`
            : `${currentPath}/${name}`;
          const info = await FS.getInfoAsync(path);
          return {
            name,
            path,
            isDirectory: info.isDirectory,
            size: info.size || 0,
            modificationTime: info.modificationTime || Date.now(),
          };
        })
      );
      itemsWithInfo.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
      setItems(itemsWithInfo);
    } catch (error) {
      setItems([]);
    }
  };

  const getBreadcrumb = () => currentPath === '/' ? '/' : currentPath;
  const canGoUp = () => currentPath !== '/';

  const goUp = () => {
    if (!canGoUp()) return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    setCurrentPath('/' + parts.join('/') || '/');
  };

  const navigateToFolder = (item) => {
    if (item.isDirectory) {
      setCurrentPath(item.path);
    } else if (item.name.endsWith('.txt')) {
      openFile(item);
    }
  };

  const openFile = async (item) => {
    try {
      const content = await FS.readAsStringAsync(item.path);
      setSelectedItem(item);
      setCurrentFileContent(content);
      setViewFileModal(true);
    } catch (error) {
      showAlert('Помилка', 'Не вдалося відкрити файл');
    }
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) {
      showAlert('Помилка', 'Введіть назву папки');
      return;
    }
    try {
      const path = currentPath.endsWith('/')
        ? `${currentPath}${newFolderName}`
        : `${currentPath}/${newFolderName}`;
      await FS.makeDirectoryAsync(path);
      setNewFolderName('');
      setCreateFolderModal(false);
      loadDirectory();
    } catch (error) {
      showAlert('Помилка', 'Не вдалося створити папку');
    }
  };

  const createFile = async () => {
    if (!newFileName.trim()) {
      showAlert('Помилка', 'Введіть назву файлу');
      return;
    }
    try {
      const fileName = newFileName.endsWith('.txt') ? newFileName : `${newFileName}.txt`;
      const path = currentPath.endsWith('/')
        ? `${currentPath}${fileName}`
        : `${currentPath}/${fileName}`;
      await FS.writeAsStringAsync(path, newFileContent);
      setNewFileName('');
      setNewFileContent('');
      setCreateFileModal(false);
      loadDirectory();
    } catch (error) {
      showAlert('Помилка', 'Не вдалося створити файл');
    }
  };

  const saveFile = async () => {
    if (!selectedItem) return;
    try {
      await FS.writeAsStringAsync(selectedItem.path, currentFileContent);
      setEditFileModal(false);
      setViewFileModal(false);
      loadDirectory();
      showAlert('Успіх', 'Файл збережено');
    } catch (error) {
      showAlert('Помилка', 'Не вдалося зберегти файл');
    }
  };

  const confirmDelete = (item) => {
    setSelectedItem(item);
    setDeleteConfirmModal(true);
  };

  const deleteItem = async () => {
    if (!selectedItem) return;
    try {
      await FS.deleteAsync(selectedItem.path);
      setDeleteConfirmModal(false);
      setSelectedItem(null);
      loadDirectory();
    } catch (error) {
      showAlert('Помилка', 'Не вдалося видалити');
    }
  };

  const showFileInfo = async (item) => {
    const info = await FS.getInfoAsync(item.path);
    setSelectedItemInfo({
      name: item.name,
      type: item.isDirectory ? 'Папка' : getFileExtension(item.name),
      size: item.isDirectory ? '-' : formatBytes(info.size || 0),
      modificationTime: formatDate(info.modificationTime || Date.now()),
    });
    setFileInfoModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <PathBar currentPath={getBreadcrumb()} canGoUp={canGoUp()} onGoUp={goUp} />
      <ActionBar
        onCreateFolder={() => setCreateFolderModal(true)}
        onCreateFile={() => setCreateFileModal(true)}
      />
      <FileList
        items={items}
        onItemPress={navigateToFolder}
        onItemInfo={showFileInfo}
        onItemDelete={confirmDelete}
      />

      <CreateFolderModal
        visible={createFolderModal}
        folderName={newFolderName}
        onChangeName={setNewFolderName}
        onClose={() => { setCreateFolderModal(false); setNewFolderName(''); }}
        onCreate={createFolder}
      />
      <CreateFileModal
        visible={createFileModal}
        fileName={newFileName}
        fileContent={newFileContent}
        onChangeName={setNewFileName}
        onChangeContent={setNewFileContent}
        onClose={() => { setCreateFileModal(false); setNewFileName(''); setNewFileContent(''); }}
        onCreate={createFile}
      />
      <ViewFileModal
        visible={viewFileModal}
        fileName={selectedItem?.name}
        content={currentFileContent}
        onClose={() => setViewFileModal(false)}
        onEdit={() => { setViewFileModal(false); setEditFileModal(true); }}
      />
      <EditFileModal
        visible={editFileModal}
        fileName={selectedItem?.name}
        content={currentFileContent}
        onChangeContent={setCurrentFileContent}
        onClose={() => setEditFileModal(false)}
        onSave={saveFile}
      />
      <FileInfoModal
        visible={fileInfoModal}
        info={selectedItemInfo}
        onClose={() => setFileInfoModal(false)}
      />
      <DeleteConfirmModal
        visible={deleteConfirmModal}
        itemName={selectedItem?.name}
        onClose={() => { setDeleteConfirmModal(false); setSelectedItem(null); }}
        onDelete={deleteItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
