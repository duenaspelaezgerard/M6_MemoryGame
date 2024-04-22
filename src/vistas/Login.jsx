import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase/Supabase"
import { ContextoGlobal } from "../context/ContextoGlobal"


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {usuario, setUsuario} = useContext(ContextoGlobal)
  const {isLoggedIn, setIsLoggedIn} = useContext(ContextoGlobal)

  const navigate = useNavigate() 

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Email:', email)
    console.log('Contraseña:', password)

    inicioSesion()
    
    async function inicioSesion(){

      try {

        let { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        })

        if(error)throw new Error (error.messagr)
        setUsuario({
          email: data.user.email
        })

        setIsLoggedIn(true)

      } catch (error) {
        console.log(error)
      }

    }

  }

  const handleRegistroClick = () => {
    navigate('/registro') 
  }

  return (
    <div className="container mt-5">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-center mt-3 mb-5 text-3xl font-semibold">Iniciar Sesión</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  id="email"
                  type="text"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Recordar Contraseña
                </label>
              </div>
              <div className="text-right mb-3">
                <a href="#" className="text-blue-500 hover:underline">¿Has olvidado la contraseña?</a>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
