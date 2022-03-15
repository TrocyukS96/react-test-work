import {FC} from "react";
import {useDispatch} from "react-redux";
import {deleteProductsThunk} from "../../../../m2-bll/reducers/userReducer";

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
        <div>Product: {productName} <button onClick={deleteProductHandler}>X</button></div>
    )
}