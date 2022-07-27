import React, { useEffect } from "react";
import "./Modal.css";
import ModalCard from "./ModalCard";

function Modal({
    children,
    setModalVisibility,
}: {
    children: any;
    setModalVisibility: Function;
}): JSX.Element {
    function handleEsc(event: KeyboardEvent) {
        if (event.key === "Escape") {
            setModalVisibility(false);
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
