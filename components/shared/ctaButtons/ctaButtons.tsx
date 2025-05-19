"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ctaButtons.module.scss";
import CallBackPopup from "../popups/callBackPopup/callBackPopup";

export default function CallBackButton({ text }: { text: string }) {
    const [isVisible, setIsVisible] = useState(false);

    function openPopup() {
        setIsVisible(true);
    }

    function closePopup() {
        setIsVisible(false);
    }

    return (
        <>
            {isVisible && <CallBackPopup closePopup={closePopup} />}
            <div className={styles.callBackButton_background}>
                <button onClick={openPopup} className={styles.callBackButton}>
                    <p>{text}</p>
                </button>
            </div>
        </>
    );
}

export function LinkButton({ link, text }: { link: string; text: string }) {
    return (
        <div className={styles.linkButton_container}>
            <Link className={styles.linkButton} href={link}>
                {text}
            </Link>
        </div>
    );
}
