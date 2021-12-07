import { AxiosPromise, AxiosResponse } from "axios";


interface ModelAttribute <T>{

    set(value:T):void;
    getAll():T;
    get<K extends keyof T>(Key:K): T[K]

}


interface Sync<T> { 

    fetch(id:number):AxiosPromise
    save(data:T): AxiosPromise
}


interface Events{

    on(eventName:string,callback:()=>void)
    trigger(eventName:string):void
}

interface HasId{
    id?:number
}

export class Model<T extends HasId>{

    constructor(
        private attributes : ModelAttribute<T>,
        private events: Events,
        private sync:Sync<T>
    ){}


    
    get on(){
        return this.events.on
    }


    get trigger(){
        return this.events.trigger
    }


    get get(){
        return this.attributes.get
    }
   

    set(update: T):void{
        this.attributes.set(update)
        this.events.trigger('change')
    }


    fetch():void{
        const id = this.attributes.get('id')
        if(typeof id  !=='number'){
            throw new Error('Cannot fetch data without an Id')
        }

        this.sync.fetch(id).then((res:AxiosResponse):void=>{
            this.set(res.data)
        })
    }


    save():void{
        this.sync.save(this.attributes.getAll())
        .then((res:AxiosResponse)=>{
            this.trigger('save')
        })
        .catch(()=>{
            this.trigger('error')
        })
    }

}