import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setScale } from '../../../feature/Scale.slice';

import './ScaleSelector.scss';

const ScaleSelector = ({ id, selectedScale, setSelectedScale }) => {
    const [scaleLoaded, setScaleLoaded] = useState(false);
    const dispatch = useDispatch();
    const scaleData = useSelector((state) => state.scales.scale);

    useEffect(() => {
        const getScales = async () => {
            const url = `${import.meta.env.VITE_APP_API_URL}scale`;
            axios
                .get(url)
                .then((resp) => {
                    dispatch(setScale(resp.data));
                    setScaleLoaded(true);
                })
        }
        if (!scaleData)
            getScales();
        else
            setScaleLoaded(true);
    }, []);

    return (
        <select
            id={id}
            value={selectedScale}
            onChange={(e) => setSelectedScale(e.target.value)}
            className='scale-selector'
        >
            <option value="0">--</option>
            {scaleLoaded
                ? scaleData.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.name}</option>
                ))
                : null
            }
        </select>
    )
}

export default ScaleSelector
