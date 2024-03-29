import axios from 'axios';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, setCategory, updateCategory, deleteCategory } from '../../../feature/Category.slice';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import FormAddSimple from '../formaddsimple/FormAddSimple';
import { toast } from 'react-toastify';
import SimpleArray from '../simplecardcontainer/SimpleArray';


const CategoryContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const categoriesData = useSelector((state) => state.categories.category);
    const url = `${import.meta.env.VITE_APP_API_URL}categories`;
    const axiosPrivate = useAxiosPrivate();


    const addAction = (newData) => {
        axiosPrivate
            .post(url, newData)
            .then((resp) => {
                const newCategory = resp.data;
                dispatch(addCategory(newCategory));
            })
            .catch((err) => {
                toast.error("Vous n'êtes pas autorisé à ajouter un élément.");
            })
    }

    const getCategories = () => {
        axios.get(url)
            .then((res) => {
                dispatch(setCategory(res.data))
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        getCategories();
    }, []);


    const wrapper = {
        deleteAction: deleteCategory,
        updateAction: updateCategory,
        kind: "la catégorie",
        url: url
    }


    return (
        <section className="right-page">
            <h2 className='solo-title'>Les catégories</h2>
            <div className='solo-container'>
                {isLoaded ?
                    <SimpleArray item={categoriesData}
                        wrapper={wrapper} />

                    : <AwaitLoad />
                }
            </div>
            <FormAddSimple
                action={addAction}
            />
        </section>
    )
}

export default CategoryContainer