import React, { useEffect } from "react";
import "./Modal.css";
import ModalCard from "./ModalCard";

function Modal({
    children,
    setModalVisiblity,
}: {
    children: any;
    setModalVisiblity: Function;
}): JSX.Element {
    function handleEsc(event: KeyboardEvent) {
        if (event.key === "Escape") {
            setModalVisiblity(false);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <div className="modal">
            <ModalCard>{children}</ModalCard>
        </div>
    );
}

export default Modal;
