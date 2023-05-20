import { AiFillMinusCircle, AiFillPlusSquare } from "react-icons/ai";

import './ModelLine.scss';

const ModelLine = ({ model, setNewQtty }) => {

    const id = model.idModel;

    const handleClick = (count) => {
        setNewQtty(id,parseInt(model.qtty)+count)
    }

    return (
        <tr className="line-model-order">
            <td className="cell-model-order">{model.builder} {model.name}</td>
            <td className="cell-model-order">{model.brand}</td>
            <td className="cell-model-order">{model.scale}</td>
            <td className="cell-model-order">
                <AiFillMinusCircle className="line-icon remove-qtty" onClick={()=>handleClick(-1)}/>
                {model.qtty}
                <AiFillPlusSquare className="line-icon add-qtty" onClick={()=>handleClick(1)}/>
            </td>
            <td className="cell-model-order">{model.price} </td>
        </tr>
    )
}

export default ModelLine
