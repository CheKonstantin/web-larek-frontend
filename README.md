# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Документация "Вэб ларек"

## Описание типов данных

Главная старница

```
export interface IPageMainData {
	pageStore: IProductData[];
	getProduct(id: string): IProductData;
}
```

Продукт

```
export interface IProductData {
	id: string;
	category: string;
	title: string;
	description: string;
	image: string;
	price: number;
}
```

Корзина

```
export interface IBasketProductsData {
	basketProducts: IProductData[];
	basketGetProd: IProductData[];
	basketAddProd(prod: IProductData): void;
	basketDelProd(prodId: string): void;
	basketClear(): void;
	getSummPrice(basketSumPrice: number): number;
	inBasket(id: string): boolean;
}
```

Пользователь

```
export interface IUserData {
	clientData: OrderMethodPay & OrderContact;
}
```

Контакты

```
export interface IContactsData {
	contactsPhone: string;
	contactsEmail: string;
	contactsIsValid: boolean;
}
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме МѴР:

- `Слой данных`, отвечает за хранение и изменение данных
- `Слой представления`, отвечает за отображение данных на странице,
- `Презентер`, отвечает за связь представления и данных.

## Базовый код

- `Класс Арі`
  Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес
  сервера и опциональный объект с заголовками запросов.
- Методы:
  - `get` выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с
    объектом, которым ответил сервер
  - `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и
    отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию
    выполняется POST запрос, но метод запроса может быть переопределен заданием третьего
    параметра при вызове.

## Класс EventEmitter

`Брокер событий` позволяет отправлять события и подписываться на события, происходящие в
системе. Класс используется в презентере для обработки событий и в слоях приложения для
генерации событий.
Основные методы, реализуемые классом описаны интерфейсом `IEvents:

- `on` - Установить обработчик на событие
- `off` - Снять обработчик с события
- `emit` - Инициировать событие с данными

## Данные

### Класс ProductsData

ProductsData нужен для работы с объектами товаров реализует поля и методы интерфейса IPageMainData.
В конструкторе добавлен брокер событий.
Возвращает массив продуктов и может вернуть конкретный товар.

Поля

- set pageStore(products: IProductData[])
- get pageStore()
- events: IEvents

Методы:

- getProduct(productId: string) - добавляет массив товаров

### Класс BasketProductsData

реализует поля и методы интерфейса IBasketProductsData
Принимает карточки для дальнейшего оформления и работает с ними

Поля

- get basketProducts()
- get basketGetProd()

Методы

- basketAddProd(product: IProductData): void - Добавляет продукт.
- basketDelProd(productId: string): void - Удаляет продукт.
- isEmptyBasket(): boolean - устанавливает нулевую стоимость товаров в корзине.
- getNumber(): void; - узнает кол-во товаров в корзине.
- basketClear(): void - очищает корзину
- inBasket(id: string): boolean - проверяет на наличие товара
- getSummPrice(): number - считает общую стоимость товаров в корзине

### Класс OrderData

Работает с данными заказа, хранит метод оплаты, адрес и проверяет валидность полей ввода
constructor(container: HTMLFormElement, events: IEvents)

Поля

- protected \_paymentBtns: HTMLButtonElement[];
- set orderMethodPay(name: string)
- set orderAddress(value: string)
- set valid(value: boolean)

### Класс ContactsData

Работает с данными от пользователя, хранит почту, телефон
и проверяет валидность полей ввода.
Поля

- set contactsPhone(value: string)
- set contactsEmail(value: string)
- set contactsIsValid(value: boolean)

## Представление

### Класс App

Родительский класс для всех компонентов.
Он работает с версткой сайта.
protected constructor(protected readonly container: HTMLElement)
Методы

- toggleClass() - переключает класс
- setDisabled() - меняет статус блокировки
- setText() - устанавливает текстовое содержимое
- setHidden() - скрывает элемент
- setVisible() - показывает элемент
- setImage() - устанавливает картинку
- render() - отризовывает DOM-элемент

### Класс Modal

Класс для модальных окон.
Поля

- protected \_closeButton: HTMLButtonElement;
- protected \_content: HTMLElement;
- set content(value: HTMLElement)

В нем есть методы:

- openModal - для открытия окна;
- closeModal - для закрытия окна по мисклику, по кнопке и по клавише Esc;
- render(data: IModalData) - для отрисовки окна

### Класс Product

Содержит все поля для описания товара в модальном окне

Поля:

- protected \_title: HTMLElement;
- protected \_price: HTMLElement;
- protected \_button: HTMLButtonElement;
- protected events: IEvents;
- set id()
- get id()
- set title(value: string)
- set price(value: number)

Методы

- addEventListeners(): void - устанавливает слушатель на кнопку

### Класс BasketProducts

Реализует отображение карточки товара в корзине.
constructor(template: HTMLTemplateElement, events: IEvents)

Поля:

- protected \_button: HTMLButtonElement;
- protected \_title: HTMLElement;
- protected \_price: HTMLElement;
- protected events: IEvents;

  Методы

- addEventListeners(): void - устанавливает слушатель на кнопку удаления из корзины

### Класс Form

Содержит все поля для описания формы в модальном окне
При сабмите инициирует событие передавая в него объект с данными из полей ввода формы. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки.\

Поля класса:

- \_submit: HTMLButtonElement - Кнопка подтверждения
- \_errors: HTMLElement - объект хранящий элемент для вывода ошибок под полями формы

Методы:

- set valid(value: boolean) - изменяет активность кнопки подтверждения
- set errors(value: string) - устанавливает текст ошибки
- onInputChange(field: keyof T, value: string) - инициирует событие передавая в него объект с данными из полей ввода формы

### Класс Contacts

Наследует все поля и методы класса Form. Параметры конструктора
container: HTMLFormElement, events: IEvents

сеттер contactsPhone устанавливает значение в инпут телефона.
сеттер contactsEmail устанавливает значение в инпут почты.
сеттер contactsIsValid дизэйблит кнопку если поле введено не верно.

### Класс Success

Содержит поля для модалки успешного заказа
Поля:

- closeBtn: HTMLButtonElement - Кнопка закрытия
- summ: HTMLElement - отображает полную стоимость заказа

### Класс ProductDisplay

Отвечает за отображение каталога товаров на главной странице.
constructor(protected container: HTMLElement, events: IEvents)
В конструкторе передаётся элемент контейнера, в котором будет размещён каталог товаров. В методе **addEventListeners** принимается id нажатой карточки товара и инициализация метода emit

### Класс MainPage

    constructor(container: HTMLElement, protected events: IEvents)

    поля

- counter: HTMLElement
- basketBtn: HTMLButtonElement
- store: HTMLElement
- pageWrapper: HTMLElement

Отвечает за отображение главной страницы сайта.
Сеттер products устанавливает товары на страницу.
Сеттер counter задает кол-во товаров в корзину.
Сеттер lock блокирует прокрутку во время открытого товара.

## Презентер

### Взаимодействие

Код, который описывает взаимодействие между интерфейсом и данными, находится в файле index.ts, который выполняет роль координатора. Здесь события создаются с помощью системы событий и обработчиков, прописанных в index.ts.

В начале работы страницы мы запрашиваем список товаров с сервера и показываем каталог.

- При клике на товар открывается модальное окно с его деталями.
- При нажатии на корзину появляется модальное окно с содержимым корзины.
- Когда мы нажимаем на кнопку “Купить” в карточке товара, этот товар добавляется в корзину.
- По клику на крестик в модальном окне товара закрываем его.

### Список событий

События, связанные с изменением данных (генерируются классами-моделями):

- cart: updated — изменение массива товаров в корзине.
- client: infoReceived — получение данных о покупателе.
- product: chosen — обновление товара для отображения в модальном окне.
- product: resetPreview — сброс данных товара для показа в модальном окне.

События, возникающие при взаимодействии пользователя с интерфейсом:

- product: pick — выбор товара для открытия в модальном окне.
- cart: show — открытие модального окна с корзиной.
- product: purchase — выбор товара для покупки (нажатие на кнопку "Купить").
- productInBasket: remove — удаление товара из корзины.
- paymentMethod: select — выбор способа оплаты.
- address: change — изменение данных в адресной форме.
- email: change — изменение данных в форме электронной почты.
- phoneNumber: change — изменение данных в форме номера телефона.
- address: validate — валидация данных в адресной форме.
- email: validate — валидация данных в форме электронной почты.
- phoneNumber: validate — валидация данных в форме номера телефона.
- orderData: confirm — подтверждение отправки данных заказа.
- clientData: confirm — подтверждение отправки данных о покупателе.

После открытия корзины показывается модальное окно со статусом “Корзина”. Данные для этого состояния берутся из модели данных корзины.

- При нажатии на кнопку “Оформить” модальное окно с корзиной переключается на форму заказа.
- При нажатии на кнопку “Далее” переходим к форме ввода данных пользователя.
- При нажатии на кнопку “Оплатить” собираем все данные из корзины и форм, объединяем их в один объект и отправляем на сервер для оформления заказа. Если ответ успешный, модальное окно с корзиной переходит в состояние успешно
- В состоянии “Успешно” очищаем корзину, используя данные из заказа.
- По клику на крестик закрываем модальное окно корзины, возвращаем состояние назад и очищаем формы.
- Если нажать на иконку урны, товар удаляется из корзины. Проверяется количество товаров: если удаляется последний, закрываем корзину и очищаем формы.

### Класс ApiService

Расширяет родительский класс BaseApi и включает в себя методы для работы с серверной частью.

- constructor(cdn: string, baseUrl: string, options?: RequestInit): В конструктор передаются параметры: cdn для загрузки изображений, основной адрес сервера и опциональный объект с заголовками для запросов.
  Методы:
- fetchProduct(id: string): Promise<IProduct> - метод для получения и обработки данных одного товара.
- fetchAllProducts(): Promise<IProduct[]> - метод для получения и обработки полного списка товаров.
- submitOrder(data: IOrder): Promise<OrderResponse>** - принимает объект с данными заказа и вызывает метод **post\*\* родителя.
