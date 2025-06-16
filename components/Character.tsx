import { FunctionComponent } from "preact";

type CharacterProps = {
    id: string;
    name: string;
    image: string;
    house: string;
    alternate_names: string[];
};

const Character: FunctionComponent<CharacterProps> = (props) => {
  const { name, image, house, alternate_names } = props;
  return (
    <div class="characterContainer">
      <h2 class="text-overflow">{name}</h2>
      <img class="img-m half-rounded" src={image} alt={name} width="200"/>
      <span>Pertenece a la casa: {house}</span>
      <div>
          <strong>También conocido como:</strong>
          <ul>
            {alternate_names.map((altName) => (
              <li key={altName}>{altName}</li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default Character;