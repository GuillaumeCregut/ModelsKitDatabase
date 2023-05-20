import { useState } from 'react';
import './SimpleCardContainer.scss';
import ReactCardFlip from 'react-card-flip';

export const SimpleCardContainer = ({item, kind}) => {
  const [displayBack,setDisplayBack]=useState(false)

  const turnCard=()=>{
    setDisplayBack(!displayBack);
  }
  
  return (
   <div  onClick={turnCard} className="container-Card">
   <ReactCardFlip isFlipped={displayBack} flipDirection="horizontal" containerClassName="card-settings">
           <div className='flip-card-front'>
                 {item.name}
            </div>
            <div className='flip-card-back'>
                {kind}
            </div>

    </ReactCardFlip>
    </div>
  )
}