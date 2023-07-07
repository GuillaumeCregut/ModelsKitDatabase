import React from 'react'
import './FriendDemandContainer.scss';
import FriendDemand from './FriendDemand';
const FriendDemandContainer = ({setReload}) => {
    return (
        <div className='friend-demand-container'>
            <h3 className='demand-title'>Demandes d'amis reçues</h3>
            <div className="friend-demand-card-container">
                <FriendDemand setReload={setReload}/>
                <FriendDemand setReload={setReload}/>
                <FriendDemand setReload={setReload}/>
                <FriendDemand setReload={setReload}/>
                <FriendDemand setReload={setReload}/>
                <FriendDemand setReload={setReload}/>
                <FriendDemand setReload={setReload}/>
            </div>
        </div>
    )
}

export default FriendDemandContainer
