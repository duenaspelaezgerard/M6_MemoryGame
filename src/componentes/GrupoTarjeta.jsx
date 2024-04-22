import { useEffect, useState } from 'react';
import Tarjeta from './Tarjeta';

export default function GrupoTarjeta({ tarjetas }) {
    const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

    const handleCardClick = (id) => {

        if (tarjetaSeleccionada === null) {
            setTarjetaSeleccionada(id);
        }
    }

    const compararCartas = () => {
        if (tarjetaSeleccionada !== null) {
            // Obtener la tarjeta seleccionada actualmente
            const tarjetaActual = tarjetas.find(tarjeta => tarjeta.id === tarjetaSeleccionada);

            // Buscar otras tarjetas seleccionadas
            const otrasTarjetasSeleccionadas = tarjetas.filter(tarjeta => tarjeta.estado && tarjeta.id !== tarjetaSeleccionada);

            // Si hay otra tarjeta seleccionada, comprobar si hay coincidencia
            if (otrasTarjetasSeleccionadas.length > 0) {
                const otraTarjeta = otrasTarjetasSeleccionadas[0]; // Solo comparamos con la primera tarjeta seleccionada

                if (tarjetaActual.nombre === otraTarjeta.nombre) {
                    console.log('¡Pareja encontrada!');
                    // Aquí podrías mantener las tarjetas giradas o realizar alguna otra acción
                } else {
                    console.log('¡Pareja no encontrada!');
                    // Aquí podrías revertir las tarjetas a su estado original (boca abajo) o realizar alguna otra acción
                }

                // Limpiar la selección de tarjetas después de comparar
                setTimeout(() => {
                    setTarjetaSeleccionada(null);
                }, 1000);
            }
        }
    }

    useEffect(() => {
        // Llamar a la función compararCartas cada vez que se actualiza tarjetaSeleccionada
        compararCartas();
    }, [tarjetaSeleccionada]);

    return (
        <div className="container mx-auto grid grid-cols-6 gap-4 p-10">
            {tarjetas.map((tarjeta, index) => (
                <Tarjeta
                    key={index}
                    id={tarjeta.id}
                    
                    nombre={tarjeta.nombre}
                    imagen={tarjeta.imagen}
                    estado={tarjeta.id === tarjetaSeleccionada}
                    onCardClick={() => handleCardClick(tarjeta.id)}
                />
            ))}
        </div>
    );
}
