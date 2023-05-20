import { PieChart, Pie, Tooltip } from 'recharts';

import './ChartPie.scss';
import Legends from '../legends/Legends';

const ChartPie = ({data, title,color}) => {
    const width=300;
    const height=180;
    const dataUpdate=data.map((item)=>{
        if(item.name===null)
        return {...item, name:'autre',fill:'red'}
        //calculate random color
        const randomColor="#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        return {...item,fill:randomColor};
    })
    return (
        <div className='pie-container'>
            <h3 className='pie-title'>{title}</h3>
            <PieChart width={width} height={height}>
                <Pie
                    dataKey="count"
                    data={dataUpdate}
                    cx={width/2}
                    cy={80}
                    innerRadius={50}
                    outerRadius={80}
                    fill={color}
                />
                <Tooltip />
            </PieChart>
            <Legends data={dataUpdate}/>
        </div>
    )
}

export default ChartPie
