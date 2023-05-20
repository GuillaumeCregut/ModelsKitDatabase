import {configureStore} from "@reduxjs/toolkit";
import brandSlice from "../feature/Brand.slice";
import  builderSlice from "../feature/Builder.slice";
import  categorySlice  from "../feature/Category.slice";
import CountrySlice from "../feature/Country.slice";
import modelSlice from "../feature/Model.slice";
import  periodSlice  from "../feature/Period.slice";
import scaleSlice from "../feature/Scale.slice";
import StockUserSlice from "../feature/stockUser.slice";

export default configureStore({
    reducer :{
        countries : CountrySlice,
        periods : periodSlice,
        brands: brandSlice,
        categories: categorySlice,
        scales:scaleSlice,
        builders:builderSlice,
        models:modelSlice,
        stockUsers: StockUserSlice,
    },
    //devTools :false //to avoid visible store in dev tools
})