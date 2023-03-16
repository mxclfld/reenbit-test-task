type OriginType = {
  __typename: string;
  name: string;
};

type CharacterInfoType = {
  character: {
    name: string;
    image: string;
    gender: string;
    status: string;
    species: string;
    origin: OriginType;
    type: string;
  };
};

export default CharacterInfoType;
