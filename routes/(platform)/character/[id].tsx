import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type character = {
    name: string;
    image: string;
    house: string;
    alternate_names: string[];
}


export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, character[]>)=> {
        const id = ctx.params.id;

        const response = await Axios.get<character[]>(`https://hp-api.onrender.com/api/character/${id}`);

        const url= new URL(req.url);
        const idURL = url.searchParams.get("id");
        if(idURL){
            return new Response("",{
                status: 307,
                headers:{
              Location: `/character/${idURL}`
            },
          });
        }

        return ctx.render(response.data)
    }
}

const Page = (props: PageProps<character[]>)=> {
    const data = props.data;
    return(
        <div>
            {data.map((ch)=> (
                <div>
                    <h1>{ch.name}</h1>
                    <img src={ch.image} alt={ch.name}/>
                    <a href={`/houses/${ch.house}`}>{ch.house}</a>
                    <div>
                        <strong>También conocido como:</strong>
                        <ul>
                            {ch.alternate_names.map((altName) => (
                            <li key={altName}>{altName}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page;