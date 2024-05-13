import { useContext, useState } from 'react';
import { ContextoGlobal } from "../context/ContextoGlobal"

export default function Tarjeta({ id, nombre, imagen, estado, onCardClick}) {
    const [clicks, setClicks] = useState(0);
    const {incrementarContadorGlobal, juego, setJuego} = useContext(ContextoGlobal)

    return (
        <div className={`max-w-xs rounded overflow-hidden shadow-lg bg-sky-100 ${estado ? '' : 'girando'} p-5 sm:h-64 md:h-80 lg:h-[314px]`} id={id} onClick={() => {
            if (!estado) {
              setJuego(true)
              onCardClick(id, estado)
              setClicks(clicks + 1)
              incrementarContadorGlobal()
            }

          }}>
            {estado && (
              <>
               <p className="text-gray-700 text-base pb-2 sm:pb-5">Clicks: {clicks}</p>
                <img className="mx-auto w-full sm:h-auto md:h-auto lg:h-48" src={imagen} alt={nombre} />
                <div className="text-center">
                    <div className="text-xl uppercase font-bold">{nombre}</div>
                </div>
              </>
            )}
        </div>
    );
}