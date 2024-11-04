import { IEvents } from '../../components/presenter/events';
import { Product } from './common/Product';

export class BasketProducts extends Product {
	protected _btnRemove: HTMLButtonElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);
		this._btnRemove = this.container.querySelector(`.card__button`);
	}

	addEventListeners(): void {
		this._btnRemove.addEventListener('click', () =>
			this.events.emit('BasketProducts:delete', { id: this.id })
		);
	}
}
