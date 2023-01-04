import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../NavBar/NavBar";
import Perfil from "../Perfil/perfil";
import Footer from "../Footer/Footer";
import stl from "../Login/Login.module.css";

export default function Prueba() {
    const { loginWithRedirect } = useAuth0()
    const { logout } = useAuth0()
    const {isAuthenticated} = useAuth0()

    window.onbeforeunload = function () {
      window.scrollTo(0,0);
  };
      

  return (
      <div className={stl.fondo}>
          <NavBar/>
          
            <div className={stl.imagenLogIn}></div>
          {!isAuthenticated && (
              <button className={stl.botonLogin} onClick={() => loginWithRedirect()}>LOGIN</button>
          )}

        {isAuthenticated && (
              <button onClick={() => logout()}>LOGOUT</button>
          )}
          

          {isAuthenticated && (
              <Perfil/>
              
          )}


         
         
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          

          

          
          <Footer />
            
      </div>
  );
}
