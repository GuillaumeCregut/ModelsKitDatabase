import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import ranks from '../../../feature/ranks';
import useAuth from '../../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';

const SimpleArray = ({ item, wrapper }) => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const { deleteAction, updateAction, kind, url } = wrapper;
    const { auth } = useAuth();
    let rankUser = auth?.rank;
    if (!rankUser)
        rankUser = 0;
    let oldName = '';

    const columns = [
        {
            field: 'name',
            headerName: 'Nom',
            width: 130,
            editable: rankUser === ranks.admin,
        },
        {
            field: 'id',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => {
                return (rankUser === ranks.admin ? <button onClick={() => handleDelete(params.value)}>Supprimer </button> : null);
            },
        },
    ]

    const handleDelete = (id) => {
        if (window.confirm('Voulez vous supprimer ?')) {
            const urlApi = `${url}/${id}`;
            axiosPrivate
                .delete(urlApi)
                .then(() => {
                    dispatch(deleteAction(id))
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        toast.warn("L'élément n'existe pas")
                    }
                    if (err.response.status < 404) {
                        toast.warn("Vous n'êtes pas autoriser à supprimer")
                    }
                    if (err.response.status === 500) {
                        toast.error("Une erreur serveur est survenue")
                    }
                })
        }
    }

    const updateData = async (newRow, old) => {
        const newItem = { name: newRow.name };
        const urlApi = `${url}/${newRow.id}`;
        return axiosPrivate
            .put(urlApi, newItem)
            .then(() => {
                dispatch(updateAction([newItem, newRow.id]))
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

    const handleStartEdit = useCallback((params) => {
        oldName = params.value;
    });

    const handleProcess = useCallback(
        async (newRow) => {
            const updatedRow = { ...newRow, isNew: false };
            if (window.confirm(`Voulez vous modifier ${newRow.id} avec ${newRow.name}?`)) {
                return await updateData(updatedRow, oldName);
            }
            else {
                updatedRow.name = oldName;
                return updatedRow;
            }
        }, []);

    const handleProcessRowUpdateError = useCallback((error) => {
        console.log(error.message);
    }, []);

    return (
        <>
            <ToastContainer />
            <DataGrid
                //  onCellDoubleClick={handleEvent}
                isRowSelectable={() => false}
                onCellEditStart={handleStartEdit}
                processRowUpdate={handleProcess}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                rows={item}
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

export default SimpleArray
