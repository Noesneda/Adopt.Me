import React from "react";
import stl from "./NavPanel.module.css";
import logo from "../PanelAdministrador/logoProvisorio.png";
import {Link} from "react-router-dom";

const NavBarPAdmin = () => {

    return(
    <div className={stl.NavBarPAdmin}>

    <div className={stl.menuCollapsed}>
       <div >
          <div ><span>PANEL DE ADMINISTRADOR</span></div>
          <div >
              <div className={stl.btnHamburger}></div>
              <div className={stl.btnHamburger}></div>
              <div className={stl.btnHamburger}></div>
          </div>
       </div>
       <div >
          <div className={stl.logo2}></div>
          <div ><span>ADOPT.ME</span></div>
       </div>
       <div>
          <div className={stl.items}>
           
            <div>
            <Link to="/panel-Administrador/usuarios">
                <button className={stl.botonesAdmin} >USUARIOS</button>
            </Link>
            </div>
            
            <div>
            <Link to="/panel-Administrador/mascotas">
                <button className={stl.botonesAdmin}>MASCOTAS</button>
            </Link>
            </div>
            
            <div>
            <Link to="/panel-Administrador/donaciones">
                <button className={stl.botonesAdmin} >DONACIONES</button>
            </Link>
            </div> 
            
            
            
            <div>
            <Link to="/homepage">
                <button className={stl.botonesAdmin} >SALIR</button>
            </Link>
            </div>

          </div>
       </div>
       
    </div>
    </div>
)    
}

export default  NavBarPAdmin;