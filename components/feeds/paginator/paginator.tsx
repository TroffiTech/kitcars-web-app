import styles from "./paginator.module.scss";
import { Dispatch, SetStateAction } from "react";

export default function Paginator({
    pagesStateSetter,
    curPage,
    totalPages,
}: {
    pagesStateSetter: Dispatch<SetStateAction<number>>;
    curPage: number;
    totalPages: number;
}) {
    return (
        <div className={styles.paginator}>
            <button onClick={() => pagesStateSetter(1)}>{"<<"}</button>
            <button
                onClick={() =>
                    pagesStateSetter((prev) => {
                        if (prev === 1) return prev;
                        return prev - 1;
                    })
                }>
                -
            </button>
            <p>
                <span>{curPage}</span>/{totalPages}
            </p>
            <button
                onClick={() =>
                    pagesStateSetter((prev) => {
                        if (prev === totalPages) return totalPages;
                        return prev + 1;
                    })
                }>
                +
            </button>
            <button onClick={() => pagesStateSetter(totalPages)}>{">>"}</button>
        </div>
    );
}
