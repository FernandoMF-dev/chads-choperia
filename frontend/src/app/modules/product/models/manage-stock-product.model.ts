import { Product } from './product.model';

export interface ManageStockProduct {
	product: Product;
	amount: number;
	productId?: number;
}
