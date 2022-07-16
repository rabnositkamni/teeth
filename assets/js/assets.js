// плавное открытие текста заметки. В jQuery есть классная штука .slideUp(), но не в JS
// пеерпись под несколько заметок на странице перемещён в основной файл
// const notes = document.querySelectorAll('.tooth__note');

// notes.forEach(note => {
//     const ourText = note.lastChild.previousSibling; // обращаемся к последнему ребёнку элемента, все параметры которого находятся не как обычно в корне, а в .previousSibling
//     const ourTextHeight = note.lastChild.previousSibling.clientHeight;

//     ourText.style.height = ourTextHeight + 'px'; // что бы анимация красиво отработала в первый раз - нужно в стили прописать высоту с единицами в которых будем оперировать

//     async function hidden() {
//         await setTimeout(() => {
//             ourText.style.height = 0 + 'px';
//         }, 500);
//     }
//     hidden();

//     note.addEventListener('click', () => {
//         note.classList.toggle('open');
//         if ( note.classList.contains('open') ) {
//             ourText.style.height = ourTextHeight + 'px';
//         } else {
//             ourText.style.height = 0 + 'px';
//         }
//     })
// })