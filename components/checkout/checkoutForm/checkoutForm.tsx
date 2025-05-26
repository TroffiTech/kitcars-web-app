import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useContext, useRef, useState } from "react";
import styles from "./checkoutForm.module.scss";
import isTelStringValid from "@/lib/validators/validateTelInput";
import isNameStringValid from "@/lib/validators/validateNameInput";
import { SmallPopupContext } from "@/hooks/smallPopupsProvider";
import { resetCart } from "@/store/cart/cartSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";

export default function CheckoutForm() {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.value);
    const navigator = useRouter();

    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputTelRef = useRef<HTMLInputElement>(null);
    const inputDeliveryAddressRef = useRef<HTMLInputElement>(null);
    const inputAdditionalInfoRef = useRef<HTMLTextAreaElement>(null);

    const [isTelValid, setIsTelValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);

    const setIsPopupVisible = useContext(SmallPopupContext).setIsVisible;
    const setPopupText = useContext(SmallPopupContext).setPopupText;

    function showPopup() {
        if (!setIsPopupVisible || !setPopupText) return;
        setPopupText("Ваш запрос успешно отправлен!");
        setIsPopupVisible(true);
        return;
    }

    function clearInputs() {
        if (!inputNameRef.current || !inputTelRef.current) return;
        inputNameRef.current.value = "";
        inputTelRef.current.value = "";

        if (!inputDeliveryAddressRef.current) return;
        inputDeliveryAddressRef.current.value = "";

        if (!inputAdditionalInfoRef.current) return;
        inputAdditionalInfoRef.current.value = "";
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        if (!inputNameRef || !inputTelRef) return;

        const telValue = inputTelRef.current?.value;
        const nameValue = inputNameRef.current?.value;
        const deliveryAddressValue = inputDeliveryAddressRef.current?.value;
        const additionalInfoValue = inputAdditionalInfoRef.current?.value;

        let isFromValid = 1;

        // validate name
        if (!isNameStringValid(nameValue)) {
            isFromValid *= 0;
            setTimeout(() => {
                setIsNameValid(true);
            }, 3000);
            setIsNameValid(false);
        }

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
            showPopup();
            clearInputs();
            fetch("/api/formSubmissions/orderSubmission", {
                method: "post",
                body: JSON.stringify({
                    telValue,
                    nameValue,
                    additionalInfoValue,
                    deliveryAddressValue,
                    cart,
                }),
            });
            dispatch(resetCart());
            setTimeout(() => {
                navigator.push("/");
            }, 3000);
        }
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
                    {!isNameValid ? "Используйте кириллицу" : "Введите Ваше имя"}
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
                    spellCheck='false'
                    minLength={3}
                    maxLength={50}
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
                    {!isTelValid ? "Введите номер корректно" : "Введите контактный номер"}
                </label>
                <input
                    style={{
                        borderColor: `${
                            !isTelValid ? "var(--red-color)" : "var(--transparent-dark-color)"
                        }`,
                    }}
                    ref={inputTelRef}
                    name='tel'
                    type='tel'
                    placeholder='88003332211'
                    minLength={11}
                    maxLength={11}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor='address'>Введите адрес доставки (не обязательно)</label>
                <input ref={inputDeliveryAddressRef} name='address' type='text' pattern='\D [%]' />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor='additional'>Дополнительная информация (не обязательно)</label>
                <textarea
                    ref={inputAdditionalInfoRef}
                    className={styles.additionalInput}
                    name='aditional'
                    maxLength={500}
                />
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
