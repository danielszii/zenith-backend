export type propsClube = {
    nome: string;
    brasao?: string;
    cores_oficiais?: string;
    responsavel?: string;
    cnpj?: string;
}

export class Clube {

    private constructor(private readonly props: propsClube){}

    public static construir(nome: string, brasao?: string, cores_oficiais?: string, responsavel?: string, cnpj?: string){

        if(!nome || !responsavel || !cnpj){
            throw new Error("Os atributos nome, responsável e CNPJ não podem ser vazios")
        }

        const props: propsClube = {nome, brasao, cores_oficiais, responsavel, cnpj}

        return new Clube(props)
    }

    public get nome(){
        return this.props.nome
    }   
    public get brasao(){
        return this.props.brasao
    }
    public get cores_oficiais(){
        return this.props.cores_oficiais
    }
    public get responsavel(){
        return this.props.responsavel
    }
    public get cnpj(){
        return this.props.cnpj
    }
}