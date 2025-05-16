import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default async function Sales() {
    return (
        <main>
            <section className='.flex-box__column'>
                <Header />
                <h1
                    style={{
                        height: "90vh",
                    }}>
                    {" "}
                    тут будет страница Политика конфиденциальности
                </h1>
                <Footer />
            </section>
        </main>
    );
}
