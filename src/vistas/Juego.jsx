import { useContext, useEffect, useState } from "react";
import GrupoTarjeta from "../componentes/GrupoTarjeta"
import { ContextoGlobal } from "../context/ContextoGlobal.jsx";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/Supabase";

export default function Juego() {
    const [pokemonAletorios, setPokemonsAleatorios] = useState([]);
    const [numerosAleatorios, setNumerosAleatorios] = useState([]);
    const [timeLeft, setTimeLeft] = useState(20);
    const {puntuacion} = useContext(ContextoGlobal)
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate()
    

    useEffect(() => {
        async function fetchData(){

            try {
                const pokemons = [];
                const url = 'https://pokeapi.co/api/v2/pokemon/';
        
                const numeros = [];
                while (numeros.length < 9) {
                    const random = Math.floor(Math.random() * 151) + 1;
                    if (!numeros.includes(random)) {
                        numeros.push(random);
                    }
                }
        
                const urlFetch = [];
                for(let i = 0; i < 9; i++) {
                    const urlCompleta = new URL(url + numeros[i]);
                    urlFetch.push(fetch(urlCompleta.href).then(resp => resp.json()));
                }
        
                Promise.all(urlFetch).then(data => {
                    for(let i = 0; i < 9; i++) {
                        pokemons.push({
                            id: null,
                            idPokemon: data[i].id,
                            nombre: data[i].name,
                            imagen: data[i].sprites.other['official-artwork'].front_default,
                            estado: false,
                            pareja: false,
                        });
                    }
        
                    const pokemonDuplicados = [...pokemons, ...pokemons].map((pokemon, index) => ({
                        ...pokemon,
                        id: index, 
                    }));
        
                    const pokemonRandom = pokemonDuplicados.sort(() => Math.random() - 0.5);
        
                    setPokemonsAleatorios(pokemonRandom);
                });
            } catch (error) {
                console.error(error.message);
            } finally {
                console.log('Petición finalizada');
            }        
        }
        

        fetchData();
    }, []);



    useEffect(() => {

        const timer = setTimeout(() => {
          setTimeLeft(prevTime => {
            if(prevTime < 1) {
                setShouldNavigate(true)
                clearTimeout(timer)   
                return 0
            } else {
                return prevTime - 1
            }
          });
        }, 1000);

        return () => clearTimeout(timer)

    }, [timeLeft]);


    useEffect(() => {
        if (shouldNavigate) {
            guardarDatosPartida();
            navigate('/ranking');
        }

        

    }, [shouldNavigate, navigate]);

    async function guardarDatosPartida(){
        try {
            
            const { data: { user } } = await supabase.auth.getUser()
            const { data: usu, error: errorUsu } = await supabase
            .from('partidas')
            .insert([
                {
                    usuario: user.email,
                    puntuacion: puntuacion,
                }
            ])
            .select()

            if(errorUsu)throw new Error (errorUsu.message)
    
        } catch (error) {
            console.log(error)
        }

    }

    const ContadorGlobal = () => {
        const { contadorGlobal } = useContext(ContextoGlobal);
  
        return (
            <div>
                <h2>Clics Globales: {contadorGlobal}</h2>
            </div>
        )
    }

    return (
        <div className="bg-cyan-100 h-screen">
            <div className="container mx-auto">
                        <h1 className="text-3xl text-center uppercase">Pokemons Memory</h1>
                        <ContadorGlobal />
                        <button className="text-white bg-gray-800 px-4 py-2 rounded mt-4">Tiempo Restante: {timeLeft}s</button>
                        <button className="text-white bg-gray-800 px-4 py-2 rounded ml-4 mt-4">Puntuacion: {puntuacion}</button>
                        <GrupoTarjeta tarjetas={pokemonAletorios} setPokemonsAleatorios={setPokemonsAleatorios}/>
            </div>
        </div>
            

    )
}

