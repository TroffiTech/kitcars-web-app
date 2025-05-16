import { CategoryFeed } from "@/components/feeds/productsFeeds";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import SideSlideWidget from "@/components/sideSlideWidget/sideSlideWidget";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";

export default async function Category(props: { params: Promise<{ "category-slug": string }> }) {
    const searchedCategorySlug = (await props.params)["category-slug"];
    return (
        <main>
            <section className='.flex-box__column'>
                <Header />
                <ReduxStoreProvider>
                    <SmallPopupProvider>
                        <ModalDescriptionProvider>
                            <CategoryFeed categorySlug={searchedCategorySlug} />
                        </ModalDescriptionProvider>
                    </SmallPopupProvider>
                    <SideSlideWidget />
                </ReduxStoreProvider>
                <Footer />
            </section>
        </main>
    );
}
