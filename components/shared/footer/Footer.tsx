import { contactsData } from "@/components/contactsData";
import CallBackButton from "../ctaButtons/ctaButtons";
import { infoLinks } from "../header/categoriesList";
import { LogoVariant } from "../header/logo/Logo";
import { mailSVG, personSVG, phoneSVG } from "../icons/icons";
import Image from "next/image";

import styles from "./Footer.module.scss";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_innerTop}>
                {/* 1 */}
                <div className={styles.footer_sectionOne}>
                    <LogoVariant />
                    <p>
                        Мы создали этот интернет-магазин, чтобы вы могли найти любой интересующий
                        Вас товар для «{process.env.NEXT_PUBLIC_SITE_NAME}» здесь, по дружественной
                        цене!
                    </p>
                </div>
                {/* 2 */}
                <div className={styles.footer_sectionTwo}>
                    <h2>Навигация</h2>
                    {infoLinks.map((link, index) => (
                        <Link href={link.link} key={index}>
                            {link.name}
                        </Link>
                    ))}
                </div>
                {/* 3 */}
                <div className={styles.footer_sectionThree}>
                    <h2>Наш Адрес</h2>
                    <Link href='https://yandex.ru/maps/44/izhevsk/house/spartakovskiy_pereulok_13/YUoYdAFiTEMPQFtsfXR0cHRrbQ==/?ll=53.262569%2C56.851889&z=17.09'>
                        {process.env.NEXT_PUBLIC_ADDRESS}
                    </Link>
                    <Image
                        height={300}
                        width={300}
                        alt='Мы на картах'
                        src={`/maps/${process.env.NEXT_PUBLIC_CITY_LOCATION}.jpg`}
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
                                <Link
                                    className={styles.header_topInner_contacts_phoneNumber}
                                    href={`tel:${contactData.phone}`}>
                                    {contactData.phone}
                                </Link>
                            </div>
                            <div className='flex-box__gap-20'>
                                {mailSVG}
                                <Link
                                    className={styles.header_topInner_contacts_phoneNumber}
                                    href={`mailto:${contactData.email}`}>
                                    {contactData.email}
                                </Link>
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
                <Link href='/offer'>Договор публичной оферты</Link>
                <Link href='/policy'>Политика конфиденциальности</Link>
            </div>
        </footer>
    );
}
