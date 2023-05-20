import "./Legends.scss";

const Legends = ({data}) => {
    return (
        <div className="legend-coontainer">
                {data.map((item,id)=>(
                    <p key={id}>
                        <span className="legend-color" style={{backgroundColor:item.fill}}></span>
                        {item.name}
                    </p>
                ))}
        </div>
    )
}

export default Legends
