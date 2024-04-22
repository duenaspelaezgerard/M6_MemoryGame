import { useState } from 'react';

export default function Tarjeta({ id, nombre, imagen, estado, onCardClick, parejaEncontrada }) {
    const [clicks, setClicks] = useState(0);

    return (
        <div
            className={`max-w-xs rounded overflow-hidden shadow-lg bg-sky-100 ${estado ? '' : 'girando'} p-5 h-[314px]`} id={id}
            onClick={() => {
                if (!parejaEncontrada) {
                    onCardClick();
                    setClicks(clicks + 1);
                }
            }}>

            {estado && (
                <>
                    <p className="text-gray-700 text-base pb-5">Clicks: {clicks}</p>
                    <img className="mx-auto h-48" src={imagen} alt={nombre} />
                    <div className="p-6">
                        <div className="text-xl uppercase font-bold">{nombre}</div>
                    </div>
                </>
            )}
        </div>
    );
}