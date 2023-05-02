import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  const cardDeleteBtnClassName = `element__trash ${
    isOwn && "element__trash_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteMyCard() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        className="element__img"
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className={cardDeleteBtnClassName}
          type="button"
          onClick={handleDeleteMyCard}
        ></button>
      )}
      <div className="element__content">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <h3 className="element__like-counter">{card.likes.length}</h3>
        </div>
      </div>
    </li>
  );
}

export default Card;
