import { User,UserProps } from "../models/User";
import { UserForm } from "./UserForm";
import { UserShow } from "./Usershow";
import { View } from "./View";



export class UserEdit extends View<User,UserProps>{


    regionMap():{[key:string]:string}{
        return {
            userShow :'.user-show',
            userForm:'.user-form'
        }
    }

    template():string{
        return `
        <div>
            <div class="user-show"></div>
            <div class="user-form"></div>
        </div>`
    }

    onRender():void{
        new UserShow(this.regions.userShow,this.Model).render()
        new UserForm(this.regions.userForm,this.Model).render()


    }

}