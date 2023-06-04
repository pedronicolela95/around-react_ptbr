import React from "react";
import editButtonImg from "../images/profile/edit_button.svg";
import plusSignImg from "../images/profile/plus-sign.svg";
import editImageButton from "../images/profile/edit-picture.svg";

import Card from "./Card";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
  const {
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    handleEditAvatarClick,
    handleEditProfileClick,
    handleAddPlaceClick,
    closeAllPopups,
    isImagePopupOpen,
    handleCardClick,
    selectedCard,
    handleUpdateUser,
    handleUpdateAvatar,
    cards,
    onCardLike,
    onCardDelete,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__image" onClick={handleEditAvatarClick}>
          <div className="profile__picture-overlay"></div>
          <img
            className="profile__edit-picture"
            alt="Logo"
            src={editImageButton}
          />
          <img
            className="profile__picture"
            alt="User profile"
            src={currentUser.avatar}
          />
        </div>
        <div className="profile__info">
          <h3 className="profile__name">{currentUser.name}</h3>
          <h5 className="profile__about-me">{currentUser.about}</h5>
          <button onClick={handleEditProfileClick}>
            <img
              className="profile__edit-button"
              alt="Edit Button logo"
              src={editButtonImg}
            />
          </button>
        </div>
        <button className="profile__add-button" onClick={handleAddPlaceClick}>
          <img
            className="profile__plus-sign"
            alt="Add Button logo"
            src={plusSignImg}
          />
        </button>
      </section>
      <ul className="posts">
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      ></EditProfilePopup>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>

      <PopupWithForm
        name="place-form"
        title="Novo local"
        isOpen={isAddPlacePopupOpen}
        closeFunction={closeAllPopups}
      >
        <input
          className="popup__input"
          id="title-input"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__error title-input-error"></span>
        <input
          className="popup__input"
          type="url"
          id="image-link-input"
          placeholder="Link da imagem"
          required
        />
        <span className="popup__error image-link-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="delete-form"
        title="Tem certeza?"
        onClose={closeAllPopups}
      ></PopupWithForm>
      <ImagePopup
        name="image-zoom"
        isOpen={isImagePopupOpen}
        closeFunction={closeAllPopups}
        selectedCard={selectedCard}
      ></ImagePopup>
    </>
  );
}

export default Main;
