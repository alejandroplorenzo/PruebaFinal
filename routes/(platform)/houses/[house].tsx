import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import Character from "../../../components/Character.tsx";

type Character = {
  id: string;
  name: string;
  image: string;
  house: string;
  alternate_names: string[];
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, { house: string; characters: Character[] }>
  ) => {
    const { house } = ctx.params;
    const response = await Axios.get<Character[]>(
      `https://hp-api.onrender.com/api/characters/house/${house}`
    );
    return ctx.render({ house, characters: response.data });
  },
};

const Page = ({ data }: PageProps<{ house: string; characters: Character[] }>) => {
  return (
<div class="flex-column">
            <h1 class="mainTitle">Personajes de la Casa {data.house}</h1>
            <div class="flex-row flex-around">
                {data.characters.map((ch) => (
                    <a href={`/character/${ch.id}`} class="link-reset">
                        <Character
                            id={ch.id}
                            name={ch.name}
                            image={ch.image}
                            house={ch.house}
                            alternate_names={ch.alternate_names}
                        />
                    </a>
                ))}
            </div>
        </div>
  );
};

export default Page;

