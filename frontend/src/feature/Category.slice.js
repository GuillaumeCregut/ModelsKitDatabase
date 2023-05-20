import {createSlice} from "@reduxjs/toolkit";

export const categorySlice=createSlice({
    name:"categories",
    initialState:{
        category:null
    },
    reducers:{
        setCategory:(state,{payload})=>{
            state.category=payload;
        },
        addCategory:(state,{payload})=>{
            state.category.push(payload);
        },
        updateCategory:(state,{payload})=>{
            state.category=state.category.map((item)=>{
                if(item.id===payload[1]){
                    const name=payload[0].name;
                    return {...item,name}
                }else
                    return item;
            })
        },
        deleteCategory:(state,{payload})=>{
            state.category=state.category.filter((item)=>item.id!==payload);
        }
    }
})

export const{setCategory,addCategory,updateCategory,deleteCategory}=categorySlice.actions;
export default categorySlice.reducer;