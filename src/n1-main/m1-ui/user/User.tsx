import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../m2-bll/store";
import {getProductsThunk, getUserThunk} from "../../m2-bll/reducers/userReducer";
import s from './User.module.scss';
import {useNavigate} from "react-router-dom";
import {Products} from "./products/Products";
import {ProductType, UserType} from "../../m2-bll/reducers/UsersReducer";
import Modal from "../../../n2-features/modal/Modal";
import {useFormik} from "formik";

type UserParamsType = {
    userId: string
}
export const User = () => {
    const {userId} = useParams<UserParamsType>()
    //hooks
    const dispatch = useDispatch()

    // @ts-ignore
        const user = useSelector<RootStateType, UserType>(state => state.user.person)
    // @ts-ignore
    const products = useSelector<RootStateType, ProductType[]>(state => state.user.products)
    const navigate = useNavigate();
    const goBackHandler = () => {
        navigate('users')
    }

    useEffect(() => {
        if (userId) {
            dispatch(getUserThunk(userId))
            dispatch(getProductsThunk(userId))
        }
    }, [])



    return (
        <div className={s.user}>
            <button onClick={goBackHandler}>назад</button>
            <div className={s.inner}>
                <h3>About User</h3>
                <p className={s.name}>Name:{user.name}</p>
                <img src={user.avatar} alt="avatar"/>
                <p className={s.age}>Age:{user.age}</p>
            </div>
            <Products products={products}/>



        </div>
    )
}