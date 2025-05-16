import { DefaultFeed } from "@/components/feeds/productsFeeds";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import SideSlideWidget from "@/components/sideSlideWidget/sideSlideWidget";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";

export default function Catalog() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <ReduxStoreProvider>
                    <SmallPopupProvider>
                        <ModalDescriptionProvider>
                            <DefaultFeed />
                        </ModalDescriptionProvider>
                    </SmallPopupProvider>
                    <SideSlideWidget />
                </ReduxStoreProvider>
                <Footer />
            </section>
        </main>
    );
}
