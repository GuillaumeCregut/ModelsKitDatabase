import {createSlice} from "@reduxjs/toolkit";

export const builderSlice=createSlice({
    name:"builders",
    initialState:{
       builder:null
    },
    reducers:{
        setBuilder:(state,{payload})=>{
            state.builder=payload;
        },
        addBuilder:(state,{payload})=>{
            state.builder.push(payload);
        },
        updateBuilder:(state,{payload})=>{
            //To modify
            state.builder=state.builder.map((item)=>{
                if(item.id===payload[1]){
                    const name=payload[0].name;
                    const country=payload[0].country;
                    const countryName=payload[0].countryName;
                    return {...item,name,country, countryName}
                }else
                    return item;
            })
        },
        deleteBuilder:(state,{payload})=>{
            state.builder=state.builder.filter((item)=>item.id!==payload);
        }
    }
})

export const{setBuilder,addBuilder,updateBuilder,deleteBuilder}=builderSlice.actions;
export default builderSlice.reducer;