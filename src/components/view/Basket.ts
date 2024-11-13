import { EventEmitter } from '../presenter/events';
import { createElement, ensureElement, formatNumber } from '../../utils/utils';
import { App } from '../base/App';

interface IBasketView {
	products: HTMLElement[];
	total: number;
	index: HTMLElement[];
	isEmpty: boolean;
}

export class Basket extends App<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', container);
		this._total = ensureElement<HTMLElement>('.basket__price', container);
		this._button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			container
		);

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.products = [];
	}

	set products(products: HTMLElement[]) {
		if (products.length) {
			this._list.replaceChildren(...products);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пустая',
				})
			);
		}
	}

	set index(products: HTMLElement[]) {
		if (products) {
			products.reverse();
			for (let i = 0; i < products.length; i++) {
				const index = products[i].querySelector('.basket__item-index');
				index.textContent = `${i + 1}`;
			}
		}
	}

	set total(total: number) {
		this.setText(this._total, `${formatNumber(total, ' ')} синапсов`);
	}

	set isEmpty(value: boolean) {
		this.setDisabled(this._button, value);
	}
}
