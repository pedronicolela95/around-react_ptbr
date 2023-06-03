import React from "react";
import deleteButtonImg from "../images/posts/delete-button.svg";
import loveButton from "../images/posts/love-button.svg";

import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const card = props.card;
  const name = card.name;
  const link = card.link;
  const likes = card.likes;
  const ownerId = card.owner._id;
  const likeNumber = likes.length;
  const isOwned = ownerId === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);

  return (
    <>
      <li className="post">
        <img
          className="post__image"
          src={link}
          alt={`Imagem de ${name}`}
          onClick={handleClick}
        />
        <h3 className="post__description">{name}</h3>
        {isOwned && (
          <button onClick={handleDeleteClick}>
            <img
              className="post__delete-button"
              src={deleteButtonImg}
              alt="Botão de
          deletar"
            />
          </button>
        )}
        <div className="post__likes">
          <button onClick={handleLikeClick}>
            <img
              className={
                isLiked
                  ? "post__like-button post__like_clicked"
                  : "post__like-button"
              }
              src={loveButton}
              alt="Botão de love"
            />
          </button>
          <h6 className="post__like-number">{likeNumber}</h6>
        </div>
      </li>
    </>
  );
}

export default Card;
