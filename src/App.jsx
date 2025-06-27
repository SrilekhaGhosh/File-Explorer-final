import { useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css";
 import explorer from "./data/folderData"


export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode,deleteNode,renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleRenameNode = (folderId, item) => {
    const finalTree = renameNode(explorerData, folderId, item);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    console.log(folderId, "folderId")
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };
  console.log(explorerData)

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode}  handleDeleteNode={handleDeleteNode} handleRenameNode={handleRenameNode} explorer={explorerData} />
    </div>
  );
}

// fix connect script in latest video