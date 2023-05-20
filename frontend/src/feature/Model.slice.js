import {createSlice} from "@reduxjs/toolkit";

export const modelSlice=createSlice({
    name:"models",
    initialState:{
        model:null
    },
    reducers:{
        setModel:(state,{payload})=>{
            state.model=payload;
        },
        addModel:(state,{payload})=>{
            state.model.push(payload);
        },
        updateModel:(state,{payload})=>{
            state.model=state.model.map((item)=>{
                if(item.id===payload[1]){
                   
                    return {...payload[0]}
                }else
                    return item;
            })
        },
        deleteModel:(state,{payload})=>{
            state.model=state.model.filter((item)=>item.id!==payload);
        }
    }
})

export const{setModel,addModel,updateModel,deleteModel}=modelSlice.actions;
export default modelSlice.reducer;