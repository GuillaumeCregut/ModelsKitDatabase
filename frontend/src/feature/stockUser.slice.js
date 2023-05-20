import {createSlice} from "@reduxjs/toolkit";
export const StockUserSlice=createSlice({
    name:"stockUsers",
    initialState:{
        stockUser:null
    },
    reducers:{
        setStock:(state,{payload})=>{
            state.stockUser=payload;
        },
        addStock:(state,{payload})=>{
            state.stockUser.push(payload);
        },
        updateStock:(state,{payload})=>{
            state.stockUser=state.stockUser.map((item)=>{
                if(item.id===payload[1]){
                    const itemState=payload[0];
                    return {...item,state:itemState}
                }else
                    return item;
            })
        },
        deleteStock:(state,{payload})=>{
            state.stockUser=state.stockUser.filter((item)=>item.id!==payload);
        }
    }
});

export const{setStock, addStock,updateStock,deleteStock}=StockUserSlice.actions;
export default StockUserSlice.reducer;