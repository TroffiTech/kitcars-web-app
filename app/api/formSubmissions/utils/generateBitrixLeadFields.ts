export default function generateBitrixLeadFields(
    name: string,
    tel: string,
    additionalInfo: string,
    deliveryAddress: string,
    totalPrice: number
) {
    const leadFields = {
        fields: {
            ADDRESS_CITY: deliveryAddress,
            COMMENTS: additionalInfo,
            HONORIFIC: `${process.env.NEXT_PUBLIC_DOMEN}`,
            SOURCE_DESCRIPTION: `${process.env.NEXT_PUBLIC_DOMEN}`,
            TITLE: `Заказ с сайта ${process.env.NEXT_PUBLIC_DOMEN}`,
            NAME: name,
            OPPORTUNITY: totalPrice,
            PHONE: [{ VALUE: `${tel}` }],
        },
    };

    return leadFields;
}
