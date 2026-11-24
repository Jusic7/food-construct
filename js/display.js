// Вывод карточек блюд на страницу

// Создаёт HTML-элемент карточки для одного блюда
export function createDishCard(dish, buttonText = 'Добавить') {
    const card = document.createElement('div');
    card.className = 'dish';
    card.dataset.dish = dish.keyword; // атрибут data-dish="gazpacho"
    card.dataset.kind = dish.kind;    // тип блюда — нужен фильтрам

    const img = document.createElement('img');
    img.src = dish.image;
    img.alt = dish.name;

    const price = document.createElement('p');
    price.className = 'dish-price';
    price.textContent = `${dish.price}₽`;

    const name = document.createElement('p');
    name.className = 'dish-name';
    name.textContent = dish.name;

    const weight = document.createElement('p');
    weight.className = 'dish-weight';
    weight.textContent = dish.count;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = buttonText;

    card.append(img, price, name, weight, button);
    return card;
}

// Перебирает массив и кладёт каждую карточку в блок своей категории
export function displayDishes(dishList) {
    // Копия массива, отсортированная по названию (по алфавиту)
    const sorted = [...dishList].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

    sorted.forEach((dish) => {
        // Блок категории ищем по data-category, например data-category="soup"
        const container = document.querySelector(`.dishes[data-category="${dish.category}"]`);
        if (container) {
            container.append(createDishCard(dish));
        }
    });
}
