import React, { useState } from 'react'
import FoormAddProduct from '../components/FoormAddProduct'
import ListarProductAdmin from '../components/ListarProductAdmin'
import { Link } from 'react-router-dom' //Importamos Link para poder darle navegacion al boton de Categorias
import ListarUsuarios  from '../components/ListarUsuarios'

const PageAdmin = () => {


    const [estadosAdmin, setEstadosAdmin]=useState({
      goAddProduct:false,
      goList:false,
      goListUsuarios:false
    })

    const handleAddProduct=()=>{
        setEstadosAdmin({goAddProduct:true})
    }
    
    const handleListProducts=()=>{
      setEstadosAdmin({goList:true})
    }
    const hanDleListUsuarios=()=>{
      setEstadosAdmin({goListUsuarios:true})
    }


  return (
   
        <main className='pageAdmin'>
           <div className="panel">
             <button onClick={handleAddProduct} className="agregarProducto">Agregar Producto</button>
             <button onClick={handleListProducts}className="ListarProductos">Listar Productos</button>
             {/*Cambiamos el nombre del boton de Listar Categorias a Panel de Categorias, tambien agregamos la ruta */}
             <Link to="panelCategorias" className='actualizarProducto' style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}> Panel de Categorias</Link>
              {/*Agregamos el boton paraa ir al panel de caracteristicas */}
             <Link to="panelCaracteristicas" className='actualizarProducto' style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}> Panel de Caracteristicas</Link>
             <button onClick={hanDleListUsuarios}className="ListarUsuarios">Listar Usuarios</button>
            </div>
            <div className='vacio'></div>
            {estadosAdmin.goAddProduct &&
                <FoormAddProduct/>
            }
            {estadosAdmin.goList && 
            <ListarProductAdmin/>
            }
            {estadosAdmin.goListUsuarios &&
            <ListarUsuarios/>
            }
            
        </main>
       

  )
}

export default PageAdmin