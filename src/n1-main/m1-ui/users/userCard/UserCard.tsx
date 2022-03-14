import React from "react";
import {NavLink} from "react-router-dom";
import s from './UserCard.module.scss';
import funnyimg from './../../../../assets/images/funnyKid.jpg';


export const UserCard = () => {
    return (
        <div className={s.userCard}>
            <NavLink className={s.userLink} to="/user:?id">
                <img className={s.userImg} src={funnyimg} alt=""/>
            </NavLink>
            <p className={s.userName}>Nick</p>
            <div className={s.userText}>
                <span>Age: 20 years</span>
            </div>

            <div className={s.buttonsBlock}>
                <button className={s.delete}>delete</button>
                <button className={s.delete}>edit</button>
            </div>
        </div>
    )
}