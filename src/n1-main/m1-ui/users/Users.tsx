import React, {useEffect} from "react";
import {UserCard} from "./userCard/UserCard";
import s from './Users.module.scss';
import {useDispatch} from "react-redux";
import {getUsersThunk} from "../../m2-bll/reducers/UsersReducer";


export const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersThunk(0,5))
    }, [])

    return (
        <div className={s.usersBlock}>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
            <UserCard/>
        </div>
    )
}

