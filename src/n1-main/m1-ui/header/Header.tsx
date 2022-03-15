import s from './Header.module.scss';
import logoIcon from './../../../assets/images/dustClock.jpg';
import {NavLink} from "react-router-dom";
import React from "react";
export const Header = () =>{
    return(
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.inner}>
                    <img src={logoIcon} alt="logo-image"/>
                    <li className={s.users}><NavLink className={s.usersLink} to="/users">Users</NavLink> </li>

                </div>
            </div>

        </header>
    )
}