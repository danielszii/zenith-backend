import { error } from "node:console";

export type propsAtleta = {
    id: string; 
    nome: string;
    cpf: string;
    rg?: string; 
    data_nasc: Date; 
    tipo_sanguineo: string; 
    peso?: number; 
    altura?: number; 
    status?: string; 
}


export class Atleta{
    

    private constructor(private readonly props: propsAtleta){}


    public static construir(nome: string, cpf: string, data_nasc: Date, tipo_sanguineo: string){

        if(!nome){
            throw new Error("O atributo nome não pode ser vazio")
        }

        const id = crypto.randomUUID().toString()

        const props: propsAtleta = {id, nome, cpf,data_nasc, tipo_sanguineo}    

        return new Atleta(props)    

    }   

    public get nome(){  
        return this.props.nome  
    }   
    public get cpf(){   
        return this.props.nome
    }
    public get rg(){
        return this.props.rg
    }
    public get data_nasc(){
        return this.props.data_nasc
    }
    public get tipo_sanguineo(){
        return this.props.tipo_sanguineo
    }
    public get peso(){
        return this.props.peso
    }
    public get altura(){
        return this.props.altura
    }
    public get status(){
        return this.props.status
    }
}