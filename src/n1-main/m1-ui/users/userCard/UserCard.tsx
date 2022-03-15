import React, {FC, useState} from "react";
import {NavLink} from "react-router-dom";
import s from './UserCard.module.scss';
import funnyimg from './../../../../assets/images/funnyKid.jpg';
import {useDispatch} from "react-redux";
import {deleteUsersThunk, setUserIdAC} from "../../../m2-bll/reducers/UsersReducer";
import {useParams} from "react-router";
import Modal from "../../../../n2-features/modal/Modal";
import {useFormik} from "formik";
import {getUserThunk, updateUserThunk} from "../../../m2-bll/reducers/userReducer";


type UserCardPropsType = {
    age: number
    avatar: string
    userId: string
    name: string
    company: { name: string, date: string }
    closeModalHandler: (value: boolean) => void
    close: boolean
    setClose:(value:boolean)=>void
}

export const UserCard: FC<UserCardPropsType> = (
    {company,
                                                    name, age,
                                                    avatar, userId,
                                                    closeModalHandler, close,setClose}
) => {
    //hooks
    const dispatch = useDispatch()

    const [open,setOpen] = useState(false)

    console.log(name)

    const deleteHandler = () => {
        dispatch(deleteUsersThunk(userId))
    }
    const setUserIdHandler = () => {
        dispatch(setUserIdAC(userId))
    }
    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    const formik = useFormik({
        initialValues: {
            name: name,
            age: age,
        },
        onSubmit: values => {
            dispatch(updateUserThunk(userId, {name:formik.values.name, age:formik.values.age}))
            formik.resetForm()
            dispatch(getUserThunk(userId))
            closeModal()
        },
    })

    return (
        <div className={s.userCard}>
            <NavLink className={s.userLink} to={`/users/${userId}`} onClick={setUserIdHandler}>
                <p className={s.userName}>{name}</p>
                    <span className={s.letter}>{name[0].toLocaleUpperCase()}</span>
            </NavLink>

            <div className={s.userText}>
                <span>Age: {age} years</span>
            </div>
            <div className={s.buttonsBlock}>
                <button className={s.delete} onClick={deleteHandler}>delete</button>
                <button className={s.edit} onClick={openModal}>edit</button>
            </div>

            {open && <Modal
                onModalClose={closeModal}
                childrenWidth={300}
                childrenHeight={300}
            >
                <div className={s.modalInner}>
                    <div className={s.content}>
                        <h5>Setting for user card</h5>
                        <form onSubmit={formik.handleSubmit} className={s.modalForm}>
                            <p>name: {name}</p>
                            <div className={s.inputItem}>
                                <label htmlFor="'name'">new name</label>
                                <input
                                    type={'text'}
                                    className={s.inputText}
                                    placeholder="Enter name"

                                    {...formik.getFieldProps('name')}
                                />
                                <br/>
                                <label htmlFor="'age'">new age</label>
                                <input
                                    type={'number'}
                                    className={s.inputText}
                                    placeholder="Enter age"
                                    {...formik.getFieldProps('age')}

                                />
                                <br/>
                                <button
                                    type="submit">
                                    submit
                                </button>

                            </div>
                        </form>

                        <button className={s.cancel} onClick={closeModal}>x</button>
                    </div>
                </div>
            </Modal>
            }
        </div>
    )
}