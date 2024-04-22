import { useContext} from "react";
import { Link } from "react-router-dom"
import { ContextoGlobal } from "../context/ContextoGlobal"

export default function Header() {

    const {isLoggedIn, setIsLoggedIn} = useContext(ContextoGlobal)

    const handleLogout = () => {
      setIsLoggedIn(false)
    }
  
    return (
      <header className="bg-zinc-50 py-4">
        <div className="container mx-auto items-center">
          <nav className="flex justify-center">
            <ul className="flex space-x-4">
              {!isLoggedIn && (
                <>
                  <li>
                    <Link to="/registro" className="border p-2 me-2">
                      Registro
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="border p-2 me-2">
                      Login
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <>
                  <li>
                    <Link to="/home" className="border p-2 me-2">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/juego" className="border p-2 me-2">
                      Pokemon Memory
                    </Link>
                  </li>
                  <li>
                    <Link to="/juego" className="border p-2 me-2">
                      Marvel Memory
                    </Link>
                  </li>
                  <li>
                    <Link to="/acercade" className="border p-2 me-2">
                      Acerca de
                    </Link>
                  </li>
                  {/* Botón para cerrar sesión */}
                  <li>
                    <button onClick={handleLogout} className="border p-2 me-2">
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    )
  }