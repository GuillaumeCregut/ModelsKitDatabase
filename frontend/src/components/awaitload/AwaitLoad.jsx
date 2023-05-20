import React from 'react'
import loading from '../../assets/pictures/loading.gif';

import './AwaitLoad.scss';

export const AwaitLoad = () => {
  return (
    <div className='await-loading'>
        <img src={loading} alt="wait for loading" className="await-gif" />
    </div>
  )
}
