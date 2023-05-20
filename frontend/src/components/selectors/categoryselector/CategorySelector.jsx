import { useEffect, useState } from 'react';
import axios from 'axios';
import { setCategory } from '../../../feature/Category.slice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import './CategorySelector.scss';

const CategorySelector = ({id,selectedCategory,setSelectedCategory}) => {
    const [categoryLoaded,setCategoryLoaded]=useState(false);
    const dispatch=useDispatch();
    const categoryData=useSelector((state) => state.categories.category);

    useEffect(()=>{
        const getCategories=async()=>{
            const url = `${import.meta.env.VITE_APP_API_URL}category`;
            await axios
                .get(url)
                .then((resp)=>{
                    dispatch(setCategory(resp.data));
                    setCategoryLoaded(true);
                })
                .catch((err)=>{
                    toast.error('Une erreur est survenue');
                })
        }
        if(!categoryData){
            getCategories();
        }
        else
            setCategoryLoaded(true);
    },[])

    return (
        <>
         <ToastContainer />
        <select
        id={id}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className='category-selector'
        >
            <option value="0">--</option>
             {categoryLoaded
                ? categoryData.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.name}</option>
                ))
                : null
            }
        </select>
        </>
    )
}

export default CategorySelector
