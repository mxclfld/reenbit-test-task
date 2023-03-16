import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Loading from '../Loading';
import CharacterInfoType from '../../types/character-info.type';
import './Character.css';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      image
      gender
      status
      species
      origin {
        name
      }
      type
    }
  }
`;

const Character = () => {
  const { characterId } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
  });

  if (loading) return <Loading />;
  if (error) throw new Response('Not Found', { status: 404 });
  console.log(data);

  return (
    <div>
      <Header />
      <CharacterInfo character={data.character} />
    </div>
  );
};

function Header() {
  return (
    <div className="header">
      <button className="header__go-back-button">
        <AiOutlineArrowLeft size={20} />
        <a href={`/`}>
          <h3>go back</h3>
        </a>
      </button>
    </div>
  );
}

function CharacterInfo({ character }: CharacterInfoType) {
  const { name, gender, image, origin, species, status, type } = character;

  return (
    <div className="character-info">
      <img className="character-info__image" src={image} alt={name} />
      <h1 className="character-info__name">{name}</h1>
      <h6>Informations</h6>
      <ul>
        <li>
          <h3>Gender</h3>
          <p>{gender}</p>
        </li>
        <li>
          <h3>Status</h3>
          <p>{status}</p>
        </li>
        <li>
          <h3>Specie</h3>
          <p>{species}</p>
        </li>
        <li>
          <h3>Origin</h3>
          <p>{origin.name}</p>
        </li>
        <li>
          <h3>Type</h3>
          <p>{type || 'Unknown'}</p>
        </li>
      </ul>
    </div>
  );
}

export default Character;
