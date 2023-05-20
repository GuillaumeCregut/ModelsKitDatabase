import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState,useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";



const Users = () => {
    const [users,setUsers]=useState();
    const refresh=useRefreshToken();
    const axiosPrivate=useAxiosPrivate();

    useEffect(()=>{
        let isMounted=true;
        
        const controller=new AbortController();
        const url = `${import.meta.env.VITE_APP_API_URL}users/`;
        const getUsers=async()=>{
            axiosPrivate.get(url,{signal:controller.signal})
                .then((res)=>{
                    console.log(res.data)
                    isMounted&&setUsers(res.data)
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
        getUsers();
        return ()=>{
            isMounted=false;
            controller.abort();
        }
    },[])
    return (
        <article>
            <h2>User list</h2>
            {
                users?.length
                ?(
                    <ul>
                        {users.map((user,i)=><li key={i}>{user.firstname}</li>)}
                    </ul>
                ) :<p>No  users</p>
            }
            <button onClick={()=>refresh()}>Refresh</button>
        </article>
    )
}

export default Users
