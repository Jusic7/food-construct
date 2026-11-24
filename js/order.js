// Выбор блюд и подсчёт стоимости заказа
import { checkCombo } from './combo.js';
import { showNotice } from './notify.js';

// Категории, которые есть в форме, и текст, если в категории ничего не выбрано
const CATEGORIES = {
    'soup': 'Блюдо не выбрано',
    'main-course': 'Блюдо не выбрано',
    'salad': 'Блюдо не выбрано',
    'drink': 'Напиток не выбран',
    'dessert': 'Десерт не выбран'
};

// Текущий заказ: для каждой категории — выбранное блюдо или null
const order = {};
Object.keys(CATEGORIES).forEach((category) => {
    order[category] = null;
});

// Обновляет блок «Ваш заказ» в форме
function updateOrderBlock() {
    const selected = Object.values(order).filter((dish) => dish !== null);
    const emptyText = document.querySelector('.order-empty');
    const summary = document.querySelector('.order-summary');

    // Ничего не выбрано — показываем только надпись
    emptyText.hidden = selected.length > 0;
    summary.hidden = selected.length === 0;

    Object.keys(CATEGORIES).forEach((category) => {
        const dish = order[category];
        const value = document.querySelector(`.order-item[data-category="${category}"] .order-item-value`);
        const input = document.querySelector(`input[type="hidden"][data-category="${category}"]`);

        value.textContent = dish ? `${dish.name} ${dish.price}₽` : CATEGORIES[category];
        input.value = dish ? dish.keyword : ''; // на сервер уйдёт keyword
    });

    // Итоговая стоимость: сумма цен выбранных блюд
    const total = selected.reduce((sum, dish) => sum + dish.price, 0);
    document.querySelector('.order-total-value').textContent = `${total}₽`;
}

// Подсвечивает рамкой выбранную карточку в её категории
function highlightCard(dish) {
    document.querySelectorAll(`.dishes[data-category="${dish.category}"] .dish`).forEach((card) => {
        card.classList.toggle('selected', card.dataset.dish === dish.keyword);
    });
}

// Подключает обработчик кликов по кнопкам «Добавить»
export function initOrder(dishList) {
    document.querySelector('main').addEventListener('click', (event) => {
        // Нас интересуют только клики по кнопке внутри карточки
        const button = event.target.closest('.dish button');
        if (!button) {
            return;
        }

        // По data-dish находим блюдо в массиве
        const keyword = button.closest('.dish').dataset.dish;
        const dish = dishList.find((item) => item.keyword === keyword);

        order[dish.category] = dish; // новое блюдо заменяет старое в этой категории
        highlightCard(dish);
        updateOrderBlock();
    });

    const form = document.querySelector('.order-form');

    // При отправке проверяем, что заказ — одно из комбо
    form.addEventListener('submit', (event) => {
        const selected = Object.keys(order).filter((category) => order[category] !== null);
        const message = checkCombo(selected);
        if (message) {
            event.preventDefault(); // форма не отправится
            showNotice(message);
        }
    });

    // Кнопка «Сбросить» очищает и выбор блюд
    form.addEventListener('reset', () => {
        Object.keys(order).forEach((category) => {
            order[category] = null;
        });
        document.querySelectorAll('.dish.selected').forEach((card) => card.classList.remove('selected'));
        updateOrderBlock();
    });

    updateOrderBlock();
}
