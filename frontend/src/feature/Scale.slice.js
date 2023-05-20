import {createSlice} from "@reduxjs/toolkit";

export const scaleSlice=createSlice({
    name:"scales",
    initialState:{
        scale:null
    },
    reducers:{
        setScale:(state,{payload})=>{
            state.scale=payload;
        },
        addScale:(state,{payload})=>{
            state.scale.push(payload);
        },
        updateScale:(state,{payload})=>{
            state.scale=state.scale.map((item)=>{
                if(item.id===payload[1]){
                    const name=payload[0].name;
                    return {...item,name}
                }else
                    return item;
            })
        },
        deleteScale:(state,{payload})=>{
            state.scale=state.scale.filter((item)=>item.id!==payload);
        }
    }
})

export const{setScale,addScale,updateScale,deleteScale}=scaleSlice.actions;
export default scaleSlice.reducer;