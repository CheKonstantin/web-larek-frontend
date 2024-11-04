import { IEvents } from '../../components/presenter/events';
import { IContactsData } from '../../types';
import { Form } from './common/Form';

export class Contacts extends Form<IContactsData> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set contactsPhone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set contactsEmail(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set contactsIsValid(value: boolean) {
		this.setDisabled(this._submit, !value);
	}
}
