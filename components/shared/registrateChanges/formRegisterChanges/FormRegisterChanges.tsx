import styles from "./FormRegisterChanges.module.scss";

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
                <input className='input' id='tel' name='tel' placeholder='89005553321' type='tel' />
            </div>
            <p>Отправляя форму, вы соглашаетесь с политикой обработки персональных данных</p>

            <button>Отправить</button>
        </form>
    );
}

export function FormRegisterChangesVariant() {
    return (
        <form className={styles.formVariant}>
            <div className={styles.formVariant_ctaContainer}>
                <h3>Заполните Форму</h3>
                <p>Специалисты лаборатории проконсультируют Вас по любым вопросам</p>
                <div className={styles.formVariant_ctaContainer_inputGoup}>
                    <div>
                        <label htmlFor='tel'>Ваш телефонный номер</label>
                        <input type='tel' id='tel' placeholder='88003332211' pattern='[0-9]{11}' />
                    </div>
                    <button>Отправить</button>
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
