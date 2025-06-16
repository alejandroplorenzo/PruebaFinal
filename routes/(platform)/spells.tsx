import { FreshContext, Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"
import Spell from "../../components/Spell.tsx";


type spell = {
    name: string;
    description: string;
}

type APIresponse = {
    results: spell[];
}


export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, APIresponse>)=> {
        const api = "https://hp-api.onrender.com/api/spells";
        const response = await Axios.get(api);
        const spellsresponse = response.data;
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

        return ctx.render({results: spellsresponse});
    }
}


const Page = (props: PageProps<APIresponse>) => {
    const spells = props.data;

    return(
        <div class="flex-column">
            <h1 class="mainTitle">Hechizos</h1>
            <div class="flex-row flex-around">
                {spells.results.map((ch) => (
                        <Spell
                            name={ch.name}
                            description={ch.description}
                        />
                ))}
            </div>
        </div>
    )
}

export default Page;