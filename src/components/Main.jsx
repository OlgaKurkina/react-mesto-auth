import React from "react";
import editBtnImg from "../images/Edit_icon.svg";
import addBtnImg from "../images/Add_icon.svg";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page">
      <section className="profile" aria-label="Профиль пользователя">
        <div className="profile__avatar">
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Редактировать аватар"
            onClick={onEditAvatar}
          >
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Кнопка Редактировать"
              onClick={onEditProfile}
            >
              <img
                className="profile__edit-img"
                src={editBtnImg}
                alt="Кнопка Редактировать"
              />
            </button>
          </div>
          <p className="profile__user-description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Кнопка Добавить"
          onClick={onAddPlace}
        >
          <img
            className="profile__add-img"
            src={addBtnImg}
            alt="Кнопка Добавить"
          />
        </button>
      </section>
      <section className="elements" aria-label="Блок картинок">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
