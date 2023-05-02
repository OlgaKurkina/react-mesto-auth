import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  onLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        id="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__input-error element-name-error"></span>
      <input
        className="popup__input popup__input_type_job"
        type="text"
        name="about"
        id="about"
        placeholder="О себе"
        required
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error element-link-error"></span>
    </PopupWithForm>
  );
}
