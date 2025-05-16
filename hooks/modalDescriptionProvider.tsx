"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import ModalDescription from "@/components/modalDescription/modalDescription";
import { Product } from "@/types/productsType";

export const ModalDescriptionContext = createContext<{
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>> | undefined;
    productData: Product | undefined;
    setProductData: Dispatch<SetStateAction<Product | undefined>> | undefined;
}>({
    isVisible: false,
    setIsVisible: undefined,
    productData: undefined,
    setProductData: undefined,
});

export default function ModalDescriptionProvider({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const [productData, setProductData] = useState<Product | undefined>(undefined);

    return (
        <ModalDescriptionContext.Provider
            value={{
                isVisible,
                setIsVisible,
                productData,
                setProductData,
            }}>
            {children}
            <ModalDescription />
        </ModalDescriptionContext.Provider>
    );
}
