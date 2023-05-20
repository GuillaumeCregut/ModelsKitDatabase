import {createSlice} from "@reduxjs/toolkit";

export const periodSlice=createSlice({
    name:"periods",
    initialState:{
        period:null
    },
    reducers:{
        setPeriod:(state,{payload})=>{
            state.period=payload;
        },
        addPeriod:(state,{payload})=>{
            state.period.push(payload);
        },
        updatePeriod:(state,{payload})=>{
            state.period=state.period.map((item)=>{
                if(item.id===payload[1]){
                    const name=payload[0].name;
                    return {...item,name}
                }else
                    return item;
            })
        },
        deletePeriod:(state,{payload})=>{
            state.period=state.period.filter((item)=>item.id!==payload);
        }
    }
})

export const{setPeriod,addPeriod,updatePeriod,deletePeriod}=periodSlice.actions;
export default periodSlice.reducer;