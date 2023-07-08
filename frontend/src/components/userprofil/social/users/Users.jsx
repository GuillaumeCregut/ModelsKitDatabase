import { useState,useEffect } from 'react';
import AllUsers from './allusers/AllUsers';
import FriendCard from './friendcard/FriendCard';

import './Users.scss';
import FriendDemandContainer from './frienddemand/FriendDemandContainer';
import FriendsContainer from './friendscontainer/FriendsContainer';

const Users = () => {
    const [reload, setReload] = useState(false);
    console.log('toto')
    return (
        <div className="social-page">
            <div className='social-container'>
                <div className="new-social social-block  container-boxes">
                   <FriendDemandContainer setReload={setReload} />
                </div>
                <div className="list social-block container-boxes">
                    <div className="list-users-container social-block">
                        <AllUsers reload={reload}/>
                    </div>
                </div>

                <div className="my-friends container-boxes">
                    <FriendsContainer setReload={setReload}/>
                </div>
            </div>
        </div>
    )
}

export default Users
