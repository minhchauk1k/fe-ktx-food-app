export interface Product {
    id: number;
    productCode: string;
    productName: string;
    price: number;
    discountNumber: number;
    discountPercent: number;
    description: string;
    producer: string;
    createUser: string;
    updateUser: string;
    updateDate: Date;
    category: string;
    createDate: Date;
    isDeleted: boolean;
    url: string;
}