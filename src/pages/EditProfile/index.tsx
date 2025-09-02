import { useState } from "react";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../modules/auth/current-user.state";
import { accountRepository } from "../../modules/account/account.repository";
import { useFlashMessage } from "../../modules/flash-message/flash-message.state";
import "./EditProfile.css";

function EditProfile() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [selectedAvatar, setSelectedAvatar] = useState<File | undefined>(
    undefined
  );
  const [userName, setUserName] = useState(currentUser!.name);
  const [isDragOver, setIsDragOver] = useState(false);
  const { showMessage } = useFlashMessage();

  const setFile = (file?: File) => {
    if (file != null && file.type.startsWith("image/")) {
      setSelectedAvatar(file);
    }
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const getAvatarUrl = () => {
    if (selectedAvatar == null) {
      return currentUser!.iconUrl;
    }
    return URL.createObjectURL(selectedAvatar);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    setFile(file);
  };

  const updateProfile = async () => {
    if (!userName.trim()) {
      showMessage("ユーザー名は必須です", "error");
      return;
    }
    try {
      const user = await accountRepository.updateProfile(
        userName,
        selectedAvatar
      );
      setCurrentUser(user);
      showMessage("プロフィールを更新しました", "success");
    } catch (error) {
      console.error(error);
      showMessage("プロフィールの更新に失敗しました", "error");
    }
  };

  const clearForm = async () => {
    setSelectedAvatar(undefined);
    setUserName(currentUser!.name);
  };

  return (
    <main>
      <div className="edit-profile-container">
        <div className="edit-profile-header">
          <h1 className="edit-profile-title">プロフィール編集</h1>
          <p className="edit-profile-subtitle">
            アバター画像とユーザー名を編集できます
          </p>
        </div>

        <div className="edit-profile-form">
          <div className="edit-profile-section">
            <h2 className="section-title">アバター画像</h2>
            <div className="avatar-edit-container">
              <div className="current-avatar">
                <img
                  src={getAvatarUrl()}
                  alt="Current Avatar"
                  className="avatar-preview"
                />
              </div>
              <div
                className={`avatar-drop-zone ${isDragOver && "drag-over"}`}
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
                <div className="drop-content">
                  <div className="upload-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  </div>
                  <p className="drop-text">
                    新しいアバター画像をドラッグ＆ドロップ
                  </p>
                  <label className="file-select-button">
                    ファイルを選択
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleAvatarSelect}
                    />
                  </label>
                  <p className="file-format-text">対応形式: JPG, PNG</p>
                </div>
                {selectedAvatar && (
                  <button className="remove-avatar">元に戻す</button>
                )}
              </div>
            </div>
          </div>

          <div className="edit-profile-section">
            <h2 className="section-title">
              ユーザー名 <span className="required">*</span>
            </h2>
            <input
              type="text"
              className="username-input"
              placeholder="ユーザー名を入力してください"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="edit-profile-actions">
            <button
              className="save-button"
              disabled={!userName.trim()}
              onClick={updateProfile}
            >
              変更を保存
            </button>
            <button className="cancel-button" onClick={clearForm}>
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditProfile;
