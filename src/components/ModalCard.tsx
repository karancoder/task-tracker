import React from "react";
import "./ModalCard.css";

function ModalCard({ children }: { children: any }): JSX.Element {
    return <div className="modalcard">{children}</div>;
}

export default ModalCard;
