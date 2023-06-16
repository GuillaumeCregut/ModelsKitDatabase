import { AiFillMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import './ModelLine.scss';

const ModelLine = ({ model, setNewQtty }) => {

    const id = model.idModel;

    const handleClick = (count) => {
        setNewQtty(id,parseInt(model.qtty)+count)
    }

    return (
        <TableRow className="line-model-order">
            <TableCell className="cell-model-order">{model.builder} {model.name}</TableCell>
            <TableCell className="cell-model-order">{model.brand}</TableCell>
            <TableCell className="cell-model-order">{model.scale}</TableCell>
            <TableCell className="cell-model-order">
                <AiFillMinusCircle className="line-icon remove-qtty" onClick={()=>handleClick(-1)}/>
                {model.qtty}
                <AiFillPlusSquare className="line-icon add-qtty" onClick={()=>handleClick(1)}/>
            </TableCell>
            <TableCell className="cell-model-order">{model.price} euros</TableCell>
        </TableRow>
    )
}

export default ModelLine
