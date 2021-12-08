import { Model } from "../models/model"



export abstract class View<T extends Model<K>,K> {

    regions:{[key:string]:Element}={}

    constructor(public parent: Element, public Model:T){

        this.bindModel()
 
     }
 
     
   

     abstract template():string

    regionMap():{[key:string]:string}{
        return {};
    } 

    eventMap(): {[key:string]:()=>void} {
        return {};
    }

     bindModel():void{
         this.Model.on('change',()=>{
             this.render()
         })
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


    mapRegion(fragment:DocumentFragment):void{

        const regionsMap = this.regionMap()
        for (let key in regionsMap){
            const selector = regionsMap[key];
            this.regions[key]= fragment.querySelector(selector)

        }
    }


    onRender():void{
        
    }

    render():void{
        this.parent.innerHTML = ''
        const templateElement = document.createElement('template')
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content)
        this.mapRegion(templateElement.content)
        this.onRender()
        this.parent.append(templateElement.content)
    }
 
 
}