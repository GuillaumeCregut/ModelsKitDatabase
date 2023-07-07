import Avatar from '@mui/material/Avatar';


import './AvatarUser.scss';

const AvatarUser = ({ user }) => {
    const urlAvatar=`${import.meta.env.VITE_APP_URL}assets/uploads/users/${user.id}/`;
    function stringToColor(string) {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    function stringAvatar() {
        const name=`${user.firstname} ${user.lastname}`;
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <>
            {!user.avatar
                ? (<Avatar {...stringAvatar()} className='avatar-users-social' />)
                : (<Avatar alt={`${user.firstname} ${user.lastname}`} src={`${urlAvatar}${user.avatar}`} className='avatar-users-social' />)}
        </>
    )
}

export default AvatarUser
