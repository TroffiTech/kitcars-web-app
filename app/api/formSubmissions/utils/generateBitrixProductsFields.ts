import { ProductInCart } from "@/types/productsType";

export function generateBitrixProductsFields(cart: ProductInCart[]) {
    const bitrixProductRows: Array<{
        PRODUCT_ID: string;
        PRODUCT_NAME: string;
        PRICE: string;
        QUANTITY: number;
    }> = [];

    // const bitrixProductsId: Array<{
    //     product_id: number;
    // }> = [];

    let totalPrice = 0;

    cart.map((item: ProductInCart) => {
        // bitrixProductsId.push({ product_id: item.id });
        bitrixProductRows.push({
            PRODUCT_ID: item.id.toString(),
            PRODUCT_NAME: `${process.env.NEXT_PUBLIC_DOMEN}/catalog/product/${item.sku}`,
            PRICE: item.price,
            QUANTITY: item.quantity,
        });
        totalPrice += +item.price * item.quantity;
    });

    return {
        bitrixProductRows,
        // bitrixProductsId,
        totalPrice,
    };
}
