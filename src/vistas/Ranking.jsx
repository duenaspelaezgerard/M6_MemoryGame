import { useEffect, useState } from "react";
import { supabase } from "../supabase/Supabase";

export default function Ranking() {
    const [partidas, setPartidas] = useState([]);
    const [orderByUsuario, setOrderByUsuario] = useState(null);
    const [orderByPuntuacion, setOrderByPuntuacion] = useState(null);
    const [orderByFecha, setOrderByFecha] = useState(null);
    const [orderAsc, setOrderAsc] = useState(true);
    const [buscador, setBuscador] = useState("");

    useEffect(() => {
        obtenerDatosPartidas();
    }, []); 
    
    async function obtenerDatosPartidas() {
        try {
            let { data: partidas, error } = await supabase
                .from('partidas')
                .select(`*, usuarios (*)`);

            setPartidas(partidas);
        } catch (error) {
            console.log(error);
        }
    }

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

    function toggleOrder(column) {
        if (column === 'usuario') {
            setOrderByUsuario(column);
        } else if (column === 'puntuacion') {
            setOrderByPuntuacion(column);
        } else if (column === 'fecha') {
            setOrderByFecha(column);
        }
        setOrderAsc(!orderAsc);
    }

    function sortPartidas() {
        let sortedPartidas = [...partidas];
        if (orderByUsuario) {
            sortedPartidas.sort((a, b) => {
                const nameA = a.usuarios.nombre.toUpperCase()
                const nameB = b.usuarios.nombre.toUpperCase()
                return orderAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
            });
        } else if (orderByPuntuacion) {
            sortedPartidas.sort((a, b) => orderAsc ? a.puntuacion - b.puntuacion : b.puntuacion - a.puntuacion);
        } else if (orderByFecha) {
            sortedPartidas.sort((a, b) => {
                const dateA = new Date(a.created_at)
                const dateB = new Date(b.created_at)
                return orderAsc ? dateA - dateB : dateB - dateA
            });
        }
        return sortedPartidas;
    }

    function buscar(texto) {
        setBuscador(texto.toUpperCase());
    }

    function limpiarBusqueda() {
        setBuscador("");
    }

    useEffect(() => {
        sortPartidas();
    }, [orderByUsuario, orderByPuntuacion, orderByFecha, orderAsc, buscador]);

    return (
        <div className="h-screen bg-cyan-900 pt-7 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="mx-auto container flex justify-center mb-7 space-x-0 items-center ">
                <img className="w-[40px] mr-3" src="/pokeballAzul.png" alt="" />
                <h2 className="text-cyan-100 text-4xl font-bold">RANKING PARTIDAS</h2>
                <img className="w-[40px] ml-7" src="/pokeballAzul.png" alt="" />
            </div>
            <div className="flex flex-col sm:flex-row items-center mb-5 py-2">
                <input id="inputBuscar" className="bg-cyan-100 border rounded-lg w-full text-cyan-800 mr-0 sm:mr-3 py-2 px-2 focus:outline-none" type="text" placeholder="Buscador" aria-label="Buscador" value={buscador} onChange={(e) => buscar(e.target.value)} 
                />
                <div className="flex justify-center">
                    <button className="bg-cyan-100 font-bold text-cyan-800 border p-2 rounded-lg mb-3 sm:mb-0 me-0 sm:me-2" type="button" onClick={() => limpiarBusqueda()}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <button className="bg-cyan-100 font-bold text-cyan-800 border p-2 rounded-lg mb-3 sm:mb-0 me-0 sm:me-2s" type="button" onClick={() => buscar(document.getElementById('inputBuscar').value)}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
            <div className="">
                <table className="w-full mb-5 py-2">
                    <thead>
                        <tr>
                            <th className="text-xl bg-cyan-800 text-cyan-100 cursor-pointer" onClick={() => toggleOrder('usuario')}> Usuario <i className={`ml-3 bi bi-arrow-${orderByUsuario ? (orderAsc ? 'up' : 'down') : 'up'}-square`}></i></th>
                            <th className="text-xl bg-cyan-800 text-cyan-100 cursor-pointer" onClick={() => toggleOrder('puntuacion')}> Puntuación <i className={`ml-3 bi bi-arrow-${orderByPuntuacion ? (orderAsc ? 'up' : 'down') : 'up'}-square`}></i></th>
                            <th className="text-xl bg-cyan-800 text-cyan-100 cursor-pointer" onClick={() => toggleOrder('fecha')}> Fecha <i className={`ml-3 bi bi-arrow-${orderByFecha ? (orderAsc ? 'up' : 'down') : 'up'}-square`}></i></th>
                            <th className="text-xl bg-cyan-800 text-cyan-100">Hora</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {sortPartidas()
                            .filter(partida => partida.usuarios.nombre.toUpperCase().includes(buscador))
                            .map((partida, index) => (
                                <tr key={index} className="bg-cyan-100 border border-cyan-800">
                                    <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">{partida.usuarios.nombre}</td>
                                    <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">{partida.puntuacion}</td>
                                    <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">{formatDate(partida.created_at)}</td>
                                    <td className="text-xl text-center text-cyan-800 font-bold border border-cyan-800">{formatTime(partida.created_at)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </div>
    );
}
