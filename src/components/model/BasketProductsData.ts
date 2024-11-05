import { IBasketProductsData, IProductData } from '../../types';
import { IEvents } from '../presenter/events';

export class BasketProductsData implements IBasketProductsData {
	protected _basketProducts: IProductData[];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	get basketProducts() {
		return this._basketProducts;
	}

	basketGetProd() {
		return this._basketProducts.filter((product) => product.price !== null);
	}

	basketAddProd(product: IProductData): void {
		this._basketProducts = [product, ...this._basketProducts];
		this.events.emit('basket:changed');
	}

	basketDelProd(productId: string): void {
		this._basketProducts = this._basketProducts.filter(
			(product) => product.id !== productId
		);
		this.events.emit('basket:changed');
	}

	basketClear(): void {
		this._basketProducts = [];
		this.events.emit('basket:changed');
	}

	inBasket(id: string): boolean {
		if (this._basketProducts) {
			console.log(this._basketProducts);

			return true;
		}

		// return this._basketProducts.some((product) => {
		// 	console.log(product);

		// 	return product.id === id;
		// });
	}

	getSummPrice(): number {
		return this._basketProducts.reduce((total, product) => {
			if (product.price === null) {
				return total;
			}
			return (total += product.price);
		}, 0);
	}
}
