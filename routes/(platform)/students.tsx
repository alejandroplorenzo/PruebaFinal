import { FreshContext, Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"
import Character from "../../components/Character.tsx";

type student = {
    id: string;
    name: string;
    image: string;
    house: string;
    alternate_names: string[];
}

type APIresponse = {
    results: student[];
}


export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, APIresponse>)=> {
        const api = "https://hp-api.onrender.com/api/characters/students";
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

    return(
        <div class="flex-column">
            <h1 class="mainTitle">Estudiantes Harry Potter</h1>
            <div class="flex-row flex-around">
                {characters.results.map((ch) => (
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
    )
}

export default Page;