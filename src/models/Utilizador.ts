export type propsUtilizador = {
    nome: string;
    email: string;
    senha?: string; // Mantido opcional para quando retornarmos o usuário sem expor o hash da senha
    perfil: string; // Ex: 'admin', 'gestor', 'arbitro'
}

export class Utilizador {

    private constructor(private readonly props: propsUtilizador){}  

    public static construir(nome: string, email: string, senha: string, perfil: string){
        if(!nome || !email || !senha || !perfil){
            throw new Error("Todos os atributos são obrigatórios")
        }
        
        const props: propsUtilizador = {nome, email, senha, perfil}
        return new Utilizador(props)
    }

    public get nome(){
        return this.props.nome
    }
    public get email(){
        return this.props.email
    }
    public get senha(){
        return this.props.senha
    }
    public get perfil(){
        return this.props.perfil
    }
}