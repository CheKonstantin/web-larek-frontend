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

Алиас для способа оплаты

```
export type methodPayType = 'online' | 'recept';
```

Главная старница

```
export interface IPageMain {
	pageStore: IProduct[];
	pageProdPreview: string | null;
}
```

Продукт

```
export interface IProduct {
	productId: string;
	productCat: string;
	productName: string;
	productDescr: string;
	productSrc: string;
	productPrice: number;
}
```

Корзина

```
export interface IBoxProducts {
	boxProducts: IProduct[];
	boxSumPrice: number;
    boxGetProd(): IProduct[];
	boxAddProd(prod: IProduct): void;
	boxDelProd(prodId: string): void;
	boxClear(): void;
}
```

Пользователь

```
export interface IUser {
	userMethodPay: methodPayType;
	userAddress: string;
	userValidAddress: boolean;
    userPhone: string;
    userEmail: string;
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

### Класс PageMainData

Нужен для работы с объектами товаров
Включает в себя массив карточек, данные для отображения модалки и экземпляр класса для инициации событий.

Поля

- pageStore: IProduct[];
- pageProdPreview: string | null;
- events: IEvents

Методы:

- getProducts(): IProduct[] - добавляет массив товаров
- addProduct(product: IProduct): void - добавляет товар
- deleteProduct(productId: string): void - удаляет товар

### Класс BasketProductsData

Принимает карточки для дальнейшего оформления и работает с ними

Поля

- basketProducts: IProduct[];
- basketSumPrice: number;

Методы

- basketGetProd(): IProduct[]; - Инициализирует массив продуктов.
- basketAddProd(prod: IProduct): void; - Добавляет продукт.
- basketDelProd(prodId: string): void; - Удаляет продукт.
- basketClear(): void; - Очищает корзину.

### Класс OrderData

Работает с данными заказа, хранит метод оплаты, адрес и проверяет валидность полей ввода
Поля - orderMethodPay: methodPayType; - orderAddress: string; - orderIsValid: boolean;

### Класс ContactsData

Работает с данными от пользователя, хранит почту, телефон
и проверяет валидность полей ввода.
Поля - orderMethodPay: methodPayType; - orderAddress: string; - orderIsValid: boolean;

## Представление

### Класс App

Родительский класс для всех компонентов, в нем лежит метод render

### Класс Popup

Класс для модальных окон.
В нем есть методы:

- openPopup - для открытия окна;
- closePopup - для закрытия окна по мисклику, по кнопке и по клавише Esc;
- constructor(content: HTMLElement, events: IEvents) - констурктор для инициилизации.

Поля

- content: HTMLElement - контент передаваемый в модалку
- events: IEvents - брокер событий инициализирует событие

### Класс ProductBase

Содержит все поля для описания товара в модальном окне
Поля:

- productName: HTMLElement - блок разметки для названия
- productSrc: HTMLImageElement - блок разметки для картинки
- productDescr: HTMLElement - блок разметки для описания
- productPrice: HTMLElement - блок разметки для цены
- productCat: HTMLElement - блок разметки для категории
- productBtn: HTMLButtonElement - кнопка покупки
- events: IEvents - брокер событий

Методы

- addEventListeners(): void - устанавливает слушатель на кнопку

### Класс BasketProducts

Реализует отображение карточки товара в корзине.
constructor(template: HTMLTemplateElement, events: IEvents)

\_title: HTMLElement - элемент для наименования
\_price: HTMLElement - элемент для вывода цены
events: IEvents - брокер событий
Методы

addEventListeners(): void - устанавливает слушатель на кнопку удаления из корзины

### Класс popupForm

Содержит все поля для описания формы в модальном окне

Поля:

- submitBtn: HTMLButtonElement - Кнопка подтверждения
- \_form: HTMLFormElement - форма
- inputsForm: NodeListOf<HTMLInputElement> - все поля формы
- errorsForm: Record<string, HTMLElement> - все ошибки в полях формы

Методы:

- setInputData(data: Record<string, string>): void - заполняет поля формы
- setErrorData(data: { field: string, value: string, validInformation: string }): void - устанавливает текст ошибки полей
- showError (field: string, errorMessage: string): void - отображает ошибку поля
- hideError (field: string): void - очишает ошибку
- clearForm (): void - очишает форму
- get form: HTMLElement - получаем форму
- setStateBtn(isValid: boolean): void - изменяет состояние кнопки
- getInputsData(): Record<string, string> - возвращает данные поля в виде объекта

#### Класс popupSuccess

Содержит поля для модалки успешного заказа
Поля:

- submitBtn: HTMLButtonElement - Кнопка подтвердить
- summ: HTMLElement - отображает полную стоимость заказа

### Класс ProductDisplay

Отвечает за отображение каталога товаров на главной странице.

- **constructor(protected container: HTMLElement)**: В конструкторе передаётся элемент контейнера, в котором будет размещён каталог товаров. В методе **show** принимается массив элементов разметки товаров, который выводится в указанном контейнере.

### Класс MainPage

Отвечает за отображение главной страницы сайта. В методе **show** принимаются данные о количестве товаров в корзине для отображения счётчика.

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
