import React from "react";
import {Route} from "react-router-dom";
import {Header} from "../header/Header";
import {SideBar} from "../sidebar/SideBar";
import {User} from "../user/User";
import {Users} from "../users/Users";

import s from './App.module.scss';

export const App = () => {
    return (
        <div className={s.appWrapper}>
            <Header/>
            <div className={s.main}>
                <div className={s.pagination}>pagination</div>
                <div className={s.filtration}>filtration</div>
                <Route exact path={"/user"}
                       render={User}/>
                <Route path={"/users"}
                       render={Users}/>
            </div>
            <SideBar/>
        </div>
    )
}