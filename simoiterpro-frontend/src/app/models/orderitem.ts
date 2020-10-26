import { Product } from './product';

export interface OrderItem {
    orderItemId?: Int32Array;
    orderId?: Int32Array;
    quantity: number;
    price?: number;
    product: Product;
}