// Главный скрипт страницы «Собрать ланч»: связывает остальные файлы
import { dishes } from './dishes.js';
import { displayDishes } from './display.js';
import { initOrder } from './order.js';
import { initFilters } from './filters.js';

displayDishes(dishes); // выводим карточки
initOrder(dishes);     // включаем выбор блюд и подсчёт стоимости
initFilters();         // включаем фильтры
