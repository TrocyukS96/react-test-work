import React, {FC} from "react";
import {useDispatch} from "react-redux";
import {deleteProductsThunk} from "../../../../m2-bll/reducers/userReducer";
import s from "../../../users/Users.module.scss";
import Modal from "../../../../../n2-features/modal/Modal";
import {useFormik} from "formik";

type ProductCardPropsType ={
    productName:string
    productId:string
    userId:string
}
export const ProductCard:FC<ProductCardPropsType>=({productName,productId,userId})=>{
    //hooks
    const dispatch = useDispatch()

    const deleteProductHandler = ()=>{
        dispatch(deleteProductsThunk(userId,productId))
    }



    return (
        <div>
            <div>Product: {productName} <button onClick={deleteProductHandler}>X</button></div>

        </div>
    )
}