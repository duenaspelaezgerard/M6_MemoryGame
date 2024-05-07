import { useContext, useEffect, useState } from 'react';
import Tarjeta from './Tarjeta';
import { ContextoGlobal } from "../context/ContextoGlobal"

export default function GrupoTarjeta({ tarjetas }) {

    const { puntuacion, setPuntuacion } = useContext(ContextoGlobal);
    const [primerClick, setPrimerClick] = useState(null);
    const [tarjetasGiradas, setTarjetasGiradas] = useState([]);
    const [idCoincidentes, setIdCoincidentes] = useState([]);

    const handleCardClick = (id, estado) => {

        console.log('id', id)
        console.log('estado', estado) 

        if (primerClick === null) {
            const primeraCarta = tarjetas.find(tarjeta => tarjeta.id === id)
            primeraCarta.estado = true
            setPrimerClick(id);
        } else {
            const segundaCarta = tarjetas.find(tarjeta => tarjeta.id === id)
            segundaCarta.estado = true
            setTarjetasGiradas([...tarjetasGiradas, primerClick, id]);
            
            compararCartas(primerClick, id);
            setPrimerClick(null);
        }
        
    };

    const compararCartas = (primerClick, segundoClick) => {
        const primeraCarta = tarjetas.find(tarjeta => tarjeta.id === primerClick);
        console.log('primeraCarta', primeraCarta)
        const segundaCarta = tarjetas.find(tarjeta => tarjeta.id === segundoClick);
        console.log('segundaCarta', segundaCarta)
    
        if (primeraCarta.idPokemon === segundaCarta.idPokemon) {

            console.log('ENHORABUENA HAS ENCONTRADO UNA PAREJA')
            setIdCoincidentes([...idCoincidentes, primerClick, segundoClick]);
            setPuntuacion(puntuacion + 10);
        } else {

            console.log('Oops! Las cartas no coinciden');
            console.log('tarjetasGiradas', tarjetasGiradas)
            setTimeout(() => {

                primeraCarta.estado = false;
                segundaCarta.estado = false;
            }, 500); 
        }
    };

    return (
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-5">
            {tarjetas.map((tarjeta, index) => (
                <Tarjeta
                key={index}
                id={tarjeta.id}
                idPokemon={tarjeta.idPokemon}
                nombre={tarjeta.nombre}
                imagen={tarjeta.imagen}
                estado={tarjeta.estado}
                pareja={idCoincidentes.includes(tarjeta.id)}
                onCardClick={() => handleCardClick(tarjeta.id, tarjeta.estado)}
                />
            ))}
        </div>
    );
}
