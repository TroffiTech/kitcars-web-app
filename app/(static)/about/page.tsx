import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export default async function About() {
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <h1
                    style={{
                        height: "90vh",
                    }}>
                    {" "}
                    тут будет страница О нас
                </h1>
                <Footer />
            </section>
        </main>
    );
}
