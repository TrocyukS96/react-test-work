import React, {useEffect} from "react";
import {UserCard} from "./userCard/UserCard";
import s from './Users.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunk, UserType} from "../../m2-bll/reducers/UsersReducer";
import {RootStateType} from "../../m2-bll/store";
import {Paginator} from "../../../n2-features/paginator/Paginator";


export const Users = () => {
    debugger
    //hooks
    const dispatch = useDispatch();
    const pageSize = useSelector<RootStateType, number>(state=>state.users.pageSize)
    const currentPage = useSelector<RootStateType, number>(state=>state.users.currentPage)
    const users = useSelector<RootStateType, UserType[]>(state=>state.users.users)
    console.log(users, pageSize, currentPage)

    useEffect(() => {
        dispatch(getUsersThunk(currentPage,pageSize))
    }, [])

    return (
        <div className={s.users}>
            <div className={s.logicBlock}>
                <Paginator/>
                <div className={s.filter}>
                    filter
                </div>
            </div>

            <div className={s.usersBlock}>
                {
                    users.map((u,i)=>{
                        return  <UserCard
                            key={u.id}
                            age={u.age}
                            avatar={u.avatar}
                            name={u.name}
                            company={u.company}

                        />
                    })
                }
            </div>

        </div>
    )
}

