import React from "react";
import {Route, Routes} from "react-router-dom";
import {Header} from "../header/Header";
import {User} from "../user/User";
import {Users} from "../users/Users";

import s from './App.module.scss';

export const App = () => {
    return (
        <div className={s.appWrapper}>
            <Header/>
            <div className={s.main}>
                <div className={s.container}>
                    <Routes>
                        <Route path={`/`}
                               element={<Users/>}/>
                        <Route path={`/users`}
                               element={<Users/>}/>
                        <Route path={`/users/:userId`}
                               element={<User/>}/>
                        {/*<Route path="*">*/}
                        {/*    <Users/>*/}
                        {/*</Route>*/}
                    </Routes>
                </div>

            </div>
        </div>
    )
}