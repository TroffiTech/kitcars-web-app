import HeroArticle from "@/components/main/heroArticle/heroArticle";
import HeroGallery from "@/components/main/heroGallery/HeroGallery";
import SubcategoriesCarousel from "@/components/main/subCategoriesCarousel/SubCategoriesCarousel";
import Tabs from "@/components/main/tabs/Tabs";
import BrandLine from "@/components/shared/brandLine/BrandLine";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import CookiePopup from "@/components/shared/popups/cookiePopup/cookiePopup";
import SectionRegistrateChanges from "@/components/shared/registrateChanges/sectionRegistrateChanges";
import SideSlideWidget from "@/components/shared/sideSlideWidget/sideSlideWidget";
import ModalDescriptionProvider from "@/hooks/modalDescriptionProvider";
import ReduxStoreProvider from "@/hooks/reduxStoreProvider";
import SmallPopupProvider from "@/hooks/smallPopupsProvider";

export default function Home() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <HeroGallery />
                <BrandLine />
                <SubcategoriesCarousel />
                <SmallPopupProvider>
                    <ReduxStoreProvider>
                        <ModalDescriptionProvider>
                            <Tabs />
                        </ModalDescriptionProvider>
                        <SideSlideWidget />
                        <CookiePopup />
                    </ReduxStoreProvider>
                    <SectionRegistrateChanges />
                </SmallPopupProvider>
                <HeroArticle />
                <Footer />
            </section>
        </main>
    );
}
