import { useRef, useState } from "react";
import styles from "./checkoutForm.module.scss";

export default function CheckoutForm() {
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputTelRef = useRef<HTMLInputElement>(null);

    const [isTelValid, setIsTelValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);

    function submit() {
        if (!inputNameRef || !inputTelRef) return;

        const telValue = inputTelRef.current?.value;
        const nameValue = inputNameRef.current?.value;

        if (!nameValue) setIsTelValid(false);
        else if (!telValue) setIsNameValid(false);
    }

    return (
        <form className={styles.checkoutForm}>
            <h2>Контактная информация</h2>
            <div className={styles.inputGroup}>
                <label
                    htmlFor='name'
                    className='callBackForm_nameLabel'
                    style={{
                        color: `${!isNameValid ? "var(--red-color)" : "var(--foreground-color)"}`,
                    }}>
                    {!isNameValid ? "Корректно заполните поле" : "Введите Ваше имя"}
                </label>
                <input
                    style={{
                        borderColor: `${
                            !isNameValid ? "var(--red-color)" : "var(--transparent-dark-color)"
                        }`,
                    }}
                    ref={inputNameRef}
                    placeholder='Иван Петров'
                    name='name'
                    type='text'
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label
                    htmlFor='tel'
                    className='callBackForm_telLabel'
                    style={{
                        color: `${!isTelValid ? "var(--red-color)" : "var(--foreground-color)"}`,
                    }}>
                    {!isTelValid ? "Корректно заполните поле" : "Введите контактный номер"}
                </label>
                <input
                    style={{
                        borderColor: `${
                            !isTelValid ? "var(--red-color)" : "var(--transparent-dark-color)"
                        }`,
                    }}
                    ref={inputTelRef}
                    placeholder='88003332211'
                    name='tel'
                    type='tel'
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor='address'>Введите адрес доставки (не обязательно)</label>
                <input name='address' type='text' />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor='additional'>Дополнительная информация (не обязательно)</label>
                <textarea className={styles.additionalInput} name='aditional' />
            </div>

            <div className={styles.buttonBackground}>
                <button onClick={submit}>Заказать</button>
            </div>
            <p className={styles.policyWarn}>
                Подтверждая отправку формы Вы соглашаетесь с политикой использования персональных
                данных
            </p>
        </form>
    );
}
