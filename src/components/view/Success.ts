import { IEvents } from '../../components/presenter/events';
import { ensureElement, formatNumber } from '../../utils/utils';
import { App } from '../base/App';

interface ISuccess {
	total: number;
}

export class Success extends App<ISuccess> {
	protected _closeBtn: HTMLButtonElement;
	protected _summ: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;

		this._closeBtn = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			container
		);
		this._summ = ensureElement<HTMLElement>(
			'.order-success__description',
			container
		);

		this._closeBtn.addEventListener('click', () => {
			events.emit('success:submit');
		});
	}

	set total(total: number) {
		this.setText(this._summ, `Списано ${formatNumber(total, ' ')} синапсов`);
	}
}
