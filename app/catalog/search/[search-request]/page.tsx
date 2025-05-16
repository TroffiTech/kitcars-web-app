import { SearchFeed } from "@/components/feeds/productsFeeds";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import SideSlideWidget from "@/components/sideSlideWidget/sideSlideWidget";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";

export default async function SearchResultPage(props: {
    params: Promise<{ "search-request": string }>;
}) {
    const searchRequest = (await props.params)["search-request"];
    return (
        <main>
            <section className='.flex-box__column'>
                <Header />
                <ReduxStoreProvider>
                    <SmallPopupProvider>
                        <ModalDescriptionProvider>
                            <SearchFeed searchRequest={searchRequest} />
                        </ModalDescriptionProvider>
                    </SmallPopupProvider>
                    <SideSlideWidget />
                </ReduxStoreProvider>
                <Footer />
            </section>
        </main>
    );
}
