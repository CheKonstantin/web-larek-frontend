export type methodPayType = 'online' | 'recept';

export interface IPageMain {
	pageStore: IProduct[];
	pageProdPreview: string | null;
	pageCountBox: number;
	pageStateBox: boolean;
}

export interface IProduct {
	productId: string;
	productCat: string;
	productName: string;
	productDescr?: string;
	productSrc: string;
	productPrice: number;
}

export interface IBoxProducts {
	boxProducts: IProduct[];
	boxSumPrice: number;
    boxGetProd(): IProduct[];
	boxAddProd(prod: IProduct): void;
	boxDelProd(prodId: string): void;
	boxClear(): void;
}

export interface IUserData {
    getIUserData (): IUser;
    isValidIUserData (data: IUser): boolean;
}

export interface IUser {
	userMethodPay: methodPayType;
	userAddress: string;
	userValidAddress: boolean;
    userPhone: string;
    userEmail: string;
}


