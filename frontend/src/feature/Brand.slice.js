import {createSlice} from "@reduxjs/toolkit";

export const brandSlice=createSlice({
    name:"brands",
    initialState:{
        brand:null
    },
    reducers:{
        setBrand:(state,{payload})=>{
            state.brand=payload;
        },
        addBrand:(state,{payload})=>{
            state.brand.push(payload);
        },
        updateBrand:(state,{payload})=>{
            state.brand=state.brand.map((item)=>{
                if(item.id===payload[1]){
                    const name=payload[0].name;
                    return {...item,name}
                }else
                    return item;
            })
        },
        deleteBrand:(state,{payload})=>{
            state.brand=state.brand.filter((item)=>item.id!==payload);
        }
    }
})

export const{setBrand,addBrand,updateBrand,deleteBrand}=brandSlice.actions;
export default brandSlice.reducer;