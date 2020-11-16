$(document).ready(function(){

    let position = 0;
    const slideToShow = 6; // Число слайдов которые видно
    const container = document.querySelector('.slider-container');
    const track = document.querySelector('.slider-track');
    const items = document.querySelectorAll('.slide');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    const itemsCount = items.length;
    const itemWidth = container.clientWidth / slideToShow;  // Размер одного слайда
    
    
    items.forEach(function(item, i) {

      // Высчитываем ширину элемента с учетом рамки

      item.style.minWidth = `${itemWidth-2}px`;


      item.addEventListener('click', () =>{

        item.classList.toggle('locked'); // получаем, какой слайд зафиксировать
        let positionLocked = 0;

        // клик на кнопку Next
        btnNext.addEventListener('click', () => {
          const itemsLeft = itemsCount - (Math.abs(position) + slideToShow * itemWidth) / itemWidth; // Высчитывает сколько осталось слайдов до блокировки кнопки
          position -= itemsLeft >= 1 ? itemWidth : itemsLeft * itemWidth; // Условие проверяет, может ли двигаться дальше, или достигла последнего слайда
          setPosition(); // функция высчитывает расстояние на которое сдвигать track-list


          const itemLocked = document.querySelector('.slide.locked');
          positionLocked += itemWidth; // сдвигаем помеченый слайдер на насстояние itemWidth, чтобы он оставался на месте
          itemLocked.style.transform = `translateX(${positionLocked}px)`; // пеердаем это значение в css

          // При каждом клике Next, сдвигаем справа стоящие слайды через заблокированный слайд
          if(item.classList.contains('locked')) {
            i++;
            console.log(items[i]);
            items[i].style.transform = `translateX(-${itemWidth}px)`;
          };
        }); 

        // клик на кнопку Next

        btnPrev.addEventListener('click', () => {
          const itemsLeft = Math.abs(position) / itemWidth;  // Высчитывает сколько осталось слайдов до блокировки кнопки  
          
          position += itemsLeft >= 1 ? itemWidth : itemsLeft * itemWidth; // Условие проверяет, может ли двигаться дальше, или достигла последнего слайда
          
          setPosition(); // функция высчитывает расстояние на которое сдвигать track-list

          const itemLocked = document.querySelector('.slide.locked');    
          positionLocked -= itemWidth; // сдвигаем помеченый слайдер на насстояние itemWidth, чтобы он оставался на месте
          itemLocked.style.transform = `translateX(${positionLocked}px)`; // пеердаем это значение в css

          // При каждом клике Next, сдвигаем слева стоящие слайды через заблокированный слайд
          if(item.classList.contains('locked')) {
            i--;
            console.log(items[i]);
            items[i+1].style.transform = `translateX(${itemsLeft - i + 2}px)`;
          };
        });
      })
    });

    // Функция свидгает track-list
    const setPosition = () => {
      track.style.transform = `translateX(${position}px)`;

      checkBtns();
    };

    // Функция отключает кнопки, при достижении последних слайдов
    const checkBtns = () => {
      btnPrev.disabled = position === 0;
      btnNext.disabled = position <= -(itemsCount - slideToShow) * itemWidth;
    }
    checkBtns();
});

