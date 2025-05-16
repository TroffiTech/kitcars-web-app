import CallBackButton from "../ctaButtons/ctaButtons";
import { infoLinks } from "../header/categoriesList";
import Logo from "../header/logo/Logo";
import { mailSVG, personSVG, phoneSVG } from "../icons/icons";
import { contactsData } from "../contactsData";
import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_innerTop}>
                {/* 1 */}
                <div className={styles.footer_sectionOne}>
                    <Logo />
                    <p>
                        Мы создали этот интернет-магазин, чтобы вы могли найти любой интересующий
                        Вас товар для «UAZ Patriot» здесь, по дружественной цене!
                    </p>
                </div>
                {/* 2 */}
                <div className={styles.footer_sectionTwo}>
                    <h2>Навигация</h2>
                    {infoLinks.map((link, index) => (
                        <a href={link.link} key={index}>
                            {link.name}
                        </a>
                    ))}
                </div>
                {/* 3 */}
                <div className={styles.footer_sectionThree}>
                    <h2>Наш Адрес</h2>
                    <a href='https://yandex.ru/maps/44/izhevsk/house/spartakovskiy_pereulok_13/YUoYdAFiTEMPQFtsfXR0cHRrbQ==/?ll=53.262569%2C56.851889&z=17.09'>
                        426065, Удмуртская Республика, г. Ижевск, пер. Спартаковский, д. 13
                    </a>
                    <img
                        height={300}
                        width={300}
                        alt='Мы на картах'
                        src='http://static-maps.yandex.ru/1.x/?pt=53.262568,56.851889,pm2rdm&amp;theme=dark&amp;ll=53.242568,56.851889&amp;spn=0.03,0.03&amp;size=300,300&amp;l=map&amp;key=AKgqHEkBAAAA-WzMYwIAeAeamm8ETZZZpdfp2R07eIuGyX4AAAAAAAAAAACjUCDoHIHZJ2pcl5mSL1zWVp2Myw=='
                    />
                </div>

                {/* 4 */}
                <div className={styles.footer_sectionFour}>
                    <h2>Контакты</h2>
                    {contactsData.map((contactData, index) => (
                        <ul key={index}>
                            <div className='flex-box__gap-20'>
                                {personSVG}
                                <p>{contactData.name}</p>
                            </div>
                            <div className='flex-box__gap-20'>
                                {phoneSVG}
                                <a
                                    className={styles.header_topInner_contacts_phoneNumber}
                                    href={`tel:${contactData.phone}`}>
                                    {contactData.phone}
                                </a>
                            </div>
                            <div className='flex-box__gap-20'>
                                {mailSVG}
                                <a
                                    className={styles.header_topInner_contacts_phoneNumber}
                                    href={`mailto:${contactData.email}`}>
                                    {contactData.email}
                                </a>
                            </div>
                        </ul>
                    ))}
                    <CallBackButton text='Заказать звонок' />
                </div>
            </div>
            <div className={styles.footer_innerBottom}>
                <p>
                    © ООО &quot;Вип&quot;, {new Date(Date.now()).getFullYear()}. Все права защищены.
                </p>
                <a href='/info'>Договор публичной оферты</a>
                <a href='/policy'>Политика конфиденциальности</a>
            </div>
        </footer>
    );
}
