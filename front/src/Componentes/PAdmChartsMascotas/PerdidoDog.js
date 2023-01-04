import React, { PureComponent, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import stl from "../PAdmChartsMascotas/PerdidoDog.module.css"
import { useSelector, useDispatch } from "react-redux";
import getPerrosPerdidos from "../../Actions/getPerrosPerdidos";
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

export default function PerdidoDog (){
  
  const dispatch = useDispatch()
  const perdidosDog = useSelector((state) => state.perrosPerdidos)
  
useEffect(() => {
  dispatch(getPerrosPerdidos())
}, [dispatch])
  

console.log("perdidosDog", perdidosDog)

return (
  <div className={stl.grafica}>
   <div className={stl.title}>ESTADO PERROS</div>
    <ResponsiveContainer width="70%" aspect={3}>
     <BarChart
      width={70}
      height={400}
      data={perdidosDog}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}//scale="point" padding={{ left: 10, right: 10 }}
      barSize={20}
    >
      <XAxis type= "category" dataKey="estado" allowDuplicatedCategory={false}/>
      <YAxis type= "number" dataKey="estado.length"/>
      {/* <Tooltip />
      <Legend /> */}
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="estado.length" fill="#8884d8" background={{ fill: '#eee' }}  />
      
    </BarChart>
  </ResponsiveContainer>
  </div>
);
  
}