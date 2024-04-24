import { useContext} from "react";
import { Link, useNavigate } from "react-router-dom"
import { ContextoGlobal } from "../context/ContextoGlobal"
import { supabase } from "../supabase/Supabase";

export default function Header() {

    const {isLoggedIn, setIsLoggedIn} = useContext(ContextoGlobal)
    const navigate = useNavigate()

    const handleLogout = () => {
      setIsLoggedIn(false)
      navigate('/')
      cerrarSesion()
    }

    async function cerrarSesion(){

      try {

        let { error } = await supabase.auth.signOut()

        if(error)throw new Error (error.messagr)

        setIsLoggedIn(false)
        
      } catch (error) {
        console.log(error)
      }

    }
  
    return (
      <header className="bg-cyan-800 py-6">
        <div className="container mx-auto items-center">
          <ul className="flex space-x-4 justify-end"> 
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/registro" className="bg-cyan-100 font-bold text-cyan-800 border p-3 px-3 shadow-lg">
                    Registro
                  </Link>
                </li>
                <li>
                  <Link to="/" className="bg-cyan-100 font-bold text-cyan-800 border p-3 px-3 shadow-lg">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="flex space-x-4 justify-between">
            {isLoggedIn && (
              <>
                <ul>
                  <li>
                    <Link to="/home" className="bg-cyan-100 font-bold text-cyan-800 border p-2 px-3 shadow-lg">
                      Home
                    </Link>
                  </li>
                </ul>
                <ul className="flex space-x-3"> 
                  <li>
                    <Link to="/juego" className="bg-cyan-100 font-bold text-cyan-800 border p-2 px-3 shadow-lg">
                      Pokemon Memory
                    </Link>
                  </li>
                  <li>
                    <Link to="/juego" className="bg-cyan-100 font-bold text-cyan-800 border p-2 px-3 shadow-lg">
                      Marvel Memory
                    </Link>
                  </li>
                  <li>
                    <Link to="/acercade" className="bg-cyan-100 font-bold text-cyan-800 border p-2 px-3 shadow-lg">
                      Acerca de
                    </Link>
                  </li>
                </ul>                
                <ul>
                  <li>
                    <Link to="/" onClick={handleLogout} className="bg-cyan-100 font-bold text-cyan-800 border p-2 me-2">
                      Cerrar Sesión
                    </Link>
                  </li>
                </ul>
                
              </>
            )}
          </ul>
        </div>
      </header>
    )
  }