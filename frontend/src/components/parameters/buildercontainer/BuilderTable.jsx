import { useState,useEffect } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import ranks from '../../../feature/ranks';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry } from '../../../feature/Country.slice';


const BuilderTable = ({ builder }) => {
    const [countryLoaded,setCountryLoaded]=useState(false);
    const countryData = useSelector((state) => state.countries.country);
    const axiosPrivate = useAxiosPrivate();
    const apiRef = useGridApiRef();
    const { auth } = useAuth();
    let rankUser = auth?.rank;
    if (!rankUser)
        rankUser = 0;
    const dispatch = useDispatch();

    useEffect(()=>{
        const getCountries = () => {
            const urlCountry = `${import.meta.env.VITE_APP_API_URL}country`;
            axiosPrivate.get(urlCountry)
                .then((res) => {
                    dispatch(setCountry(res.data))
                    setCountryLoaded(true);
                });
        }    
        if(!countryData){
            getCountries();
        }
        else
            setCountryLoaded(true);
    },[])


    const handleDelete=(id)=>{
        console.log(id)
    }


    const columns = [
        {
            field: 'name',
            headerName: 'Nom',
            width: 130,
            editable: rankUser === ranks.admin,
        },
        {
            field: 'countryId',
            headerName: 'Pays',
            width: 130,
            renderCell: (params) => {
                if(rankUser === ranks.admin)
                    return (<select 
                        id="country-select" 
                        //ref={selectRef}
                        defaultValue={params.value} 
                         onChange={(e) => alert(`${params.row.id} : ${e.target.value}`)}
                        className='builder-add-select'
                        >
                        {countryLoaded
                            ? countryData.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id} >{item.name}</option>
                            ))
                            : null
                        }
                    </select>)
                return params.row.countryName;
            },
        },
        {
            field: 'id',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => {
                return (rankUser === ranks.admin ? <button onClick={() => handleDelete(params)}>Supprimer </button> : null);
            },
        },
    ]


    return (
        <div>
            <DataGrid
                isRowSelectable={() => false}

                rows={builder}
                apiRef={apiRef}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    )
}

export default BuilderTable
