import { useState } from "react";
import { arrayPersonajes } from "../bd/arrayPersonajes"
import GrupoTarjeta from "../componentes/GrupoTarjeta"

export default function Juego() {
    const [clicks, setClicks] = useState(0)

    const handleGeneralClick = () => {
        setClicks(clicks + 1);
    }

    return (

            
            <div className="container mx-auto">
                    <button className="text-white bg-gray-800 px-4 py-2 rounded mt-4 ">
                        Clics Generales ({clicks})
                    </button>
                    <h1 className="text-3xl text-center uppercase mt-3">Pokemons Memory</h1>
                    <GrupoTarjeta tarjetas={arrayPersonajes} onGeneralClick={handleGeneralClick} />
            </div>

    )
}

