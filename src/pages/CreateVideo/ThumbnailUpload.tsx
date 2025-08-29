import { useState } from "react";
interface Props {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
}

function ThumbnailUpload({ selectedFile, onFileSelect }: Props) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    setFile(file);
  };

  const setFile = (file?: File) => {
    if (file != null && file.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };

  const getPreviewUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="upload-section">
      <h2 className="section-title">
        サムネイル画像<span className="required">*</span>
      </h2>
      <div
        className={`file-drop-zone ${selectedFile && "has-file"} ${
          isDragOver && "drag-over"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="thumbnail-preview-container">
            <img
              src={getPreviewUrl(selectedFile)}
              alt="Thumbnail preview"
              className="thumbnail-preview"
            />
            <button className="remove-file" onClick={() => onFileSelect(null)}>
              ✕
            </button>
          </div>
        ) : (
          <div className="drop-content">
            <div className="upload-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
            <p className="drop-text">サムネイル画像をドラッグ＆ドロップ</p>
            <label className="file-select-button">
              ファイルを選択
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileSelect}
              />
            </label>
            <p className="file-format-text">対応形式: JPG, PNG</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThumbnailUpload;
