import  { useState } from 'react'


export default function Tarjeta({imagen, nombre, onGeneralClick}) {
    
    const [clicks, setClicks] = useState(0)

    const handleClick = () => {
        setClicks(clicks + 1)
        onGeneralClick()

    }

    return (

        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-zinc-100 p-5" onClick={handleClick}>

            <p className="text-gray-700 text-base pb-5">Clicks: {clicks}</p>
            <img className="mx-auto h-48" src={imagen} alt={nombre} />
       
            <div className="p-6">
                <div className="text-xl">{nombre}</div>
            </div>

        </div>
    )


}