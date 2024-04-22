import { useContext, useEffect, useState } from "react";
import GrupoTarjeta from "../componentes/GrupoTarjeta"
import { ContextoGlobal } from "../context/ContextoGlobal.jsx";

export default function Juego() {
    const [pokemonAletorios, setPokemonsAleatorios] = useState([]);

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
                        <GrupoTarjeta tarjetas={pokemonAletorios} />
            </div>

    )
}

