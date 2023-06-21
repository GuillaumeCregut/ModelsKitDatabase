import { useState, useEffect, useCallback } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import ranks from '../../../feature/ranks';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry } from '../../../feature/Country.slice';
import { deleteBuilder, updateBuilder } from '../../../feature/Builder.slice';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaTrash } from "react-icons/fa";

const BuilderTable = ({ builder }) => {
    const [countryLoaded, setCountryLoaded] = useState(false);
    const countryData = useSelector((state) => state.countries.country);
    const axiosPrivate = useAxiosPrivate();
    const apiRef = useGridApiRef();
    const { auth } = useAuth();
    let rankUser = auth?.rank;
    if (!rankUser)
        rankUser = 0;
    const dispatch = useDispatch();

    useEffect(() => {
        const getCountries = () => {
            const urlCountry = `${import.meta.env.VITE_APP_API_URL}country`;
            axiosPrivate.get(urlCountry)
                .then((res) => {
                    dispatch(setCountry(res.data))
                    setCountryLoaded(true);
                });
        }
        if (!countryData) {
            getCountries();
        }
        else
            setCountryLoaded(true);
    }, [])

    const updateData = async (newRow, countryId, countryName,old) => {
        const newItem = { name: newRow.name, country: countryId };
        const urlApi = `${import.meta.env.VITE_APP_API_URL}builder/${newRow.id}`;
        return axiosPrivate
            .put(urlApi, newItem)
            .then(() => {
                dispatch(updateBuilder([{name:newRow.name,countryId,countryName}, newRow.id]))
                return ({ ...newRow, isNew: false })
            })
            .catch((err) => {
                switch (err?.response?.status) {
                    case 401: toast.error("Vous n'êtes pas autoriser à modifier");
                        break;
                    case 403: toast.error("Vous n'êtes pas autoriser à modifier");
                        break;
                    case 404: toast.warn("L'élément n'existe pas");
                        break;
                    case 422: toast.warn("Veuillez vérifier les valeurs");
                        break;
                    case 500: toast.error("Une erreur serveur est survenue.");
                        break;
                    default: toast.error(`action impossible : ${err?.response?.status}`);
                }
                newRow.name = old;
                return { ...newRow, isNew: false };
            })
    }

    const handleProcess = useCallback(
        async (newRow) => {
            const id = newRow.id;
            const BuilderCountry = apiRef.current.getCellValue(id, 'countryId');
            const countryName=apiRef.current.getRow(id).countryName;
            //countryName
            const oldName = apiRef.current.getCellValue(id, 'name');
            const updatedRow = { ...newRow, isNew: false };
            if (window.confirm(`Voulez vous modifier ${newRow.id} avec ${newRow.name}?`)) {
                return await updateData(updatedRow, BuilderCountry,countryName,oldName);
            }
            else {
                updatedRow.name = oldName;
                return updatedRow;
            }
        }, []);

    const handleProcessRowUpdateError = useCallback((error) => {
       
    }, []);

    const handleDelete = (rowData) => {
        if (!window.confirm(`Voulez-vous supprimer ${rowData.row.name} ?`))
            return -1
        const url = `${import.meta.env.VITE_APP_API_URL}builder/${rowData.id}`;
        axiosPrivate
            .delete(url)
            .then((resp) => {
                dispatch(deleteBuilder(rowData.id));
            })
            .catch((err) => {
                toast.error("Vous n'êtes pas autorisé à ajouter un élément.");
            })
    }

    const updateCountry = (paramsRow, newValue) => {
        const newItem = {
            name: paramsRow.name,
            country: newValue
        }
        const urlApi = `${import.meta.env.VITE_APP_API_URL}builder/${paramsRow.id}`;
        axiosPrivate
            .put(urlApi, newItem)
            .then((res) => {
                dispatch(updateBuilder([{name:paramsRow.name,countryId:parseInt(newValue,10),countryName:res.data.name},paramsRow.id]))
            })
            .catch((err) => {
                switch (err?.response?.status) {
                    case 401: toast.error("Vous n'êtes pas autoriser à modifier");
                        break;
                    case 403: toast.error("Vous n'êtes pas autoriser à modifier");
                        break;
                    case 404: toast.warn("L'élément n'existe pas");
                        break;
                    case 422: toast.warn("Veuillez vérifier les valeurs");
                        break;
                    case 500: toast.error("Une erreur serveur est survenue.");
                        break;
                    default: toast.error(`action impossible : ${err?.response?.status}`);
                }
            })
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
            width: 150,
            renderCell: (params) => {
                if (rankUser === ranks.admin)
                    return (<Select
                        id="country-select"
                        defaultValue={params.value}
                        onChange={(e) => updateCountry(params.row, e.target.value)}
                         className='builder-add-select'
                    >
                        {countryLoaded
                            ? countryData.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id} >{item.name}</MenuItem>
                            ))
                            : null
                        }
                    </Select>)
                return params.row.countryName;
            },
        },
        {
            field: 'id',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => {
                return (rankUser === ranks.admin ? <IconButton onClick={() => handleDelete(params)}><FaTrash className='builder-delete'/> </IconButton> : null);
            },
        },
    ]


    return (
        <>
            <ToastContainer />
            <DataGrid
                isRowSelectable={() => false}
                processRowUpdate={handleProcess}
                onProcessRowUpdateError={handleProcessRowUpdateError}
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
        </>
    )
}

export default BuilderTable
