import { FreshContext, MiddlewareHandler } from "$fresh/server.ts";

type State = {name: string;}

export const handler: MiddlewareHandler<State> = (req: Request, ctx: FreshContext) => {
    const headers = req.headers;
    const cookie = headers.get("Cookie");
    const cookies = cookie?.split(";");
    const cookie_name = cookies?.find((row) => row.trim().startsWith("name="));
    if(cookie_name){const username = cookie_name.split("=")[1];
        ctx.state = {name: username};
        const next = ctx.next(); return next;
    }

    return new Response ("",{
        status: 302,
        headers:{
            Location: "/"
        }
    })
}