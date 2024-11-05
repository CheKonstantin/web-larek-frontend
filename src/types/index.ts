export interface IProductData {
	id: string;
	category: string;
	title: string;
	description: string;
	image: string;
	price: number;
}

export interface IPageMainData {
	pageStore: IProductData[];
	getProduct(id: string): IProductData;
}

export interface IBasketProductsData {
	basketProducts: IProductData[];
	basketGetProd(): IProductData[];
	basketAddProd(prod: IProductData): void;
	basketDelProd(prodId: string): void;
	basketClear(): void;
	getSummPrice(basketSumPrice: number): number;
	inBasket(id: string): boolean;
}

export interface IOrderData {
	orderMethodPay: string;
	orderAddress: string;
	orderIsValid: boolean;
}

export interface IContactsData {
	contactsPhone: string;
	contactsEmail: string;
	contactsIsValid: boolean;
}
