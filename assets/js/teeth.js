let teeth = document.querySelectorAll('.tooth'),
    toothName = document.querySelector('.tooth__name').nextElementSibling,
    toothPresence = document.querySelector('.tooth__presence').nextElementSibling,
    toothPulp = document.querySelector('.tooth__pulp').nextElementSibling,
    toothFilling = document.querySelector('.tooth__filling').nextElementSibling,
    toothCrown = document.querySelector('.tooth__crown').nextElementSibling,
    chousedTooth,
    userNameTeeth;

// получаем зубные данные с удалённого сервера
fetch('https://my-json-server.typicode.com/rabnositkamni/db/db')
.then(response => response.json())
.then(json => {
    userNameTeeth = json.userNameTeeth;
    console.log('Данные скачаны успешно')
})
.catch(error => console.log(error.message))

// пеербираем массив в поисках нажатого элемента
teeth.forEach(element => {
    element.addEventListener('click', openInfo)
})
// Обрабатываем нажатие кнопки отправки
document.querySelector('#send__info').addEventListener('click', modificationInfo)

// удаление класса open_info у предыдущего элемента и добавление его нажатому элементу
function openInfo() {
    teeth.forEach(element => {
        if (element.classList.contains('open_info')) {
            element.classList.remove('open_info')
        }
    })

    chousedTooth = this.getAttribute('data-tooth-number'); //Записываем в переменную дата атрибут нажатого элемента
    console.log(chousedTooth)

    this.classList.add('open_info');
    showToothInfo()
}



function showToothInfo() {

    toothName.textContent = userNameTeeth[chousedTooth].toothName; //Для выбора части в ссылке на объект переменной в [] нужно использовать без точки перед скобками.

    // замена true/false на фразу
    toothPresence.textContent = userNameTeeth[chousedTooth].toothPresence;
    toothPulp.textContent = userNameTeeth[chousedTooth].toothPulp;
    toothFilling.textContent = userNameTeeth[chousedTooth].toothFilling;
    toothCrown.textContent = userNameTeeth[chousedTooth].toothCrown;

    if (toothPresence.textContent === 'true') {
        toothPresence.textContent = 'Наместе';
    } else {
        toothPresence.textContent = 'Потрачено';
    }
    if (toothPulp.textContent === 'true') {
        toothPulp.textContent = 'Наместе';
    } else {
        toothPulp.textContent = 'Потрачено';
    }
    if (toothFilling.textContent === 'true') {
        toothFilling.textContent = 'Установлена';
    } else {
        toothFilling.textContent = 'Не установлена';
    }
    if (toothCrown.textContent === 'true') {
        toothCrown.textContent = 'Установлена';
    } else {
        toothCrown.textContent = 'Не установлена';
    }
}


function modificationInfo () {
    // console.log('Test ok')
    fetch('https://my-json-server.typicode.com/rabnositkamni/db/db', {
    method: 'POST',
    body: JSON.stringify({
        userNameTeeth: {
            bottom_left_1: {
                toothName: "Тестовая запись произведена успешно"
            }
        }
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}