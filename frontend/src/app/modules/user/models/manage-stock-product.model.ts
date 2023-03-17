import { Product } from '../../product/models/product.model';

export interface ManageStockProduct {
	product: Product;
	amount: number;
}
