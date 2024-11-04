import { App } from '../../base/App';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../presenter/events';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends App<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton.addEventListener('click', this.closeModal.bind(this));
		this._content.addEventListener('click', (evt) => evt.stopPropagation());
		this.container.addEventListener('mousedown', (evt) => {
			if (evt.target === evt.currentTarget) {
				this.closeModal();
			}
		});

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	openModal() {
		this.toggleClass(this.container, 'modal_active', true);
		this.events.emit('modal:open');
	}

	closeModal() {
		this.toggleClass(this.container, 'modal_active', false);
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.openModal();
		return this.container;
	}
}
