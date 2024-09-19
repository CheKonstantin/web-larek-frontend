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
	productDescr?: string;
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

### Класс BoxProductsData
Принимает карточки для дальнейшего оформления и работает с ними

Поля 
- boxProducts: IProduct[];
- boxSumPrice: number;

Методы
- boxGetProd(): IProduct[]; - Инициализирует массив продуктов.
- boxAddProd(prod: IProduct): void; - Добавляет продукт.
- boxDelProd(prodId: string): void; - Удаляет продукт.
- boxClear(): void; - Очищает корзину.

### Класс UserData
Работает с данными пользователя, хранит метод оплаты, адрес, почту, телефон 
    Поля
	- userMethodPay: methodPayType;
	- userAddress: string;
	- userValidAddress: boolean;
    - userPhone: string;
    - userEmail: string;

Методы
- getIUserData (): IUser; - получает данные пользователя.
- isValidIUserData (data: IUser): boolean; - проверяет валидность данных от пользователя.

## Представление
## Презентер