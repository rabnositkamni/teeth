let teeth = document.querySelectorAll('.tooth'),
    toothName = document.querySelector('.tooth__name').nextElementSibling,
    toothPresence = document.querySelector('.tooth__presence').nextElementSibling,
    toothPulp = document.querySelector('.tooth__pulp').nextElementSibling,
    toothFilling = document.querySelector('.tooth__filling').nextElementSibling,
    toothCrown = document.querySelector('.tooth__crown').nextElementSibling,
    chousedTooth,
    userNameTeeth;


// Обрабатываем нажатие кнопки отправки
document.querySelector('#send__info').addEventListener('click', modificationInfo)
// пеербираем массив в поисках нажатого элемента
teeth.forEach(element => {
    element.addEventListener('click', openInfo)
})


// плавное открытие текста заметки. В jQuery есть классная штука .slideUp(), но не в JS
// перезапускается каждый раз, когда происходит обновление списка заметок для показа
function slideUpNotes() {
    const notes = document.querySelectorAll('.tooth__note');
    notes.forEach(note => {
        const ourText = note.lastChild.previousSibling; // обращаемся к последнему ребёнку элемента, все параметры которого находятся не как обычно в корне, а в .previousSibling
        const ourTextHeight = note.lastChild.previousSibling.clientHeight;

        ourText.style.height = ourTextHeight + 'px'; // что бы анимация красиво отработала в первый раз - нужно в стили прописать высоту с единицами в которых будем оперировать

        async function hidden() {
            await setTimeout(() => {
                ourText.style.height = 0 + 'px';
            }, 500);
        }
        hidden();

        note.addEventListener('click', () => {
            note.classList.toggle('open');
            if ( note.classList.contains('open') ) {
                ourText.style.height = ourTextHeight + 'px';
            } else {
                ourText.style.height = 0 + 'px';
            }
        })
    })
}


// получаем зубные данные с удалённого сервера (данные с репозитория github аккаунта)
fetch('https://my-json-server.typicode.com/rabnositkamni/db/db')
.then(response => response.json())
.then(json => {
    userNameTeeth = json.userNameTeeth;
    console.log('Данные скачаны успешно') // так же отрабатывает когда JSON файл поломанный и оот этого не работает код. Нужно разобраться в чём дело. Но если запускать на сайте в интернете - ведёт себя по другому
    console.log("Мы скачали:", userNameTeeth)
    updatePresenceTeeth();
})
.catch(error => console.log(error.message))


function updatePresenceTeeth() {
    // перебираем объект, если в каком-то из объектов отсутствует зуб, то:
    // перебираем массив показываемых зубов, и если дата атрибут совпадает с именем объекта, где отсутствует зуб:
    // добавляем этому элементу класс missing
    for (let key in userNameTeeth) {
        if (userNameTeeth[key].toothPresence === false) {
            teeth.forEach( element => {
                let ourtooth = element.getAttribute('data-tooth-number')
                if (ourtooth === key) {
                    element.classList.add('missing');
                }
            })
        }
    }
}


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

    if (userNameTeeth[chousedTooth].toothPresence === true) {
        toothPresence.textContent = 'Наместе';
    } else {
        toothPresence.textContent = 'Потрачено';
    }
    if (userNameTeeth[chousedTooth].toothPulp === true) {
        toothPulp.textContent = 'Наместе';
    } else {
        toothPulp.textContent = 'Потрачено';
    }
    if (userNameTeeth[chousedTooth].toothFilling === true) {
        toothFilling.textContent = 'Установлена';
    } else {
        toothFilling.textContent = 'Не установлена';
    }
    if (userNameTeeth[chousedTooth].toothCrown === true) {
        toothCrown.textContent = 'Установлена';
    } else {
        toothCrown.textContent = 'Не установлена';
    }
    showNotes()
}


function showNotes() {
    let ourToothNotes = userNameTeeth[chousedTooth].notes; // массив с заметками (объекты) выбранного зуба
    let count = 0;
    let startPlaseNotes = document.querySelector('.tooth__notes');

    startPlaseNotes.innerHTML = ''; // очищаем поле с заметками

    // считаем есть ли заметки в описании зуба
    for (let key in ourToothNotes) {
        count++;
    }

    console.log("Количество заметок для этого зуба:", ourToothNotes.length)

    if (count !== 0) {     // если заметки есть, то выполняем следующий код:
        ourToothNotes.forEach(note => { // данные каждой заметки назначаем в переменные
            let header = note.action
            let date = note.date
            let money = note.money
            let text = note.text

            console.log(note)

            // и записываем в HTML файл:
            startPlaseNotes.innerHTML += `
                <div class="tooth__note">
                    <div class="tooth__note--header">
                        <h4 class="tooth__note--caption">Изменение от:</h4>
                        <h4 class="tooth__note--data">${date}</>
                        <h4 class="tooth__note--header">${header}</>
                        <h4 class="tooth__note--money">₴ ${money}</>
                    </div>
                    <p class="tooth__note--text">${text}</p>
                </div>`;
        })
    }
    slideUpNotes();
}

function modificationInfo () {
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

// заготовка под отправку данных
// let date = new Date()
// let dateYMD = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
// console.log(dateYMD)