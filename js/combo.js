// Проверка, что выбранные блюда складываются в одно из доступных комбо

// Доступные комбо (десерт можно добавить к любому, поэтому его здесь нет)
const COMBOS = [
    ['soup', 'main-course', 'salad', 'drink'],
    ['soup', 'main-course', 'drink'],
    ['soup', 'salad', 'drink'],
    ['main-course', 'salad', 'drink'],
    ['main-course', 'drink']
];

// Совпадает ли набор категорий с каким-нибудь комбо
function isCombo(categories) {
    return COMBOS.some((combo) => combo.length === categories.length
        && combo.every((category) => categories.includes(category)));
}

// Принимает массив выбранных категорий, например ['soup', 'drink'].
// Возвращает текст уведомления или null, если заказ правильный.
export function checkCombo(selected) {
    const has = (category) => selected.includes(category);
    const main = selected.filter((category) => category !== 'dessert'); // без десерта

    if (selected.length === 0) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }
    if (isCombo(main)) {
        return null; // всё хорошо
    }
    if (has('soup') && !has('main-course') && !has('salad')) {
        return 'Выберите главное блюдо/салат/стартер';
    }
    if (has('salad') && !has('soup') && !has('main-course')) {
        return 'Выберите суп или главное блюдо';
    }
    if (!has('soup') && !has('main-course') && !has('salad')) {
        return 'Выберите главное блюдо'; // выбран только напиток и/или десерт
    }
    return 'Выберите напиток'; // всё есть, кроме напитка
}
