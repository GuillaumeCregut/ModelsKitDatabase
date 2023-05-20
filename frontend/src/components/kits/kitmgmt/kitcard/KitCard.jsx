
import './KitCard.scss';

const KitCard = ({kitDetails,displayImage=false}) => {
    const url = `${import.meta.env.VITE_APP_URL}`;

    return (
        <div className='kit-card'>
            <h4>{kitDetails.modelName} - {kitDetails.builderName}</h4>
            {displayImage&&<img src={`${url}${kitDetails.boxPicture}`} alt={kitDetails.modelName}/>}
            <p>{kitDetails.brandName} - {kitDetails.scaleName} </p>
            <p>Référence : {kitDetails.reference} </p>
        </div>
    )
}

export default KitCard
