import react from 'react';
import * as d3 from "d3";

export default function BarChart(){
const chartWidth = 700;
const chartHeight = 500;
const margin ={left:90, right:20, top:20, bottom:10}

const data = [
  { count: 6, name: "Hantavirus" },
  { count: 7, name: "Tularemia" },
  { count: 7, name: "Dengue" },
  { count: 9, name: "Ebola" },
  { count: 11, name: "E. coli" },
  { count: 15, name: "Tuberculosis" },
  { count: 17, name: "Salmonella" },
  { count: 18, name: "Vaccinia" },
  { count: 54, name: "Brucella" },];

const xScale = d3.scaleLinear()
.domain([0, d3.max(data, d=> d.count)])
.range([margin.left, chartWidth-margin.right])

const yScale = d3.scaleBand()
.domain([...data].sort((a,b)=>b.count-a.count).map(d=> d.name))
.range([ margin.top, chartHeight - margin.bottom ])
.padding(0.2)

return(
<div>
<div style={{marginLeft:margin.left, width: chartWidth - margin.right- 80, height:2,  backgroundColor:"red"}} 
/>
<div style={{marginLeft:margin.left, width:40, height:6, backgroundColor:"red", marginTop:0 }}/>
<h3 style={{marginLeft: margin.left, marginBottom:4, fontFamily:"Helvetica,sans-serif" }}>Escape Artists</h3>
<h5 style={{marginLeft: margin.left, marginTop:0 ,fontFamily:"Helvetica,sans-serif", fontWeight:'normal', fontSize:14}}>Number of laboratory-acquired infections, 1970-2021</h5>

<svg width={chartWidth} height = {chartHeight} style={{fontFamily:"Roboto,sans-serif", marginTop:6 }}>

{xScale.ticks(12).map((tick)=>(
<line
key={tick}
x1={xScale(tick)}
x2={xScale(tick)}
y1={margin.top}
y2={chartHeight-margin.bottom}
stroke="#ddd"
/>
))}


{data.map((d)=> (
<rect
key={d.name}
x={xScale(0)}
y={yScale(d.name)}
width={xScale(d.count)-xScale(0)}
height={yScale.bandwidth()}
fill={"#0a75ad"}
/>))}
{data.map((d)=> {
  const barWidth = xScale(d.count) - xScale(0)
  const cabe = barWidth > 90
  return(
  <text
  key={d.name}
  x={cabe ? xScale(0)+8: xScale(d.count)+6}
  y={yScale(d.name)+yScale.bandwidth()/2}
  fontSize={14}
  textAnchor="start"
  dominantBaseline="middle"
  fill={cabe ? "white":"#0a75ad"}
  >
  {d.name}  
  </text>)
})}
{xScale.ticks(13).map((tick)=> (
<g key={tick} transform={`translate(${xScale(tick)},${margin.top})`}>
<line y2={-6} stroke="lightgrey" />
<text y={-12} textAnchor="middle" fontSize={10} fill={"lightgrey"}>{tick}</text>
</g>))}


</svg>
<footer style={{marginLeft:margin.left, fontFamily:"Roboto, sans-serif", fontSize:12, color:"grey"}}>
Sources: Laboratory-Acquired Infection Database; American Biological Safety Association
The Economist
</footer>
</div>
)}