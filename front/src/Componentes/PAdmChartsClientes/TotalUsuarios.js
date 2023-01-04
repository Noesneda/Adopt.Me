import React, { PureComponent, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import stl from "../PAdmChartsClientes/TotalUsuarios.module.css"
import { useDispatch, useSelector } from "react-redux";
import getusers from "../../Actions/getusers";

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

export default function TotalUsuarios (){

  const dispatch = useDispatch()
  const allUsersData = useSelector((state) => state.users)
  const allUsers = allUsersData.data

useEffect(() => {
  dispatch(getusers())
}, [dispatch])

console.log("allUsers", allUsers) 

  
return (
  <div className={stl.grafica}>
   <div className={stl.title}>USUARIOS REGISTRADOS EN LA PAGINA</div>
    <ResponsiveContainer width="70%" aspect={3}>
     <BarChart
      width={70}
      height={400}
      data={allUsers}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis type= "category" dataKey="usuario" />
      <YAxis type= "number" dataKey="usuario.length"/> 
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar  dataKey="usuario.length" fill="#8884d8" background={{ fill: '#eee' }} />
    </BarChart>
  </ResponsiveContainer>
  </div>
    );
  
}