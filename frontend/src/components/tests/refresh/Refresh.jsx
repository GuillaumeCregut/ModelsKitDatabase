import React from 'react'
import useRefreshToken from '../../../hooks/useRefreshToken'

const Refresh = (props) => {
    const refresh=useRefreshToken();
    return (
        <div>
            <button onClick={()=>refresh()}> Clic</button>
        </div>
    )
}

export default Refresh
