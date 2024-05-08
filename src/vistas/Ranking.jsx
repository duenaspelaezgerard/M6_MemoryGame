import { useContext, useEffect, useState } from "react";
import GrupoTarjeta from "../componentes/GrupoTarjeta"
import { ContextoGlobal } from "../context/ContextoGlobal.jsx";

export default function Ranking() {
    const {puntuacion} = useContext(ContextoGlobal)
    const {contadorGlobal} = useContext(ContextoGlobal)

    useEffect(() => {

    }, []);
 
    return (
        <div className="h-full bg-cyan-900 pt-7 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <h2 className="text-center text-cyan-100 text-4xl font-bold mb-7">RANKING PARTIDAS</h2>
            
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
                    <tbody className="" id="cuerpoTabla">
                        <tr className="bg-cyan-100 border border-cyan-800">
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">Usuario1</td>
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">1000</td>
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">2024-05-01</td>
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800"> 14:56</td>
                        </tr>
                        <tr className="bg-cyan-100 border border-cyan-800">
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">Usuario2</td>
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">800</td>
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">2024-05-02</td>
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800"> 14:56</td>
                        </tr>
                        <tr className="bg-cyan-100 border border-cyan-800">
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">Usuario3</td>
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">1200</td>
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">2024-05-03</td>
                            <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800"> 14:56</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </div>

    

    )
}

