import React, { PureComponent, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import stl from "../PAdmChartsMascotas/GatosEnAdopcion.module.css"
import { useDispatch, useSelector } from "react-redux";
import getgatos from "../../Actions/getgatos";

/* const data = [
  {
    name: 'Perros',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Gatos',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  
]; */

export default function GatosEnAdopcion (){

  const dispatch = useDispatch()
  const allCats = useSelector((state) => state.gatos)
  
useEffect(() => {
  dispatch(getgatos())
}, [dispatch])

console.log("allCats", allCats)

  
return (
  <div className={stl.grafica}>
   <div className={stl.title}>GATOS EN ADOPCION</div>
    <ResponsiveContainer width="70%" aspect={3}>
     <BarChart
      width={70}
      height={400}
      data={allCats}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis type= "category" dataKey="estado" allowDuplicatedCategory={false}/>
      <YAxis type= "number" dataKey="estado.length"/> 
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar  dataKey="estado.length" fill="#8884d8" background={{ fill: '#eee' }} />
    </BarChart>
  </ResponsiveContainer>
  </div>
    );
  
}