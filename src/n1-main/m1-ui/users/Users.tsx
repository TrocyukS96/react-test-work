import React, {useEffect, useState} from "react";
import {UserCard} from "./userCard/UserCard";
import s from './Users.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunk, setValueSearchAC, UserType} from "../../m2-bll/reducers/UsersReducer";
import {RootStateType} from "../../m2-bll/store";
import {Paginator} from "../../../n2-features/paginator/Paginator";
import {Search} from "../../../n2-features/search/Search";
import Modal from "../../../n2-features/modal/Modal";
import {useFormik} from "formik";
import {Input} from "../../../n2-features/Input/Input";
import {Preloader} from "../../../common/preloader/Preloaders";
import {RequestStatusType} from "../../m2-bll/reducers/userReducer";
//types
type FormikErrorType= {
    name?:string
    age?:number
}


export const Users = () => {

    //hooks
    const dispatch = useDispatch();
    const pageSize = useSelector<RootStateType, number>(state=>state.users.pageSize)
    const currentPage = useSelector<RootStateType, number>(state=>state.users.currentPage)
    const users = useSelector<RootStateType, UserType[]>(state=>state.users.users)
    // @ts-ignore
    const status = useSelector<RootStateType, RequestStatusType>(state=>state.user.status)
    console.log(users, pageSize, currentPage)
    const [close,setClose] = useState(true)

    const closeModalHandler = (value:boolean)=>{
        setClose(value)
    }

    useEffect(() => {
        dispatch(getUsersThunk(currentPage,pageSize))
    }, [])


    return (
        <div className={s.users}>
            {status === 'loading' && <Preloader/>}
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
                            closeModalHandler={closeModalHandler}
                            close={close}
                            setClose={setClose}

                        />
                    })
                }

            </div>

        </div>
    )
}

