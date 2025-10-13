import { useDispatch, useSelector } from "react-redux";
import styles from "./checkoutForm.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCallback, useContext, useEffect, useState } from "react";

import { clearFormData, loadFormData, saveFormData } from "./formSaver";
import isNameStringValid from "@/lib/validators/validateNameInput";
import isTelStringValid from "@/lib/validators/validateTelInput";
import { SmallPopupContext } from "@/hooks/smallPopupsProvider";
import { CheckoutFormData } from "@/types/formTypes";
import { resetCart } from "@/store/cart/cartSlice";
import { RootState } from "@/store/store";
import debounce from "@/lib/debounce";

export default function CheckoutForm() {
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart.value);
	const navigator = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
		reset,
		watch,
	} = useForm<CheckoutFormData>({
		mode: "onBlur",
		defaultValues: {
			name: "",
			tel: "",
			address: "",
			additional: "",
		},
	});

	const setIsPopupVisible = useContext(SmallPopupContext).setIsVisible;
	const setPopupText = useContext(SmallPopupContext).setPopupText;

	const debouncedSaveRef = useCallback(
		debounce((data: CheckoutFormData) => {
			if (isDirty) saveFormData(data);
		}, 500),
		[isDirty]
	);

	const formData = watch();
	useEffect(() => {
		debouncedSaveRef(formData);
	}, [formData]);

	useEffect(() => {
		const savedData = loadFormData();
		if (savedData) reset(savedData);
	}, [reset]);

	function showSuccessPopup() {
		if (!setIsPopupVisible || !setPopupText) return;
		setPopupText(`Ваш запрос успешно отправлен! 
      Вы будете перенаправлены на главную страницу`);
		setIsPopupVisible(true);
	}

	function showErrorPopup() {
		if (!setIsPopupVisible || !setPopupText) return;
		setPopupText(`Невозможно выполнить запрос.
       Попробуйте позже`);
		setIsPopupVisible(true);
	}

	const onSubmit = async (data: CheckoutFormData) => {
		if (isSubmitting) return;

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/formSubmissions/orderSubmission", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					telValue: data.tel,
					nameValue: data.name,
					additionalInfoValue: data.additional,
					deliveryAddressValue: data.address,
					cart,
				}),
			});

			if (!response.ok) {
				showErrorPopup();
				return;
			}

			showSuccessPopup();
			clearFormData();
			dispatch(resetCart());
			reset();

			setTimeout(() => {
				navigator.push("/");
			}, 2000);
		} catch (error) {
			console.error("Ошибка при отправке формы:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className={styles.checkoutForm} onSubmit={handleSubmit(onSubmit)}>
			<h2>Контактная информация</h2>

			<div className={styles.inputGroup}>
				<label
					htmlFor="name"
					className="callBackForm_nameLabel"
					style={{
						color: `${errors.name ? "var(--red-color)" : "var(--foreground-color)"}`,
					}}
				>
					{errors.name ? errors.name.message : "Ваше имя*"}
				</label>
				<input
					style={{
						borderColor: `${errors.name ? "var(--red-color)" : "var(--transparent-dark-color)"}`,
					}}
					{...register("name", {
						required: "Имя обязательно",
						minLength: {
							value: 3,
							message: "Минимум 3 символа",
						},
						maxLength: {
							value: 50,
							message: "Максимум 50 символов",
						},
						validate: {
							cyrillic: (value) => isNameStringValid(value) || "Используйте кириллицу",
						},
					})}
					placeholder="Иван Петров"
					type="text"
					spellCheck="false"
					disabled={isSubmitting}
				/>
			</div>

			<div className={styles.inputGroup}>
				<label
					htmlFor="tel"
					className="callBackForm_telLabel"
					style={{
						color: `${errors.tel ? "var(--red-color)" : "var(--foreground-color)"}`,
					}}
				>
					{errors.tel ? errors.tel.message : "Контактный номер*"}
				</label>
				<input
					style={{
						borderColor: `${errors.tel ? "var(--red-color)" : "var(--transparent-dark-color)"}`,
					}}
					{...register("tel", {
						required: "Телефон обязателен",
						minLength: {
							value: 11,
							message: "Номер должен содержать 11 цифр",
						},
						maxLength: {
							value: 11,
							message: "Номер должен содержать 11 цифр",
						},
						pattern: {
							value: /^[0-9]+$/,
							message: "Только цифры",
						},
						validate: {
							valid: (value) => isTelStringValid(value) || "Введите номер корректно",
						},
					})}
					placeholder="88003332211"
					type="tel"
					disabled={isSubmitting}
				/>
			</div>

			<div className={styles.inputGroup}>
				<label htmlFor="address">Адрес доставки</label>
				<input {...register("address")} type="text" pattern="\D [%]" disabled={isSubmitting} />
			</div>

			<div className={styles.inputGroup}>
				<label htmlFor="additional">Дополнительная информация</label>
				<textarea
					className={styles.additionalInput}
					{...register("additional", {
						maxLength: {
							value: 500,
							message: "Максимум 500 символов",
						},
					})}
					disabled={isSubmitting}
				/>
				{errors.additional && (
					<span style={{ color: "var(--red-color)", fontSize: "0.8rem" }}>
						{errors.additional.message}
					</span>
				)}
			</div>

			<div className={styles.buttonBackground}>
				<button type="submit" disabled={isSubmitting || !isDirty || !isValid}>
					{isSubmitting ? "Отправка..." : "Заказать"}
				</button>
			</div>
			<p className={styles.policyWarn}>
				Подтверждая отправку формы Вы соглашаетесь с политикой использования персональных данных
			</p>
		</form>
	);
}
