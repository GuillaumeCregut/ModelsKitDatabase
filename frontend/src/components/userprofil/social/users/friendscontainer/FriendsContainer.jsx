import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import FriendCard from '../friendcard/FriendCard';
import { AwaitLoad } from '../../../../awaitload/AwaitLoad';

import './FriendsContainer.scss';
import { toast } from 'react-toastify';

const FriendsContainer = ({ setReload, reload }) => {
    const [friendList, setFriendlist] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getFriends = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}friends`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setFriendlist(resp.data);
                    setLoaded(true);
                })
                .catch((err) => {
                    toast.error("Une erreur est survenue");
                })
        }
        getFriends();
    }, [reload])


    return (
        <div>
            <h3>Liste de mes amis</h3>
            <div className='my-friends-container'>
                {
                    loaded
                        ? (
                            friendList.map((friend) => (
                                <FriendCard user={friend} key={friend.id} setReload={setReload} />
                            ))
                        )
                        : <AwaitLoad />
                }
            </div>
        </div>
    )
}

export default FriendsContainer
