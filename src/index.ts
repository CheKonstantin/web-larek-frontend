import './scss/styles.scss';
import { ApiForApp } from './components/base/ApiForApp';
import { EventEmitter } from './components/presenter/events';
import { ProductsData } from './components/model/PageMainData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductDisplay } from './components/view/ProductDisplay';
import { MainPage } from './components/view/MainPage';
import { BasketProductsData } from './components/model/BasketProductsData';
import { IProductData } from './types';
import { ProductModal } from './components/view/ProductModal';
import { Modal } from './components/view/common/Modal';

const productCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const productModal = ensureElement<HTMLTemplateElement>('#card-preview');

const eventEmitter = new EventEmitter();
const productsData = new ProductsData(eventEmitter);
const page = new MainPage(document.querySelector('.page'), eventEmitter);
const basketProductsData = new BasketProductsData(eventEmitter);
const productModalData = new ProductModal(
	cloneTemplate(productModal),
	eventEmitter
);

const modal = new Modal(
	ensureElement<HTMLElement>('#modal-container'),
	eventEmitter
);

eventEmitter.on('products:set', () => {
	const productsArray = productsData.pageStore.map((pageStoreItem) =>
		new ProductDisplay(cloneTemplate(productCatalog), eventEmitter).render(
			pageStoreItem
		)
	);

	page.render({
		products: productsArray,
		// counter: basketProductsData.getSummPrice(),
	});
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

	console.log(preview.id);

	modal.render({ content: previewElement });
});
