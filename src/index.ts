import { User } from "./models/User";
import axios from 'axios'
import { UserForm } from "./views/UserForm";


const user = User.buildUser({name:"Jam",age:20})

const userForm  = new UserForm(
    document.getElementById('root'),
    user
)

userForm.render()