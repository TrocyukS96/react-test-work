import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import s from './UserCard.module.scss';
import funnyimg from './../../../../assets/images/funnyKid.jpg';

type UserCardPropsType = {
    age:number
    avatar:string,
    name:string
    company:{ name: string, date: string }
}

export const UserCard:FC<UserCardPropsType> = ({company,name,age,avatar}) => {
    console.log(typeof avatar)
    return (
        <div className={s.userCard}>
            <NavLink className={s.userLink} to="/user">
                <img className={s.userImg} src={avatar} alt="avatar"/>

            <p className={s.userName}>{name}</p>
            <div className={s.userText}>
                <span>Age: {age} years</span>
            </div>
            </NavLink>
            <div className={s.buttonsBlock}>
                <button className={s.delete}>delete</button>
                <button className={s.delete}>edit</button>
            </div>
        </div>
    )
}