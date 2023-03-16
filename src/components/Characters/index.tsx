import { useQuery, gql } from '@apollo/client';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Character from '../../types/character.type';
import CharactersProps from '../../types/characters-props.type';
import CharacterCardProps from '../../types/character-card-props.type';
import Loading from '../Loading';
import Error from '../Error';
import Unfound from '../Unfound';
import './Characters.css';
import './CharacterCard.css';

const GET_CHARACTERS = gql`
  query Characters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        next
        prev
      }
      results {
        id
        name
        species
        image
      }
    }
  }
`;

const Characters = ({ name, page, setPage }: CharactersProps) => {
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, name },
  });

  const handlePrevClick = () => {
    setPage(data.characters.info.prev);
  };

  const handleNextClick = () => {
    setPage(data.characters.info.next);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!!!data.characters.results.length) return <Unfound />;

  const resultData = [...data.characters.results].sort(
    (a: Character, b: Character) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }
  );

  return (
    <div className="characters">
      <div className="characters__buttons">
        <button
          onClick={handlePrevClick}
          style={{
            visibility: !!!data.characters.info.prev ? 'hidden' : 'visible',
          }}
        >
          <BiChevronLeft size={20} />
          Prev
        </button>
        <button
          onClick={handleNextClick}
          style={{
            visibility: !!!data.characters.info.next ? 'hidden' : 'visible',
          }}
        >
          Next
          <BiChevronRight size={20} />
        </button>
      </div>
      <div className="characters__panel">
        {resultData.map((character: Character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            species={character.species}
            image={character.image}
          />
        ))}
      </div>
    </div>
  );
};

function CharacterCard({ id, name, species, image }: CharacterCardProps) {
  return (
    <a href={`/characters/${id}`} className="card">
      <img className="card__image" src={image} alt={name} />
      <div className="card__container">
        <h2>{name}</h2>
        <p>{species}</p>
      </div>
    </a>
  );
}

export default Characters;
