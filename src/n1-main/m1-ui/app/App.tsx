import React from "react";
import {Route, Routes} from "react-router-dom";
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
                <Routes>
                    <Route path={`/users/:userId`}
                           element={<User/>}/>
                    <Route path={`/users/*`}
                           element={<Users/>}/>
                </Routes>

            </div>
            <SideBar/>
        </div>
    )
}