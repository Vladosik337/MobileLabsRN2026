// Virtual file system for web platform
export const createVirtualFileSystem = () => {
  let storage = {
    '/': {
      type: 'directory',
      children: {},
      modificationTime: Date.now(),
    },
  };

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
    },
  };
};
