import { useContext, useEffect, useState } from "react";
import GrupoTarjeta from "../componentes/GrupoTarjeta"
import { ContextoGlobal } from "../context/ContextoGlobal.jsx";

export default function Juego() {
    const [pokemonAletorios, setPokemonsAleatorios] = useState([]);
    const [timeLeft, setTimeLeft] = useState(20);
    const {puntuacion} = useContext(ContextoGlobal)

    useEffect(() => {
        async function fetchData(){
            try {
                const pokemons = []
                for(let i = 0; i < 9; i++) {
                    const random = Math.floor(Math.random() * 151   )
                    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + random);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();

                    pokemons.push({
                        id: null,
                        idPokemon: data.id,
                        nombre: data.name,
                        imagen: data.sprites.other['official-artwork'].front_default,
                        estado: false,
                        pareja: false,
                    })
                }
                
                const pokemonDuplicados = [...pokemons, ...pokemons].map((pokemon, index) => ({
                    ...pokemon,
                    id: index, 
                }));
        

                const pokemonRandom = pokemonDuplicados.sort(() => Math.random() - 0.5);
                                
                setPokemonsAleatorios(pokemonRandom);
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
            if(prevTime <= 1) {
              clearTimeout(timer);    
              return 0;
            } else {
              return prevTime - 1;
            }
          });
        }, 1000);

        return () => clearTimeout(timer)

      }, [timeLeft]);

    
    const ContadorGlobal = () => {
        const { contadorGlobal } = useContext(ContextoGlobal);
  
        return (
            <div>
                <h2>Clics Globales: {contadorGlobal}</h2>
            </div>
        )
    }

    return (

            <div className="container mx-auto">
                        <h1 className="text-3xl text-center uppercase mt-3">Pokemons Memory</h1>
                        <ContadorGlobal />
                        <button className="text-white bg-gray-800 px-4 py-2 rounded mt-4">Tiempo Restante: {timeLeft}s</button>
                        <button className="text-white bg-gray-800 px-4 py-2 rounded ml-4 mt-4">Puntuacion: {puntuacion}</button>
                        <GrupoTarjeta tarjetas={pokemonAletorios} setPokemonsAleatorios={setPokemonsAleatorios}/>
            </div>

    )
}

