import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default async function About() {
    return (
        <main>
            <section className='.flex-box__column'>
                <Header />
                <h1> тут будет страница О нас</h1>
                <Footer />
            </section>
        </main>
    );
}
