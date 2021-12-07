import { User } from "./models/User";
import axios from 'axios'
import { UserForm } from "./views/UserForm";



const userForm  = new UserForm(
    document.getElementById('root')
)

userForm.render()