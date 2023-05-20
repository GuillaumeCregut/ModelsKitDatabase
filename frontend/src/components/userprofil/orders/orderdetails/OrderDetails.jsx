
import './OrderDetails.scss';

const OrderDetails = ({details}) => {
    return (
        <div className='inner-popup'>
            <p>Fournisseur : {details.providerName}</p>
            <p>Référence : {details.reference}</p>
            <p>Détails</p>
            <ul>
                {details.models.map((model)=>(
                    <li key={model.id}>{model.name} -Quantité : {model.qtty} - Prix unitaire : {model.price} euros</li>
                ))}
            </ul>
            
        </div>
    )
}

export default OrderDetails