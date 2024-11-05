import { IProductData, IPageMainData } from '../../types';
import { IEvents } from '../presenter/events';

export class ProductsData implements IPageMainData {
	protected store: IProductData[];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set pageStore(products: IProductData[]) {
		this.store = products;
		this.events.emit('products:set');
	}

	get pageStore() {
		return this.store;
	}

	getProduct(productId: string) {
		return this.store.find((item) => item.id === productId);
	}
}
