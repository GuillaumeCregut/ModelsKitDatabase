import FriendCard from '../friendcard/FriendCard';

import './FriendsContainer.scss';

const FriendsContainer = ({setReload}) => {
    return (
        <div className='my-friends-container'>
             <FriendCard user='' setReload={setReload} />
             <FriendCard user='' setReload={setReload} />
             <FriendCard user='' setReload={setReload} />
             <FriendCard user='' setReload={setReload} />
             <FriendCard user='' setReload={setReload} />
             <FriendCard user='' setReload={setReload} />
             <FriendCard user='' setReload={setReload} />
             <FriendCard user='' setReload={setReload} />
        </div>
    )
}

export default FriendsContainer
