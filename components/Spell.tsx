import { FunctionComponent } from "preact";

type SpellProps = {
  name: string;
  description: string;
};

const Spell: FunctionComponent<SpellProps> = (props) => {
  const { name, description } = props;
  return (
    <div class="characterContainer">
      <h2 class="text-overflow">{name}</h2>
      <span class="text-overflow">{description}</span>
    </div>
  );
};

export default Spell;