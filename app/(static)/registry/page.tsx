import { FirstArticle, SecondArticle } from "@/components/registry/articles/articles";
import Benefits from "@/components/registry/benefits/benefits";
import RegistryIntro from "@/components/registry/registryIntro/regisrtyIntro";
import TarrifsCards from "@/components/registry/tariffs/tariffs";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import SectionRegistrateChanges from "@/components/shared/registrateChanges/sectionRegistrateChanges";

export default async function Registry() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <RegistryIntro />
                <Benefits />
                <SecondArticle />
                <FirstArticle />
                <TarrifsCards />
                <SectionRegistrateChanges />
                <Footer />
            </section>
        </main>
    );
}
