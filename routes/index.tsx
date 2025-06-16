import { FreshContext, Handlers } from "$fresh/server.ts";
import LoginForm from "../components/LoginForm.tsx";

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");

    if(!username || !password){
      return ctx.render();
    }

    if(password !== "12345"){
      return ctx.render();
    }

    const headers = new Headers();
    const date = new Date();
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
    headers.append("Set-Cookie", `name=${username}; expires=${date.toUTCString()}; path=/`);
    headers.append("Location", "/characters");

    return new Response ("", {
      status: 302, headers
    });
  }
}

const Page = ()=> {
  return(
    <div><LoginForm/></div>
  );
}

export default Page;
