import React, { PureComponent, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import stl from "../PAdmChartsMascotas/Buscados.module.css"
import { useSelector, useDispatch } from "react-redux";

const data = [
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
  
];

export default function Buscados (){
  

  
return (
  <div className={stl.grafica}>
   <div className={stl.title}>MASCOTAS BUSCADAS</div>
    <ResponsiveContainer width="70%" aspect={3}>
     <BarChart
      width={70}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="_id" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis dataKey="_id.length"/>
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
    </BarChart>
  </ResponsiveContainer>
  </div>
    );
  
}