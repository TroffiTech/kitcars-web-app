import { readAllProductsFile } from "@/app/api/store/products/utils/readAllProductsFile";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import StaticDescription from "@/components/staticDescription/staticDescription";

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
    const { sku } = await params;
    const allProducts = await readAllProductsFile();
    const productData = allProducts.filter((item) => item.sku === sku)[0];

    return (
        <main>
            <section className='.flex-box__column'>
                <Header />
                <StaticDescription productData={productData} />
                <Footer />
            </section>
        </main>
    );
}
