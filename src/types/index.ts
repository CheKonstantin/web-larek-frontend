export interface IPageMainData {
	pageStore: IProductData[];
	getProduct(id: string): IProductData;
}

export interface IProductData {
	productId: string;
	productCat: string;
	productName: string;
	productDescr: string;
	productSrc: string;
	productPrice: number;
}

export interface IBasketProductsData {
	basketProducts: IProductData[];
	basketGetProd(): IProductData[];
	basketAddProd(prod: IProductData): void;
	basketDelProd(prodId: string): void;
	basketClear(): void;
	getSummPrice(basketSumPrice: number): number;
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

export interface IModal {
	content: HTMLElement;
}

export interface ISuccess {
	total: number;
}

export type IProductInCatalog = Pick<
	IProductData,
	'productCat' | 'productName' | 'productSrc' | 'productPrice'
>;
export type IProductInBasket = Pick<
	IProductData,
	'productId' | 'productName' | 'productPrice'
>;
