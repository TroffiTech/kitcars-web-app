/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useContext, useRef, useState } from "react";
import styles from "./FormRegisterChanges.module.scss";
import isTelStringValid from "@/lib/validators/validateTelInput";
import { SmallPopupContext } from "@/hooks/smallPopupsProvider";

export default function FormRegisterChanges() {
    return (
        <form className={styles.form}>
            <div className={styles.form_inputGroup}>
                <label htmlFor='name'>Ваше Имя*</label>
                <input
                    className='input'
                    id='name'
                    name='name'
                    placeholder='Иван Петров'
                    type='text'
                />
            </div>
            <div className={styles.form_inputGroup}>
                <label htmlFor='tel'>Контактный телефон*</label>
                <input className='input' id='tel' name='tel' placeholder='88003332211' type='tel' />
            </div>
            <p>Отправляя форму, вы соглашаетесь с политикой обработки персональных данных</p>

            <button>Отправить</button>
        </form>
    );
}

export function FormRegisterChangesVariant() {
    const inputTelRef = useRef<HTMLInputElement>(null);
    const [isTelValid, setIsTelValid] = useState(true);

    const setIsPopupVisible = useContext(SmallPopupContext).setIsVisible;
    const setPopupText = useContext(SmallPopupContext).setPopupText;

    function showPopup() {
        if (!setIsPopupVisible || !setPopupText) return;
        setPopupText("Ваш запрос успешно отправлен!");
        setIsPopupVisible(true);
        return;
    }

    function clearInputs() {
        if (!inputTelRef.current) return;
        inputTelRef.current.value = "";
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        if (!inputTelRef) return;

        const telValue = inputTelRef.current?.value;

        let isFromValid = 1;

        // validate tel
        if (!isTelStringValid(telValue)) {
            isFromValid *= 0;
            setTimeout(() => {
                setIsTelValid(true);
            }, 3000);
            setIsTelValid(false);
        }

        if (!isFromValid) {
            return;
        } else {
            fetch("/api/formSubmissions/registrationSubmission", {
                method: "post",
                body: JSON.stringify({
                    telValue,
                }),
            });
            showPopup();
            clearInputs();
        }
    }
    return (
        <form className={styles.formVariant}>
            <div className={styles.formVariant_ctaContainer}>
                <h3>Заполните Форму</h3>
                <p>Специалисты лаборатории проконсультируют Вас по любым вопросам</p>
                <div className={styles.formVariant_ctaContainer_inputGoup}>
                    <div>
                        <label
                            style={{
                                color: `${
                                    !isTelValid ? "var(--red-color)" : "var(--foreground-color)"
                                }`,
                            }}
                            htmlFor='tel'>
                            {!isTelValid ? "Введите номер корректно" : "Введите контактный номер"}
                        </label>
                        <input
                            style={{
                                borderColor: `${
                                    !isTelValid
                                        ? "var(--red-color)"
                                        : "var(--transparent-dark-color)"
                                }`,
                            }}
                            ref={inputTelRef}
                            type='tel'
                            id='tel'
                            placeholder='88003332211'
                            pattern='[0-9]{11}'
                        />
                    </div>
                    <button onClick={submit}>Отправить</button>
                </div>
                <p>Отправляя форму, вы соглашаетесь с политикой обработки персональных данных</p>
            </div>
            <div
                style={{
                    background: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <img
                    style={{
                        background: "transparent",
                        width: "90%",
                    }}
                    src='/testDrive-lab-logo.png'
                    alt='Test Drive Lab logo'
                />
                <p className={styles.descriptionText}>
                    Помогли уже более 5000 автовладельцам получить документы на ТС в ГИБДД после
                    внесения изменения в конструкцию
                </p>
            </div>
        </form>
    );
}
