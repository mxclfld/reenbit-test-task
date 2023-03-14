import './Character.css';

type CharacterProps = {
  name: string;
  species: string;
  image: string;
};

const Character = ({ name, species, image }: CharacterProps) => {
  return (
    <div className="card">
      <img className="card__image" src={image} alt={name} />
      <div className="card__container">
        <h2>{name}</h2>
        <p>{species}</p>
      </div>
    </div>
  );
};

export default Character;
