import React from "react";

import styles from "./Button.module.css";

interface ButtonProps {
    type?: "button" | "submit";
    onClick?: () => void;
    color?: "blue" | "red";
    red?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = "button", onClick, red, color, children }) => {
    return <button
        className={`${styles.button}  ${red && styles.redButton}`}
        type={type}
        onClick={onClick}
        color={color}>
        {children}
    </button>


};

export default Button;