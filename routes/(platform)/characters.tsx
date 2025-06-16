import { FreshContext, Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"
import CharacterFilter from "../../islands/CharacterFilter.tsx";

type character = {
    id: string;
    name: string;
    image: string;
    house: string;
    alternate_names: string[];
}
type APIresponse = {
    results: character[];
}

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, APIresponse>)=> {
        const api = "https://hp-api.onrender.com/api/characters";
        const response = await Axios.get(api);
        const charactersresponse = response.data;
        const url= new URL(req.url);
        const id = url.searchParams.get("id");
        if(id){
            return new Response("",{
                status: 307,
                headers:{
              Location: `/character/${id}`
            },
          });
        }

        return ctx.render({results: charactersresponse});
    }
}

const Page = (props: PageProps<APIresponse>) => {
  const characters = props.data;

  return (
    <div class="flex-column">
      <h1 class="mainTitle">Personajes Harry Potter</h1>
      <div>
        <CharacterFilter characters={characters.results} />
      </div>
    </div>
  );
};

export default Page;
