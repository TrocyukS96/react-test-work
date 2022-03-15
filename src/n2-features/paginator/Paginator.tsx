import React, {ChangeEvent, useState} from "react";
import s from './Paginator.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../n1-main/m2-bll/store";
import {
    getUsersThunk,
    setCurrentPageAC,
    setPortionSizeAC,
    UsersPageType
} from "../../n1-main/m2-bll/reducers/UsersReducer";


export const Paginator = () => {
    const dispatch = useDispatch()

    const usersState = useSelector<RootStateType, UsersPageType>(state => state.users)

    const {totalCount, pageSize, portionSize} = usersState


    let pageCount = Math.ceil(totalCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    let [portionNumber, setPortionNumber] = useState(1)
    let portionCount = Math.ceil(pageCount / portionSize)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    const onSetCurrentPageHandler = (currentPage: number) => {
        dispatch(setCurrentPageAC(currentPage))
        dispatch(getUsersThunk(currentPage, pageSize))
    }
    const pagesOptions = [5, 10]
    const pagesOptionsTags = pagesOptions.map(item => <option value={item} key={item}>{item}</option>)

    const pagesCountPacksChange = (pageCount: number) => {
        dispatch(setPortionSizeAC(pageCount))
    }

    const onPagesCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        pagesCountPacksChange(+event.currentTarget.value)
    }
    return (
        <div className={s.paginator}>
            <div className={s.paginatorContainer}>
                <div className={s.pageContainer}>
                    {portionNumber > 1 &&
                        <button
                            className={s.paginatorBtn}
                            disabled={!(portionNumber > 1)}
                            onClick={() => setPortionNumber(portionNumber - 1)}>
                            {'<<<'}
                        </button>}
                    <div className={s.pageNumbersBlock}>
                        {
                            pages
                                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                                .map((p, i) => {

                                    return <div className={`${s.pageNumber} ${pageCount === p ? s.selectedPage : ''}`}
                                                key={i}
                                                onClick={() => onSetCurrentPageHandler(p)}> {p}</div>
                                })
                        }
                    </div>
                    {portionCount > portionNumber &&
                        <button
                            className={s.paginatorBtn}
                            disabled={!(portionCount > portionNumber)}
                            onClick={() => setPortionNumber(portionNumber + 1)}>
                            {'>>>'}
                        </button>}
                </div>
                <div className={s.selectWrapper}>
                    Show
                    <select name="pagesCountSelect"
                            id="pagesCountSelect"
                            value={portionSize}
                            onChange={onPagesCountChangeHandler}>
                        {pagesOptionsTags}
                    </select>
                    Cards per page
                </div>
            </div>
        </div>
    )
}