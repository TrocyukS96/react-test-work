import {ProductCard} from "./productCard/ProductCard";
import s from './Products.module.scss';
import {FC} from "react";
import {ProductType} from "../../../m2-bll/reducers/UsersReducer";

type ProductsPropsType = {
    products:ProductType[]
}

export const Products:FC<ProductsPropsType> =({products})=>{
    return (
        <div className={s.products}>
            <h4>Products</h4>
            <div className={s.inner}>
                {
                    products.map((n,i)=>{
                        return (
                            <ProductCard key={i} productName={n.name} productId={n.id} userId={n.userId}/>
                        )
                    })
                }
            </div>

        </div>

    )
}