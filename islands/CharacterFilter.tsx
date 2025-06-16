import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import Character from "../components/Character.tsx";

type CharacterProps = {
  id: string;
  name: string;
  image: string;
  house: string;
  alternate_names: string[];
};

type Props = {
  characters: CharacterProps[];
};

const CharacterFilter: FunctionComponent<Props> = ({ characters }) => {
  const [house, setHouse] = useState("");
  const [name, setName] = useState("");
  const [filtered, setFiltered] = useState(characters);

  useEffect(() => {
    const result = characters.filter((char) => {
      return (
        (!house || char.house === house) &&
        char.name.toLowerCase().includes(name.toLowerCase())
      );
    });
    setFiltered(result);
  }, [house, name]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <select
          value={house}
          onChange={(e) => setHouse(e.currentTarget.value)}
        >
          <option value="">Todas las casas</option>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Hufflepuff">Hufflepuff</option>
          <option value="Ravenclaw">Ravenclaw</option>
        </select>
      </div>

      <div class="flex-row flex-around">
        {filtered.map((char) => (
          <a href={`/character/${char.id}`} class="link-reset" key={char.id}>
            <Character
              id={char.id}
              name={char.name}
              image={char.image}
              house={char.house}
              alternate_names={char.alternate_names}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default CharacterFilter;
