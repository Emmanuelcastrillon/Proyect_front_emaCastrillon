import { createContext,useContext,useEffect, useState } from "react";
import { useReducer} from "react";
import axios from "axios";
import reducer from '../../reducer/reducer';

export const initialState={
    producto:{},
    productos:[],
    categorias:[], //Se guarda el listado de categorias
    caracteristicas:[],
    theme:"light",
    favoritos:[],
    isFavorite:false,  // Guarda los favoritos del usuario mientras tenga abierta la sesion
}

export const contextoGlobal=createContext();

const ContextProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,initialState)
    const [updatingProductos, setUpdatingProductos] = useState(false)
    const [updatingCategories, setUpdatingCategories] = useState(false);//Gatu: Estados para poder actualizar el arreglo cada ves que se modifique y hacer que se renderice
    const [updatingCaracteristics, setUpdatingCaracteristics] = useState(false);


    const endPointProducts="https://proyectofinalbackendemmanuel-production.up.railway.app/products/list-products";
    const endPointCategias="https://proyectofinalbackendemmanuel-production.up.railway.app/categorias/listar-categorias";
    const endPointCaracteristicas = "https://proyectofinalbackendemmanuel-production.up.railway.app/characteristics/list-characteristics";

    useEffect(()=>{
        if(!updatingProductos){
            axios(endPointProducts)
            .then(res=> dispatch({type: 'get_productos', payload:res.data},console.log("Respuesta del back de los productos de la app : ",res.data)))
        }
        else{
            setUpdatingProductos(false)
        }
      
    },[updatingProductos])

    const updateProductos = () => {
        setUpdatingProductos(true);
    };

  //Gatu: Logica que actualiza automaticamente el arreglo de categorias y lo renderiza cuando hay algun cambio en el mismo
  useEffect(() => {
    if (!updatingCategories) {
        axios(endPointCategias)
            .then(res => dispatch({type: 'get_categorias', payload: res.data}))
            .catch(error => console.error('Error obteniendo categorías:', error));
    } else {
        setUpdatingCategories(false);
    }
}, [updatingCategories]);

const updateCategories = () => {
    setUpdatingCategories(true);
};


//Gatu: Logica que actualiza automaticamente el arreglo de caracteristicas y lo renderiza cuando hay algun cambio
useEffect(() => {      
    console.log("g")  
    if (!updatingCaracteristics) {
        axios(endPointCaracteristicas)
            .then(res => dispatch({type: 'get_caracteristicas', payload: res.data}))
            .catch(error => console.error('Error obteniendo categorías:', error));
    } else {
        setUpdatingCaracteristics(false);
    }
}, [updatingCaracteristics]);

const updateCaracteristics = () => {
    setUpdatingCaracteristics(true);
};
//-------------------------------------------------------------------------------------------------------------------------
    return(
        <contextoGlobal.Provider value={{
            state,dispatch
          }}>
            {children}
          </contextoGlobal.Provider>
    )
}

export default ContextProvider

export const useContextGlobal=()=> useContext(contextoGlobal)

