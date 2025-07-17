"use client";

import Router from "next/router";
import React, { useCallback, useEffect } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

const counterID = +process.env.YANDEX_METRIKA_COUNTER_ID!;

const YandexMetrikaContainer: React.FC = () => {
    const hit = useCallback((url: string) => {
        ym("hit", url);
    }, []);

    useEffect(() => {
        hit(window.location.pathname + window.location.search);
        Router.events.on("routeChangeComplete", (url: string) => hit(url));
    }, [hit]);

    return (
        <YMInitializer
            accounts={[counterID]}
            options={{
                defer: true,
                webvisor: true,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
            }}
            version='2'
        />
    );
};

export default YandexMetrikaContainer;
