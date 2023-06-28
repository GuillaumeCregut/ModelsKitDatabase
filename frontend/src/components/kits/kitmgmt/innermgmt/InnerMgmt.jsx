import { useReducer, useCallback } from 'react';
import { dragReducer } from '../../../../reducers/dragReducer';
import KitCard from '../kitcard/KitCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useAuth from '../../../../hooks/useAuth';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import {updateStock} from '../../../../feature/stockUser.slice';
import { useDispatch } from 'react-redux';
import kitState from '../../../../feature/kitState'
import {  toast } from 'react-toastify';

import './InnerMgmt.scss';

const InnerMgmt = ({ orderedModels, likedModels, workbenchModels, finishedModels, stockModels,displayImage,refresh, setRefresh }) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const dispatcher=useDispatch();
    let userId = auth.id;
    if (!userId)
        userId = 0;
    const [state, dispatch] = useReducer(dragReducer, {
        ordered: orderedModels,
        liked: likedModels,
        workbench: workbenchModels,
        finished: finishedModels,
        stocked: stockModels,
    });
    const sendData = useCallback(async (data) => {
        const url = `${import.meta.env.VITE_APP_API_URL}model/stock/`;
        const result = await axiosPrivate
            .put(url, data)
            .then((resp) => {
                dispatcher(updateStock([data.newState,data.id]));
                return true;
            })
            .catch((err) => {
                if(err?.response?.status===409)
                    toast.error('Le modèle est déjà dans la liste',{
                        toastId: 'success1',
                    });
                else
                    toast.error('Une erreur est survenue',{
                        toastId: 'success1',
                    });
                return false;
            })
        return result
    },[]);

    const handleDragEnd = useCallback(async (result) => {
        if (result.reason === 'DROP') {
            if (!result.destination) {
                return
            }
            const dataToSend = {
                id: parseInt(result.draggableId),
                owner: userId,
                newState: 0
            }
            switch (result.destination.droppableId) {
                case 'liked': dataToSend.newState = kitState.wish;
                    break;
                case 'stocked': dataToSend.newState = kitState.stock;
                    break;
                case 'ordered': dataToSend.newState = kitState.ordered;
                    break;
                case 'workbench': dataToSend.newState = kitState.wip;
                    break;
                case 'finished': dataToSend.newState = kitState.finished;
                    break;
            }
            //Sending to BDD
            const dbResult = await sendData(dataToSend);
            if (!dbResult)
                return
            dispatch({
                type: 'MOVE',
                from: result.source.droppableId,
                to: result.destination.droppableId,
                fromIndex: result.source.index,
                toIndex: result.destination.index,
                itemId: result.draggableId,
            })
        }
    }, []);

    return (
        <div className='inner-management-container'>
            <DragDropContext onDragEnd={handleDragEnd} >
                <div className='drop-container'>
                    <p className='dopzone-title'>Modèles likés</p>
                    <Droppable droppableId='liked' type="PERSON" >
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className={snapshot.isDraggingOver ? 'dropzone dropOK' : 'dropzone'}>
                                    {state.liked.map((item, index) => {
                                        
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index} >
                                                {(provided, snapshot) => { //snapshot should be use for style
                                                    return (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging ? 'line moving' : 'line'}>
                                                            <KitCard kitDetails={item} displayImage={displayImage} inMgmt={true} />
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
                <div className='drop-container'>
                    <p className='dopzone-title'>Modèle commandés</p>
                    <Droppable droppableId='ordered' type="PERSON">
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className={snapshot.isDraggingOver ? 'dropzone dropOK' : 'dropzone'}>
                                    {state.ordered.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided, snapshot) => { //snapshot should be use for style
                                                    return (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging ? 'line moving' : 'line'}>
                                                            <KitCard kitDetails={item}  displayImage={displayImage} inMgmt={true} />
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
                <div className='drop-container'>
                    <p className='dopzone-title'>Modèle en stock</p>
                    <Droppable droppableId='stocked' type="PERSON">
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className={snapshot.isDraggingOver ? 'dropzone dropOK' : 'dropzone'}>
                                    {state.stocked.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided, snapshot) => { //snapshot should be use for style
                                                    return (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging ? 'line moving' : 'line'}>
                                                            <KitCard kitDetails={item}  displayImage={displayImage} inMgmt={true}/>
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
                <div className='drop-container'>
                    <p className='dopzone-title'>Modèle en cours</p>
                    <Droppable droppableId='workbench' type="PERSON">
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className={snapshot.isDraggingOver ? 'dropzone dropOK' : 'dropzone'}>
                                    {state.workbench.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided, snapshot) => { //snapshot should be use for style
                                                    return (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging ? 'line moving' : 'line'}>
                                                            <KitCard kitDetails={item}  displayImage={displayImage} inMgmt={true}/>
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
                <div className='drop-container'>
                    <p className='dopzone-title'>Modèle terminés</p>
                    <Droppable droppableId='finished' type="PERSON">
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className={snapshot.isDraggingOver ? 'dropzone dropOK' : 'dropzone'}>
                                    {state.finished.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided, snapshot) => { //snapshot should be use for style
                                                    return (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging ? 'line moving' : 'line'}>
                                                            <KitCard kitDetails={item}  displayImage={displayImage} inMgmt={true} />
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}

export default InnerMgmt
