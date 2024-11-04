import { IOrderData, IProductData } from '../../types';
import { Api } from './Api';
import { API_URL, CDN_URL, settings } from '../../utils/constants';

export type OrderResponse = {
	id: string;
	total: number;
};

export type ProductsResponse<T> = {
	total: number;
	items: T[];
};

export class MainApi extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProduct(id: string): Promise<IProductData> {
		return this.get(`/product/${id}`).then((item: IProductData) => ({
			...item,
			image: this.cdn + item.productSrc,
		}));
	}

	getProducts(): Promise<IProductData[]> {
		return this.get('/product/').then((data: ProductsResponse<IProductData>) =>
			data.items.map((item: IProductData) => ({
				...item,
				image: this.cdn + item.productSrc,
			}))
		);
	}

	placeOrder(data: IOrderData): Promise<OrderResponse> {
		return this.post(`/order`, data).then((res: OrderResponse) => res);
	}
}

export const ApiForApp = new MainApi(CDN_URL, API_URL, settings);
