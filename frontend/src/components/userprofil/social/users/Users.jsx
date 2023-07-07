import { useState,useEffect } from 'react';
import AllUsers from './allusers/AllUsers';
import FriendCard from './friendcard/FriendCard';

import './Users.scss';

const Users = () => {
    const [reload, setReload] = useState(false);

    return (
        <div className="social-page">
            <div className='social-container'>
                <div className="new-social social-block">Nouvelles demandes</div>
                <div className="list social-block">
                    <div className="list-users-container social-block">
                        <AllUsers reload={reload}/>
                    </div>
                </div>

                <div className="my-friends">
                    <FriendCard user='' setReload={setReload} />
                    <FriendCard user='' setReload={setReload} />
                    <FriendCard user='' setReload={setReload} />
                    <FriendCard user='' setReload={setReload} />
                    <FriendCard user='' setReload={setReload} />
                    <FriendCard user='' setReload={setReload} />
                    <FriendCard user='' setReload={setReload} />
                    <FriendCard user='' setReload={setReload} />
                    <FriendCard user='' setReload={setReload} />
                </div>
            </div>
        </div>
    )
}

export default Users
