import { YMInitializer } from "react-yandex-metrika";

const counterID = +process.env.YANDEX_METRIKA_COUNTER_ID!;

export default function YandexMetrika() {
    if (counterID) return <YMInitializer accounts={[counterID]} />;
    else return;
}
