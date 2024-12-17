document.addEventListener('DOMContentLoaded', () => {
    const block4 = document.querySelector('.fourth p');
    const block5 = document.querySelector('.first p');

    if (block4 && block5) {
        const temp = block4.textContent;
        block4.textContent = block5.textContent;
        block5.textContent = temp;
    } else {
        console.error('Один із блоків не знайдено');
    }


// 2. Функція для обчислення площі трикутника
function calculateTriangleArea(base, height) {
    const area = (base * height) / 2;
    document.querySelector('.third p').innerText += `\nПлоща трикутника: ${area}`;
}

// Приклад виклику функції
calculateTriangleArea(10, 5);

// 3. Скрипт для підрахунку кількості максимальних чисел з 10 значень
const button = document.querySelector('#createNum');
button.addEventListener('click', () => {
    const numbers = document.querySelector('#numbersInput').value.split(',').map(Number);
    const max = Math.max(...numbers);
    const count = numbers.filter(num => num === max).length;
    alert(`Максимальне число: ${max}, Кількість: ${count}`);
    document.cookie = `maxCount=${count}; path=/;`;

    window.onbeforeunload = function () {
        // Повернення текстового повідомлення для стандартного діалогу підтвердження
        return "Дані з cookies будуть видалені. Продовжити?";
    };
});

// Видалення cookies після підтвердження при оновленні сторінки
window.addEventListener('unload', () => {
    document.cookie = "maxCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

// 4. Скрипт для встановлення жирності тексту при події scroll
function handleClick() {
    const block6 = document.querySelector('.fourth');
    const isBoldOptionChecked = document.querySelector('input[name="boldOption"]:checked');

    if (block6) {
        // Якщо галочка (радіо-кнопка) встановлена, зберігаємо або прибираємо жирність
        if (isBoldOptionChecked) {
            if (block6.style.fontWeight === 'bold') {
                block6.style.fontWeight = 'normal';
                localStorage.removeItem('boldText');
            } else {
                block6.style.fontWeight = 'bold';
                localStorage.setItem('boldText', 'bold');
            }
        }
    }
}

// Додаємо обробник події натискання на блок .fourth
document.querySelector('.fourth').addEventListener('click', handleClick);

// Відновлення жирності тексту при завантаженні сторінки
window.addEventListener('load', () => {
    const block6 = document.querySelector('.fourth');
    if (localStorage.getItem('boldText') === 'bold' && block6) {
        block6.style.fontWeight = 'bold';
    }
});


//5 задание
// Функція для створення форми
function createForm(container) {
    container.innerHTML = `
        <h3>Введіть елементи для списку:</h3>
        <input type="text" class="listInput" placeholder="Наприклад: елемент1, елемент2, елемент3">
        <button class="createList">Створити список</button>
        <button class="saveList">Зберегти список</button>
        <div class="listContainer"></div>
    `;

    // Додаємо обробник для створення ненумерованого списку
    container.querySelector('.createList').addEventListener('click', () => {
        createUnorderedList(container);
    });

    // Додаємо обробник для збереження нумерованого списку
    container.querySelector('.saveList').addEventListener('click', () => {
        saveOrderedList(container);
    });
}

// Функція для створення ненумерованого списку з "зеброю"
function createUnorderedList(container) {
    const input = container.querySelector('.listInput').value;
    const items = input.split(',').map(item => item.trim()).filter(item => item);
    const listContainer = container.querySelector('.listContainer');
    const list = document.createElement('ul');

    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;

        if (index % 2 === 0) {
            listItem.style.color = 'black';
            listItem.style.backgroundColor = 'white';
        } else {
            listItem.style.color = 'white';
            listItem.style.backgroundColor = 'black';
        }

        list.appendChild(listItem);
    });

    listContainer.innerHTML = '';
    listContainer.appendChild(list);
}

// Функція для збереження нумерованого списку в localStorage
function saveOrderedList(container) {
    const input = container.querySelector('.listInput').value;
    const items = input.split(',').map(item => item.trim()).filter(item => item);

    if (items.length === 0) {
        alert('Список порожній! Введіть хоча б один елемент.');
        return;
    }

    const orderedList = document.createElement('ol');

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        orderedList.appendChild(listItem);
    });

    const listContainer = container.querySelector('.listContainer');
    listContainer.innerHTML = '';
    listContainer.appendChild(orderedList);

    // Зберігаємо список у localStorage
    localStorage.setItem('savedOrderedList', listContainer.innerHTML);
}

// Відновлення списку при завантаженні сторінки
window.addEventListener('load', () => {
    const savedList = localStorage.getItem('savedOrderedList');
    const block = document.querySelector('.second');
    const listContainer = block.querySelector('.listContainer');

    if (savedList && listContainer) {
        listContainer.innerHTML = savedList;
    }
});

// Обробник події для виділення слова "створити"
document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim().toLowerCase();
    if (selectedText === 'створити') {
        const block = document.querySelector('.second');
        let formContainer = block.querySelector('.formContainer');

        if (!formContainer) {
            formContainer = document.createElement('div');
            formContainer.classList.add('formContainer');
            block.appendChild(formContainer);
        }

        if (!formContainer.innerHTML) {
            createForm(formContainer);
        }
    }
});

});


