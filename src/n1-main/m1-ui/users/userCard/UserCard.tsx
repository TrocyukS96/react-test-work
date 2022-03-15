import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import s from './UserCard.module.scss';
import funnyimg from './../../../../assets/images/funnyKid.jpg';
import {useDispatch} from "react-redux";
import {deleteUsersThunk, setUserIdAC} from "../../../m2-bll/reducers/UsersReducer";
import { useParams } from "react-router";


type UserCardPropsType = {
    age: number
    avatar: string
    userId: string
    name: string
    company: { name: string, date: string }
}

export const UserCard: FC<UserCardPropsType> = ({company, name, age, avatar, userId}) => {
    //hooks
    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteUsersThunk(userId))
    }
    const setUserIdHandler =()=>{
        dispatch(setUserIdAC(userId))
    }

    return (
        <div className={s.userCard}>
            <NavLink className={s.userLink} to={`/users/${userId}`} onClick={setUserIdHandler}>
                <p className={s.userName}>{name}</p>
                <img className={s.userImg} src={avatar} alt="avatar"/>
            </NavLink>

            <div className={s.userText}>
                <span>Age: {age} years</span>
            </div>
            <div className={s.buttonsBlock}>
                <button className={s.delete} onClick={deleteHandler}>delete</button>
                <button className={s.edit}>edit</button>
            </div>
        </div>
    )
}