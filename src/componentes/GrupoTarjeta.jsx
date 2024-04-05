import Tarjeta from './Tarjeta'

export default function GrupoTarjeta({ tarjetas, onGeneralClick }) {
    return (
        
        <div className="container mx-auto grid grid-cols-5 gap-4 p-10">

            {

            tarjetas.map((tarjeta, index) => (
                <Tarjeta key={index} nombre={tarjeta.nombre} imagen={tarjeta.imagen} onGeneralClick={onGeneralClick} />
            ))
            
            }

        </div>
    );
}