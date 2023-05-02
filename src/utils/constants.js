export const config = {
    selectorTemplate: '.element__template',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export const profileForm = document.forms['profile-form'] //форма профиля
export const formAddNewCard = document.forms['form_add_card'] // форма добавления картинки
export const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
export const popupAddButton = document.querySelector(".profile__add-button");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_job");
export const popupEditUserAvatar = document.querySelector('.profile__avatar-button') // кнопка редактирования аватара
export const popupUpdateAvatar = document.querySelector('.popup_edit-avatar')
