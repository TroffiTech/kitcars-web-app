import { readAllProductsFile } from "@/app/api/store/products/utils/readAllProductsFile";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

import StaticDescription from "@/components/staticDescription/staticDescription";
import { redirect } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
    const { sku } = await params;
    const allProducts = await readAllProductsFile();
    const productData = allProducts.filter((item) => item.sku === decodeURI(sku))[0];
    if (!productData) redirect("/not-found");
    return (
        <main>
            <section className='flex-box__column'>
                <Header />
                <StaticDescription productData={productData} />
                <Footer />
            </section>
        </main>
    );
}
