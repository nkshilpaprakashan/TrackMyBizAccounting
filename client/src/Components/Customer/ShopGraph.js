
import React, {useState, useEffect} from 'react'
import { LineChart,PieChart,
  Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';





// const pdata = [
//     {
//       day: '06-06-2023',
     
//       billamount: 1000
//     },
//     {
//       day: '07-06-2023',
     
//       billamount: 1200
//     },
//     {
//       day: '08-06-2023',
     
//       billamount: 1600
//     },
//     {
//       day: '09-06-2023',
     
//       billamount: 1100
//     }
    
//   ];



  function ShopGraph() {



    const[bardata, setbardata]=useState([])
   

    const data1 = async () => {

      const res = await fetch("http://localhost:8000/getdailysalegraphdata", {
           method: "GET",
           headers: {
               "Content-Type": "application/json"
           }
        })
        
        const getbardata = await res.json()

        const totals = getbardata.map(item => Number(item.total.$numberDecimal));
       


        const date = getbardata.map(item =>new Date(item._id).toLocaleDateString());
       

        const combinedData = totals.map((value, index) => {
          return {
            totals: value,
            date: date[index]
          };
        });

        

       
        const dailysales = getbardata[0].total["$numberDecimal"];
        if (res.status === 422 || !getbardata) {
           console.log("bar data error ");
        
        } else {
           console.log(getbardata)
            
            setbardata(combinedData)
           console.log("got bar data");
           
         
        }
        } 


        
        useEffect(() => {
          data1();
         
      }, [])



    return (
      <>
        
  
       
  
  
        <h2 className="chart-heading">Daily Sales</h2>
        <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={bardata}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={40}
        >
          <XAxis
            dataKey="date"
            scale="point"
            padding={{ left: 100, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="totals" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>

        

        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={3}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="totals"
            isAnimationActive={false}
            data={bardata}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        </ResponsiveContainer>
      </>
    );
  }
  
  export default ShopGraph;