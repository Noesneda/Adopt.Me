import React from "react";
import { Link } from "react-router-dom";
import stl from "../LandingPage/LandingPage.module.css";
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';



export default function LandingPage() {

   window.onbeforeunload = function () {
      window.scrollTo(0,0);
  };
      
   
      return (
      <div className={stl.landingPage}> 
 
         <div className={stl.titulo}>
            
            <div className={stl.h1}>
               <div className={stl.span}>A</div >
               <div className={stl.span}>D</div >
               <div className={stl.span}>O</div >
               <div className={stl.span}>P</div >
               <div className={stl.span}>T</div >
               <div className={stl.span}>.</div>
               <div className={stl.span}>M</div>
               <div className={stl.span}>E</div>
            </div>
         </div> 
         <div className={stl.logo}></div>
       
       <Link to = '/homepage'> 
            <button className={stl.button}>Entrar</button>
         </Link>
       
         <div className={stl.icons}>
          <p className={stl.fineslucro}>@Adopt.Me Es una pagina sin fines de lucro</p>
          
          <a href="https://www.facebook.com/profile.php?id=100088704424730" target="_blank" rel="noreferrer" className={stl.facebook}></a>

          <a href="https://www.instagram.com/adopt.me.adopcion.mascotas/" target="_blank" rel="noreferrer" className={stl.instagram}></a>

        </div>

      </div>
       
   )   
}