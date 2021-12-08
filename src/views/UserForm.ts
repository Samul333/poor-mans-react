import { User, UserProps } from "../models/User"
import { View } from "./View"



export class UserForm extends View<User,UserProps> {

   
    eventMap():{[key:string]:()=>void}{

        return{
            'click:.set-age':this.onSetAgeClick,
            'click:.set-name':this.onSetNameClick,
            'click:.save-model':this.saveModel
        }
    }

    onSetAgeClick=():void=>{
        this.Model.setRandomAge()
    }

    onSetNameClick=():void=>{
        const input = this.parent.querySelector('input')
        if(!input) return 
        const name = input.value

        this.Model.set({name})
    }

    saveModel=():void=>{
        this.Model.save()
    }

    template():string{

        return `
            <div>
                <input placeholder="${this.Model.get('name')}"/>
                <button class="set-name"> Change name </button>
                <button class="set-age">Set random age</button>
                <button class="save-model">Save Data </button>
            </div>
        `
    }



  
}