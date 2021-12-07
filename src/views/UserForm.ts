import { User } from "../models/User"


export class UserForm {

    constructor(public parent: Element, public Model:User){

       this.bindModel()

    }


    bindModel():void{
        this.Model.on('change',()=>{
            this.render()
        })
    }


    eventMap():{[key:string]:()=>void}{

        return{
            'click:.set-age':this.onSetAgeClick
        }
    }

    onSetAgeClick=():void=>{
        this.Model.setRandomAge()
    }

    template():string{

        return `
            <div>
                <h1> User Form </h1>
                <div>User name: ${this.Model.get('name')}</div>
                <div>Age: ${this.Model.get('age')}</div>
                <button> Click Me </button>
                <button class="set-age">Set random age</button>
            </div>
        `
    }



    bindEvents(fragment:DocumentFragment):void{
        const eventsMap = this.eventMap()

        for (let eventKey in eventsMap){

            const [eventName,selector] = eventKey.split(':')
            console.log(eventName,selector)
            fragment.querySelectorAll(selector).forEach(element=>{
                element.addEventListener(eventName,eventsMap[eventKey])
            })

        }
    }


    render():void{
        this.parent.innerHTML = ''
        const templateElement = document.createElement('template')
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content)
        this.parent.append(templateElement.content)
    }
}