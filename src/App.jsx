import Header from "./componentes/Header"
import Juego from "./vistas/Juego"
import { ContextoGlobalProvider } from './context/ContextoGlobal.jsx';
import { Route, Routes } from 'react-router-dom'
import VistaHome from "./vistas/VistaHome.jsx";
import Registro from "./vistas/Registro.jsx";
import Login from "./vistas/Login.jsx";



function App() {
  return (
    <>
      <ContextoGlobalProvider>
            <Header/>
            <Routes>
                <Route path='/home' element={<VistaHome/>}/>
                <Route path='/juego' element={<Juego/>}/>
                <Route path='/registro' element={<Registro/>}/>
                <Route path='/' element={<Login/>}/>
                {/* <Route path='/acercade' element={<VistaAcercaDe/>}/> */}
            </Routes>
        </ContextoGlobalProvider>

        
    </>
  )
}

export default App