import {createSlice} from "@reduxjs/toolkit";

export const countrySlice=createSlice({
    name:"countries",
    initialState:{
        country:null
    },
    reducers:{
        setCountry:(state,{payload})=>{
            state.country=payload;
        },
        addCountry:(state,{payload})=>{
            state.country.push(payload);
        },
        updateCountry:(state,{payload})=>{
            state.country=state.country.map((item)=>{
                if(item.id===payload[1]){
                    const name=payload[0].name;
                    return {...item,name}
                }else
                    return item;
            })
        },
        deleteCountry:(state,{payload})=>{
            state.country=state.country.filter((item)=>item.id!==payload);
        }
    }
})

export const{setCountry,addCountry,updateCountry,deleteCountry}=countrySlice.actions;
export default countrySlice.reducer;