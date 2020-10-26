import {OrderItem} from '../models/orderitem'

export interface Order {
    orderId: Int32Array;
	creationDate:Date;
	userId :string;
	total: number;
	items: OrderItem[];
}