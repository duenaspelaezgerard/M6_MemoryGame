import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase/Supabase"
import { ContextoGlobal } from "../context/ContextoGlobal"


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {usuario, setUsuario,verSiHaySesionLogeado, isLoggedIn, setIsLoggedIn} = useContext(ContextoGlobal)
 
  useEffect(()=>{
    verSiHaySesionLogeado()
  },[])

  const navigate = useNavigate() 

  const handleSubmit = (e) => {
    e.preventDefault()
    inicioSesion()
    
    async function inicioSesion(){

      try {

        let { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        })

        if(error)throw new Error (error.message)
        setUsuario({
          email: data.user.email
        })

        setIsLoggedIn(true)
        navigate('/juego')

      } catch (error) {
        console.log(error)
      }

    }

  }

  const handleRegistroClick = () => {
    navigate('/registro') 
  }

  return (

    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-center mb-5 text-3xl font-semibold mt-11">Iniciar Sesión</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  id="email"
                  type="text"
                  className="mt-1 p-3 focus:ring-cyan-300 focus:border-cyan-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 p-3 focus:ring-cyan-400 focus:border-cyan-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Recordar Contraseña
                </label>
              </div>
              <div className="text-right mb-3">
                <a href="#" className="text-cyan-500 hover:underline">¿Has olvidado la contraseña?</a>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
          <div className="mt-5">
            <button onClick={handleRegistroClick} className="btn btn-secondary w-full">¿Eres nuevo? Regístrate</button>
          </div>
        </div>
      </div>
    </div>

  );
}
