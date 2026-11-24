// Фильтры блюд внутри каждой категории

// Показывает в разделе только блюда нужного типа (kind = null — показать все)
function applyFilter(section, kind) {
    section.querySelectorAll('.dish').forEach((card) => {
        const isVisible = kind === null || card.dataset.kind === kind;
        card.classList.toggle('is-hidden', !isVisible);
    });
}

// Подключает обработчик кликов по кнопкам-фильтрам
export function initFilters() {
    document.querySelector('main').addEventListener('click', (event) => {
        const button = event.target.closest('.filter');
        if (!button) {
            return;
        }

        const section = button.closest('.menu-section');

        // Повторный клик по активному фильтру — снимаем его и показываем всё
        if (button.classList.contains('active')) {
            button.classList.remove('active');
            applyFilter(section, null);
            return;
        }

        // Иначе активным становится только этот фильтр
        section.querySelectorAll('.filter').forEach((filter) => filter.classList.remove('active'));
        button.classList.add('active');
        applyFilter(section, button.dataset.kind);
    });
}
