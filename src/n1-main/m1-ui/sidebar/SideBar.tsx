import React from "react";
import { NavLink } from "react-router-dom";

import s from './SideBar.module.scss';

export const SideBar =()=>{
    return (
        <nav className={s.sidebar}>
            <ul className={s.sidebarList}>
                <li className={s.sidebarItem}><NavLink className={s.sidebarLink} activeClassName={s.activeLink} to="/users">Users</NavLink> </li>
            </ul>
        </nav >
    )
}