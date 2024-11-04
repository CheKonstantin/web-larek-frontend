import { IEvents } from '../../components/presenter/events';
import { ensureElement } from '../../utils/utils';
import { Product } from './common/Product';

export class ProductDisplay extends Product {
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;
	protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this._category = ensureElement<HTMLElement>('.card__category', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
	}

	addEventListeners() {
		this.container.addEventListener('click', () =>
			this.events.emit<{ id: string }>('product:click', { id: this.id })
		);
	}
}
