import React, { useState } from "react";

function Folder({
  handleInsertNode = () => {},
  handleRenameNode = () => {},
  handleDeleteNode = () => {},
  explorer,
}) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const [showRename, setShowRename] = useState(false);
  const [showInputValue, setShowInputValue] = useState(explorer.name);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({ visible: true, isFolder: isFolder });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleRename = (e) => {
    e.stopPropagation();
    setShowRename(true);
    setShowInputValue(explorer.name);
  };

  const onRename = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleRenameNode(explorer.id, e.target.value);
      setShowRename(false);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "5px",
    paddingLeft: "10px",
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          onClick={() => setExpand(!expand)}
          style={containerStyle}
        >
          {showRename ? (
            <input
              type="text"
              autoFocus
              onKeyDown={onRename}
              onBlur={() => setShowRename(false)}
              value={showInputValue}
              onChange={(e) => setShowInputValue(e.target.value)}
            />
          ) : (
            <span>📁 {explorer.name}</span>
          )}

          <div style={{ display: "flex", gap: "5px" }}>
            <button onClick={(e) => handleNewFolder(e, true)}>📁+</button>
            <button onClick={(e) => handleNewFolder(e, false)}>📄+</button>
            <button onClick={handleRename}>✏️</button>
            <button onClick={handleDelete}>🗑️</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div style={containerStyle}>
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.items.map((exp) => (
            <Folder
              key={exp.id}
              explorer={exp}
              handleInsertNode={handleInsertNode}
              handleRenameNode={handleRenameNode}
              handleDeleteNode={handleDeleteNode}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div style={containerStyle}>
        {showRename ? (
          <input
            type="text"
            autoFocus
            onKeyDown={onRename}
            onBlur={() => setShowRename(false)}
            value={showInputValue}
            onChange={(e) => setShowInputValue(e.target.value)}
          />
        ) : (
          <span>📄 {explorer.name}</span>
        )}
        <button onClick={handleRename}>✏️</button>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    );
  }
}

export default Folder;
