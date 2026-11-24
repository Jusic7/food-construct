// Всплывающее уведомление по центру экрана

export function showNotice(text) {
    // Если уведомление уже открыто — убираем старое
    document.querySelector('.notice')?.remove();

    // Создаём элементы уведомления
    const notice = document.createElement('div');
    notice.className = 'notice';

    const message = document.createElement('p');
    message.className = 'notice-text';
    message.textContent = text;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'notice-button';
    button.textContent = 'Окей 👌';

    // По нажатию на кнопку уведомление удаляется со страницы
    button.addEventListener('click', () => notice.remove());

    notice.append(message, button);
    document.body.append(notice);
    button.focus();
}
