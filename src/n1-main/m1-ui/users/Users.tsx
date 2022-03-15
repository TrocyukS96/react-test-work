import React, {useEffect} from "react";
import {UserCard} from "./userCard/UserCard";
import s from './Users.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunk, setValueSearchAC, UserType} from "../../m2-bll/reducers/UsersReducer";
import {RootStateType} from "../../m2-bll/store";
import {Paginator} from "../../../n2-features/paginator/Paginator";
import {Search} from "../../../n2-features/search/Search";
import {useParams} from 'react-router';

export const Users = () => {

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
                <div className={s.search}>
                    <Search setValueSearchAC={setValueSearchAC} buttonText={'find'}/>
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
                            userId={u.id}

                        />
                    })
                }
            </div>

        </div>
    )
}

