import './scss/styles.scss';
import { ApiForApp } from './components/base/ApiForApp';
import { EventEmitter } from './components/presenter/events';
import { ProductsData } from './components/model/PageMainData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductDisplay } from './components/view/ProductDisplay';
import { MainPage } from './components/view/MainPage';
import { BasketProductsData } from './components/model/BasketProductsData';
import { IProductData, OrderMethodPay, OrderContact } from './types';
import { ProductModal } from './components/view/ProductModal';
import { Modal } from './components/view/common/Modal';
import { Basket } from './components/view/Basket';
import { BasketProducts } from './components/view/BasketProducts';
import { OrderData } from './components/model/OrderData';
import { UserData } from './components/model/UserData';
import { ContactsUser } from './components/view/ContactsUser';
import { Success } from './components/view/Success';

const productCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const productModal = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const productBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const sucsessTemplate = ensureElement<HTMLTemplateElement>('#success');

const eventEmitter = new EventEmitter();
const productsData = new ProductsData(eventEmitter);
const page = new MainPage(document.querySelector('.page'), eventEmitter);
const basket = new Basket(cloneTemplate(basketTemplate), eventEmitter);
const basketProductsData = new BasketProductsData(eventEmitter);
const productModalData = new ProductModal(
	cloneTemplate(productModal),
	eventEmitter
);
const userData = new UserData(eventEmitter);
const order = new OrderData(cloneTemplate(orderTemplate), eventEmitter);
const contacts = new ContactsUser(
	cloneTemplate(contactsTemplate),
	eventEmitter
);
const modal = new Modal(
	ensureElement<HTMLElement>('#modal-container'),
	eventEmitter
);

const success = new Success(cloneTemplate(sucsessTemplate), eventEmitter);

eventEmitter.on('products:set', () => {
	const productsArray = productsData.pageStore.map((pageStoreItem) =>
		new ProductDisplay(cloneTemplate(productCatalog), eventEmitter).render(
			pageStoreItem
		)
	);

	page.render({
		products: productsArray,
	});
});

eventEmitter.on('product:select', (data: { id: string }) => {
	const preview = productsData.getProduct(data.id);
	eventEmitter.emit('product:selected', preview);
});

eventEmitter.on('product:selected', (preview: IProductData) => {
	console.log('select');

	const previewElement = productModalData.render({
		...preview,
		inCart: basketProductsData.inBasket(preview.id),
	});

	modal.render({ content: previewElement });
});

eventEmitter.on('product:buy', (data: { id: string }) => {
	const product = productsData.getProduct(data.id);

	basketProductsData.basketAddProd(product);
	modal.closeModal();
});

eventEmitter.on('basket:changed', () => {
	const productsinCartArray = basketProductsData.basketProducts.map((product) =>
		new BasketProducts(cloneTemplate(productBasket), eventEmitter).render(
			product
		)
	);

	basket.render({
		products: productsinCartArray,
		total: basketProductsData.getSummPrice(),
		index: productsinCartArray,
		isEmpty: basketProductsData.isEmptyBasket(),
	});
	page.render({ counter: basketProductsData.getNumber() });
});

eventEmitter.on('basket:open', () => {
	modal.render({
		content: basket.render({
			isEmpty: basketProductsData.isEmptyBasket(),
		}),
	});
});

eventEmitter.on('basketProduct:delete', (data: { id: string }) => {
	basketProductsData.basketDelProd(data.id);
});

eventEmitter.on('order:open', () => {
	modal.render({
		content: order.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

eventEmitter.on(
	/^order\..*:change/,
	(data: { field: keyof OrderMethodPay; value: string }) => {
		userData.setOrderField(data.field, data.value);
	}
);

eventEmitter.on('orderForm:change', (errors: Partial<OrderMethodPay>) => {
	const { address, payment } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

eventEmitter.on('contacts:change', (errors: Partial<OrderContact>) => {
	const { email, phone } = errors;
	contacts.valid = !phone && !email;
	contacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

eventEmitter.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			contactsPhone: '',
			contactsEmail: '',
			valid: false,
			errors: [],
		}),
	});
});

eventEmitter.on(
	/^contacts\..*:change/,
	(data: { field: keyof OrderContact; value: string }) => {
		userData.setContactsField(data.field, data.value);
	}
);

eventEmitter.on('contacts:change', (errors: Partial<OrderContact>) => {
	const { email, phone } = errors;
	contacts.valid = !phone && !email;
	contacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

eventEmitter.on('contacts:submit', () => {
	(async () => {
		try {
			const order = await ApiForApp.placeOrder({
				...userData.clientData,
				items: basketProductsData.basketGetProd.map((product) => product.id),
				total: basketProductsData.getSummPrice(),
			});
			basketProductsData.isEmptyBasket();
			modal.render({
				content: success.render({
					total: order.total,
				}),
			});
		} catch (error) {
			console.log(error);
		}
	})();
});

eventEmitter.on('sucsess:submit', () => {
	modal.closeModal();
});

eventEmitter.on('modal:open', () => {
	page.lock = true;
});

eventEmitter.on('modal:close', () => {
	page.lock = false;
});

(async () => {
	try {
		const data = await ApiForApp.getProducts();
		console.log(data);

		productsData.pageStore = data;
	} catch (error) {
		console.log(error);
	}
})();
