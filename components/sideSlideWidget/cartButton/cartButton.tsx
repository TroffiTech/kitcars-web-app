import Link from "next/link";
import { cartSVG } from "@/components/icons/icons";
import styles from "./cartButton.module.scss";

export default function CartButton({ count }: { count: number }) {
    return (
        <Link className={styles.cartButton} href={"/cart"}>
            {cartSVG}
            {count !== 0 && <div className={styles.counter}>{count}</div>}
        </Link>
    );
}
