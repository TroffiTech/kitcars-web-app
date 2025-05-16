import BrandLine from "@/components/brandLine/BrandLine";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import HeroGallery from "@/components/heroGallery/HeroGallery";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import SectionRegistrateChanges from "@/components/registrateChanges/sectionRegistrateChanges";
import SubcategoriesCarousel from "@/components/subCategoriesCarousel/SubCategoriesCarousel";
import Tabs from "@/components/tabs/Tabs";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import SideSlideWidget from "@/components/sideSlideWidget/sideSlideWidget";
import CookiePopup from "@/components/popups/cookiePopup/cookiePopup";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";
import HeroArticle from "@/components/heroArticle/heroArticle";

export default function Home() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <HeroGallery />
                <BrandLine />
                <SubcategoriesCarousel />
                <ReduxStoreProvider>
                    <SmallPopupProvider>
                        <ModalDescriptionProvider>
                            <Tabs />
                        </ModalDescriptionProvider>
                    </SmallPopupProvider>
                    <SideSlideWidget />
                    <CookiePopup />
                </ReduxStoreProvider>
                <SectionRegistrateChanges />
                <HeroArticle />
                <Footer />
            </section>
        </main>
    );
}
