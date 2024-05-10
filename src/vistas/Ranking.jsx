import { useEffect, useState } from "react";
import { supabase } from "../supabase/Supabase";

export default function Ranking() {
    const [partidas, setPartidas] = useState([]);

    useEffect(() => {
        obtenerDatosPartidas();

        async function obtenerDatosPartidas(){
            try {

                let { data: partidas, error } = await supabase
                .from('partidas')
                .select('*')

                setPartidas(partidas)

            } catch (error) {
                console.log(error)
            }
        
        }
    }, []); 
        
        

        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
        }
        
        function formatTime(dateString) {
            const date = new Date(dateString);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        }

    return (

        <div className="h-screen bg-cyan-900 pt-7 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="mx-auto container flex justify-center mb-7 space-x-0 items-center ">
                <img className="w-[40px] mr-3" src="/pokeballAzul.png" alt="" />
                <h2 className="text-cyan-100 text-4xl font-bold">RANKING PARTIDAS</h2>
                <img className="w-[40px] ml-7" src="/pokeballAzul.png" alt="" />
            </div>                  
            <div className="flex flex-col sm:flex-row items-center mb-5 py-2">
                <input id="inputBuscar" className="bg-cyan-100 border rounded-lg w-full text-cyan-800 mr-0 sm:mr-3 py-2 px-2 focus:outline-none" type="text" placeholder="Buscador" aria-label="Buscador" />
                <div className="flex justify-center">
                    <button className="bg-cyan-100 font-bold text-cyan-800 border p-2 rounded-lg mb-3 sm:mb-0 me-0 sm:me-2" type="button" id="button-addon1">
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <button className="bg-cyan-100 font-bold text-cyan-800 border p-2 rounded-lg mb-3 sm:mb-0 me-0 sm:me-2s" type="button" id="button-addon2">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>

            <div className="">
                <table className="w-full mb-5 py-2">
                    <thead>
                        <tr>
                            <th className="text-xl bg-cyan-800 text-cyan-100">Usuario<i id="flechaNick" className="ml-3 bi bi-arrow-up-square"></i></th>
                            <th className="text-xl bg-cyan-800 text-cyan-100">Puntuación<i id="flechaPunt" className="ml-3 bi bi-arrow-up-square"></i></th>
                            <th className="text-xl bg-cyan-800 text-cyan-100">Fecha<i id="flechaFecha" className="ml-3 bi bi-arrow-up-square"></i></th>
                            <th className="text-xl bg-cyan-800 text-cyan-100">Hora<i id="flechaFecha" className="ml-3 bi bi-arrow-up-square"></i></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {partidas.map((partida, index) => (
                            <tr key={index} className="bg-cyan-100 border border-cyan-800">
                                <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">{partida.usuario}</td>
                                <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">{partida.puntuacion}</td>
                                <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">{formatDate(partida.created_at)}</td>
                                <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">{formatTime(partida.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </div>

    

    )
}

