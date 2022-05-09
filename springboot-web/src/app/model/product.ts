export interface Product {
    id: number;
    productCode: string;
    productName: string;
    price: number;
    discountNumber: number;
    discountPercent: number;
    description: string;
    producer: string;
    category: string;
    createUser: string;
    createDate: Date;
    updateUser: string;
    updateDate: Date;
    isDeleted: boolean;
    urlAvatar: string;
}