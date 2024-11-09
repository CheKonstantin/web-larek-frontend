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
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export type OrderMethodPay = Pick<IOrderData, 'payment' | 'address'>;

export type OrderContact = Pick<IOrderData, 'email' | 'phone'>;

export type FormErrors = Partial<Record<keyof IOrderData, string>>;

export interface IUserData {
	clientData: OrderMethodPay & OrderContact;
}

export interface IContactsData {
	contactsPhone: string;
	contactsEmail: string;
	contactsIsValid: boolean;
}
