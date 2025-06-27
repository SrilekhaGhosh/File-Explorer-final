const useTraverseTree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });
      return tree;
    }

    const latestNode = tree.items.map((ob) =>
      insertNode(ob, folderId, item, isFolder)
    );

    return { ...tree, items: latestNode };
  };

  const deleteNode = function (tree, folderId) {
    if (tree.id === folderId) return null;

    const latestNode = tree.items
      .map((ob) => deleteNode(ob, folderId))
      .filter(Boolean); // remove nulls

    return { ...tree, items: latestNode };
  };

  const renameNode = (tree, folderId, item) => {
    if (tree.id === folderId) {
      tree.name = item;
      return tree;
    }

    const latestNode = tree.items.map((ob) =>
      renameNode(ob, folderId, item)
    );

    return { ...tree, items: latestNode };
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
