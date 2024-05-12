import { createContext, useState } from "react";
import { supabase } from "../supabase/Supabase";
import { useNavigate } from "react-router-dom";


export const ContextoGlobal = createContext()

export function ContextoGlobalProvider ({children}){
    
    const [contadorGlobal, setContadorGlobal] = useState(0)
    const [puntuacion, setPuntuacion] = useState(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [juego, setJuego] = useState(false)
    const navigate = useNavigate()

    const incrementarContadorGlobal = () => {
      setContadorGlobal(contadorGlobal + 1)
    }

    async function verSiHaySesionLogeado(){

        try {
            const { data: { user } } = await supabase.auth.getUser()
            
            if(user){
                setIsLoggedIn(true)
                navigate('/juego')
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
            verSiHaySesionLogeado,
            puntuacion, setPuntuacion,
            juego, setJuego,
        }}>
            {children}
        </ContextoGlobal.Provider>
    )


}