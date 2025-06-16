import { FunctionComponent } from "preact";


const LoginForm: FunctionComponent = ()=> {

    return(
    <div>
        <form action="/" method="get" >
            <input type="text" name="username" placeholder="Introduce tu usuario"/>
            <input type="text" name="password" placeholder="Introduce tu contraseña"/>
            <button type="submit">Log-In</button>
        </form>
    </div>
    )
}

export default LoginForm;