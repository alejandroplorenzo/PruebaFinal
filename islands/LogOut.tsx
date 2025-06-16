import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";


const LogOut: FunctionComponent = () => {
    const [name, setName] = useState<string>("");

    const deleteName = (username: string) => {
        setName(username);
        const date = new Date();
        const expires = date.getTime() - (1 * 24 * 60 * 60 * 1000);
         document.cookie = `name=${username}; path=/; expires=${new Date(expires).toUTCString()}`
    }

    return (
    <div>
      <form method="get" action="/">
        <button onClick={() => deleteName(name)} type="submit"> Log-Out </button>
      </form>
    </div>
  )
}

export default LogOut;