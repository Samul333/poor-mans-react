import { User } from "./models/User";
import { App } from "./views/App";



const user = User.buildUser({name:"Jam",age:20})

const userForm  = new App(
    document.getElementById('root'),
    user
)

userForm.render()