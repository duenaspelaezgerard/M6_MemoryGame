import { createContext, useState } from "react";
import { supabase } from "../supabase/Supabase";


export const ContextoGlobal = createContext()

export function ContextoGlobalProvider ({children}){
    
    const [contadorGlobal, setContadorGlobal] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const incrementarContadorGlobal = () => {
      setContadorGlobal(contadorGlobal + 1)
    }

    verSiHaySesionLogeado()

    async function verSiHaySesionLogeado(){
        try {
        const { data: { user } } = await supabase.auth.getUser()
        console.log('usuario logeado', user)

        if(user){
            setUsuario({
            email: user.email
            })
        }

        } catch (error) {
            console.log(error)
        }
        
    }


    const [usuario, setUsuario] = useState({
        nombre: 'default',
        apellido: 'default',
        email: 'default',
        password: ''
    })

    return(
        <ContextoGlobal.Provider value={{
            contadorGlobal, setContadorGlobal, incrementarContadorGlobal,
            usuario, setUsuario,
            isLoggedIn, setIsLoggedIn,
        }}>
            {children}
        </ContextoGlobal.Provider>
    )


}