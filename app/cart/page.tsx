import { CartFeed } from "@/components/feeds/productsFeeds";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import CookiePopup from "@/components/popups/cookiePopup/cookiePopup";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";

export default function Cart() {
    return (
        <main>
            <section className='.flex-box__column'>
                <Header />
                <ReduxStoreProvider>
                    <SmallPopupProvider>
                        <CartFeed />
                    </SmallPopupProvider>
                    <CookiePopup />
                </ReduxStoreProvider>
                <Footer />
            </section>
        </main>
    );
}
