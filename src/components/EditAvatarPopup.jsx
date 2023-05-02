import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  onLoading,
}) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_edit_avatar"
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>
  );
}
