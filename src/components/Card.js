import deleteButtonImg from "../images/posts/delete-button.svg";
import loveButton from "../images/posts/love-button.svg";

function Card(props) {
  function handleClick() {
    props.onCardClick(props);
  }
  return (
    <>
      <li className="post">
        <img
          className="post__image"
          src={props.link}
          alt={`Imagem de ${props.name}`}
          onClick={handleClick}
        />
        <h3 className="post__description">{props.name}</h3>
        {props.isOwned && (
          <button>
            <img
              className="post__delete-button"
              src={deleteButtonImg}
              alt="Botão de
          deletar"
            />
          </button>
        )}
        <div className="post__likes">
          <button>
            <img
              className="post__like-button"
              src={loveButton}
              alt="Botão de love"
            />
          </button>
          <h6 className="post__like-number">{props.likeNumber}</h6>
        </div>
      </li>
    </>
  );
}

export default Card;
