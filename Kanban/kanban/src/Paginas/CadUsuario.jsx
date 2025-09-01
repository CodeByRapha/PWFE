import axios from 'axios'; //é o hook que faz a comunicação com a internet (através do protocolo http)
//são bibliotecas que permite a validação de interação com o usuário...Nunca duvide da capacidade do usuário
// React é comum ver o zod
import { useForm } from 'react-hook-form'; //Hook (use) aqui permite a validação de formulário
import { z } from 'zod'; // zod é uma descrição de como vou validar, quais seriam as regras
import { zodResolver } from '@hookform/resolvers/zod'; // é o liga o hook form com o zod
 
//validação de formulário -- estou usando as regras do zod, que pode ser consultada na web
const schemaCadUsuario = z.object({
    nome: z.string()
        .min(1,'Insira ao menos 1 caractere')
        .max(30, 'Insira até 30 caracteres'),
    email:z.string()
        .min(1, 'Insira seu email')
        .max(30, 'Insira um endereço de email com até 30 carateres')
        .email("Formato de email invalido"),
})
 
 
export function CadUsuario(){
    
    const{
        register, // registra para mim o que o usuário faz
        handleSubmit, // no momento em que ele der um submit (botão)
        formState:{errors}, // no formulário, se der ruim guarda os erros na variável errors
        reset
    }=useForm({
        resolver: zodResolver(schemaCadUsuario)
    })

    async function obterdados(data) {
        console.log('dados informados pelo user:', data)   
    
    // para grande parte das interações com outra plataforma é necessário usar o try
    try{
        await axios.post("http://127.0.0.1.8000/usuario/", data);
        alert("Usuário cadastrado com sucesso");
        reset(); // limpo o formulário depois do cadastro
    }catch(error){
        alert("Éeee, não rolou, na próxima talvez");
        console.log("Erros", error)
        }
    }


    return(
        <form className="formularios" onSubmit={handleSubmit(obterdados)}>
            <h2>Cadastro do Usuário</h2>
 
            <label>Nome:</label>
            <input type='text' placeholder='Jose da Silva' {...register("nome")}/>
            {/* aqui eu vejo a variável errors no campo nome e exibo a mensagem para o usuário */} 
            {errors.nome && <p>{errors.nome.message}</p>}
 
            <label>E-mail</label>
            <input type='email' placeholder='email@email.com' {...register("email")}/>
            {/* aqui eu vejo a variável errors no campo nome e exibo a mensagem para o usuário */} 
            {errors.email && <p>{errors.email.message}</p>}
 

            <button type='submit'>Cadastrar</button>
 
        </form>
    )
}