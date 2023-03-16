import { useQuery, gql } from '@apollo/client';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Character from '../Character';
import './Characters.css';
import Loading from '../Loading';
import Error from '../Error';
import Unfound from '../Unfound';

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

type Character = {
  id: number;
  name: string;
  species: string;
  image: string;
};

type CharactersProps = {
  name: string;
  page: number;
  setPage: (page: number) => void;
};

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
        {data.characters.results.map((character: Character) => (
          <Character
            key={character.id}
            name={character.name}
            species={character.species}
            image={character.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Characters;