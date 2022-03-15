import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../m2-bll/store";
import {UserType} from "../../m2-bll/reducers/UsersReducer";
import {getUserThunk} from "../../m2-bll/reducers/userReducer";
import s from './User.module.scss';
import {NavLink} from "react-router-dom";

type UserParamsType = {
    userId:string
}
export const User=()=>{
    const {userId} = useParams<UserParamsType>()
    //hooks
    const dispatch = useDispatch()
    const user = useSelector<RootStateType,UserType>(state=>state.user)




    useEffect(()=>{
        if(userId){
            dispatch(getUserThunk(userId))
        }
    },[])


    console.log(user)
    return (
        <div className={s.user}>
            <button>назад</button>
            <div className={s.inner}>
            <h3>About User</h3>
            <p className={s.name}>Name:{user.name}</p>
            <img src={user.avatar} alt="avatar"/>
            <p className={s.age}>Age:{user.age}</p>
            </div>
        </div>
    )
}