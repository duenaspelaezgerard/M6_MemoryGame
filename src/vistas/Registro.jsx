import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase/Supabase"
import { ContextoGlobal } from "../context/ContextoGlobal"

export default function Registro() {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [contrasena, setContrasena] = useState('')
    const {usuario, setUsuario} = useContext(ContextoGlobal)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        registro()
        
        console.log('Datos del formulario:', { nombre, apellido, email, contrasena })

        
    
        async function registro(){


            try {
                //REGISTRO

                let { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: contrasena
                })
                console.log('data', data)
                if(error)throw new Error (error.messagr)
                setUsuario({
                email: data.email
                })
                
            } catch (error) {
                console.log(error)
            }

            const { data: dbData, error: dbError } = await supabase
            .from('usuarios')
            .insert([
                {
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                },
            ])
    
            if (dbError) {
                console.error('Error al insertar usuario en la base de datos:', dbError.message);
                return;
            }
        }

        navigate('/')

        
    }

    return (

        <div className="container mx-auto">
            <div className="flex justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-center mt-3 mb-5 text-3xl font-semibold">Registro</h1>
                <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input
                        id="nombre"
                        type="text"
                        className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellidos:</label>
                    <input
                        id="apellido"
                        type="text"
                        className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        id="email"
                        type="email"
                        className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                    <input
                        id="contrasena"
                        type="password"
                        className="mt-1 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Enviar
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}
