import React from 'react';
import s from './Modal.module.scss';

type ModalPropsType = {
    onModalClose: () => void
    childrenWidth: number
    childrenHeight: number
}

const Modal: React.FC<ModalPropsType> = (props) => {

    const {
        onModalClose,
        childrenWidth,
        childrenHeight,
        children
    } = props

    const top = `calc(50vh - ${childrenHeight / 2}px)`;
    const left = `calc(50vw - ${childrenWidth / 2}px)`;

    const modalMessageStyle = {
        top,
        left,
        width: childrenWidth,
        height: childrenHeight
    }

    return (
        <>
            <div className={s.modalBackground} onClick={onModalClose}>
            </div>
            <div className={s.modalMessage} style={modalMessageStyle}>
                {children}
            </div>
        </>
    )
}


export default Modal;