import React, { PureComponent, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import stl from "../PAdmChartsMascotas/EnAdopcion.module.css"
import { useDispatch, useSelector } from "react-redux";
import getmascotas from "../../Actions/getmascotas";

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

export default function EnAdopcion (){

const dispatch = useDispatch()
const allpets = useSelector((state) => state.animales)
  
useEffect(() => {
  dispatch(getmascotas())
}, [dispatch])

console.log("allpets", allpets)


  
return (
  <div className={stl.grafica}>
   <div className={stl.title}>MASCOTAS EN ADOPCION</div>
    <ResponsiveContainer width="70%" aspect={3}>
     <BarChart
      width={70}
      height={400}
      data={allpets}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis type= "category" dataKey="estado" span="none" allowDuplicatedCategory={false}/>
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