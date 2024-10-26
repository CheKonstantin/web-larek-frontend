
export interface IPageMain {
	pageStore: IProductBase[];
	pageProdPreview: string | null;
	getProducts(): IProductBase[];
	addProduct(product: IProductBase): void;
	deleteProduct(productId: string): void;
}

export interface IModal {
	content: HTMLElement;
}

export interface IProductBase {
	_productId: string;
	productCat: string;
	productName: string;
	productDescr: string;
	productSrc: string;
	productPrice: number;
}

export interface IBasketProducts {
	basketProducts: IProductBase[];
	basketSumPrice: number;
  basketGetProd(): IProductBase[];
	basketAddProd(prod: IProductBase): void;
	basketDelProd(prodId: string): void;
	basketClear(): void;
}

export interface IOrder {
	orderMethodPay: methodPayType;
	orderAddress: string;
	orderIsValid: boolean;
	getIOrderData(): IOrder;
	isValidIOrderData (data: IOrder): boolean; 
}

export interface IContacts {
    contactsPhone: string;
    contactsEmail: string;
		contactsIsValid: boolean;
}

export interface ISuccess {
	total: number;
}

export type IProductInCatalog = Pick<IProductBase, 'productCat' | 'productName' | 'productSrc' | 'productPrice' >;
export type IProductInBasket = Pick<IProductBase, '_productId' | 'productName' | 'productPrice' >;
export type methodPayType = 'online' | 'recept';

