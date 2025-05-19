import { useEffect, useRef, useState } from "react";
import styles from "./callBackPopup.module.scss";
import { xMarkSVG } from "../../icons/icons";

export default function CallBackPopup({ closePopup }: { closePopup: () => void }) {
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputTelRef = useRef<HTMLInputElement>(null);

    const [isTelValid, setIsTelValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);

    useEffect(() => {
        document.body.classList.add("blockScroll");
        return () => document.body.classList.remove("blockScroll");
    });

    function submit() {
        if (!inputNameRef || !inputTelRef) return;

        const telValue = inputTelRef.current?.value;
        const nameValue = inputNameRef.current?.value;

        if (!telValue) setIsTelValid(false);
        else if (!nameValue) setIsNameValid(false);
        else closePopup();
    }

    return (
        <div className={styles.callBackPopup}>
            <form>
                <button className={styles.closeButton} onClick={closePopup}>
                    {xMarkSVG}
                </button>
                <h3>Перезвоните мне</h3>
                <p>Оставьте ваш номер и мы вам перезвоним в ближайшее время</p>

                <label
                    style={{
                        color: `${!isNameValid ? "var(--red-color)" : "var(--foreground-color)"}`,
                    }}
                    className='callBackForm_nameLabel'
                    htmlFor='name'>
                    {!isNameValid ? "Корректно заполните поле" : "Введите имя"}
                </label>
                <input
                    style={{
                        borderColor: `${
                            !isNameValid ? "var(--red-color)" : "var(--transparent-dark-color)"
                        }`,
                    }}
                    spellCheck={false}
                    name='name'
                    ref={inputNameRef}
                    type='text'
                    required
                />

                <label
                    style={{
                        color: `${!isTelValid ? "var(--red-color)" : "var(--foreground-color)"}`,
                    }}
                    className='callBackForm_telLabel'
                    htmlFor='tel'>
                    {!isTelValid ? "Корректно заполните поле" : "Введите номер"}
                </label>
                <input
                    style={{
                        borderColor: `${
                            !isTelValid ? "var(--red-color)" : "var(--transparent-dark-color)"
                        }`,
                    }}
                    spellCheck={false}
                    name='tel'
                    ref={inputTelRef}
                    type='tel'
                    required
                />

                <div className={styles.buttonBackground}>
                    <button onClick={submit}>Отправить</button>
                </div>
                <p className={styles.policyWarn}>
                    Подтверждая отправку формы Вы соглашаетесь с политикой использования
                    персональных данных
                </p>
            </form>
        </div>
    );
}
