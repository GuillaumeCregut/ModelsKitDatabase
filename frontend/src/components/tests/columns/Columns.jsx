import {useState,useCallback,useReducer} from 'react'
import { models,models2 } from './data';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import {produce} from "immer";

import './Columns.scss';

const dragReducer=produce((draft,action)=>{
    switch (action.type){
        case 'MOVE':{
            console.log(`Moving '${action.itemId}' from ${action.from} to ${action.to}`)
            draft[action.from] = draft[action.from]||[];
            draft[action.to] = draft[action.to]||[];
            const [removed]=draft[action.from].splice(action.fromIndex,1);
            draft[action.to].splice(action.toIndex,0,removed);
        }
    }
    // return state;
});

const Columns = () => {
    const [modelsList,setModelsList]=useState(models);


    const [state,dispatch]=useReducer(dragReducer,{
        items:models,
        items2:models2,
    })
  
       

    const handleDragEnd=useCallback ((result)=>{
        // if (!result.destination) return;
        // const items=Array.from(modelsList);
        // const [reorderItem]=items.splice(result.source.index,1);
        // items.splice(result.destination.index,0,reorderItem);
        // setModelsList(items);
        if(result.reason==='DROP'){
            if(!result.destination){
                return
            }
            console.log(result)
            dispatch({
                type: 'MOVE',
                from:result.source.droppableId,
                to:result.destination.droppableId,
                fromIndex:result.source.index,
                toIndex: result.destination.index,
                itemId:result.draggableId,
            })
        }
        
    },[]);

    return (
        <div className='page'>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId='items' type="PERSON">
                    {(provided,snapshot)=>{
                        return (
                            //Should use snapshot.isDraggingOver form sytle in dynamic
                            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                    {/* INNER INFOS FOR THIS DOCK */}
                                    {state.items?.map((model,index)=>{
                                        return(
                                            <Draggable key={model.id} draggableId={model.id.toString()} index={index}>
                                                {(provided,snapshot)=>{ //snapshot should be use for style
                                                    return(
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}  className={snapshot.isDragging?'line moving':'line'}>
                                                            {model.id} - {model.name}
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )
                                    })}
                                    {/* END INNER INFO */}
                                {provided.placeholder}
                            </ul>
                        )
                    }}
                </Droppable>
                {/* SECOND DROPPABLE ZONE */}
                <Droppable droppableId='items2' type="PERSON">
                    {(provided,snapshot)=>{
                        return (
                            //Should use snapshot.isDraggingOver form sytle in dynamic
                            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                    {/* INNER INFOS FOR THIS DOCK */}
                                    {state.items2?.map((model,index)=>{
                                        return(
                                            <Draggable key={model.id} draggableId={model.id.toString()} index={index}>
                                                {(provided,snapshot)=>{ //snapshot should be use for style
                                                    return(
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}  className='line'>
                                                            {model.id} - {model.name}
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )
                                    })}
                                    {/* END INNER INFO */}
                                {provided.placeholder}
                            </ul>
                        )
                    }}
                </Droppable>
                {/* END SECOND DROPPABLE ZONE */}
            </DragDropContext>

            {/* <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId='ordered'>
                    {(provided) => (
                        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {modelsList.map((model,index) => {
                                return(
                                    <Draggable key={model.id} draggableId={model.id.toString()} index={index}>
                                        {(provided)=>(
                                            <li className='line' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                {model.id} - {model.name}
                                            </li>
                                        )}
                                   </Draggable>
                                )
                            }
                            )}
                            {provided.placeholder}    
                        </ul>)}
                </Droppable>
                test ---
                <Droppable droppableId='instock'>
                <ul>

                </ul>
                </Droppable>
            </DragDropContext> */}
        </div >
    )
}

export default Columns
