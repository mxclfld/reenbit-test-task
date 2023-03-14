import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import Character from '../Character';
import './Characters.css';

const GET_CHARACTERS = gql`
  query Characters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        next
        prev
      }
      results {
        name
        species
        image
      }
    }
  }
`;

type Character = {
  name: string;
  species: string;
  image: string;
};

type CharactersProps = {
  name: string;
};

const Characters = ({ name }: CharactersProps) => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page, name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="characters">
      {data.characters.results.map((character: Character) => (
        <Character
          name={character.name}
          species={character.species}
          image={character.image}
        />
      ))}
    </div>
  );
};

export default Characters;
