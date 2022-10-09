// const cartWrapper = document.documentElement.querySelector('.basket__products-box');

window.addEventListener("click", function (event) {
  // Счетчик
  let counter;
  if (event.target.dataset.action === "plus" || event.target.dataset.action === "minus") {
    // Находим родителя счетчика
    const counterWrapper = event.target.closest(".basket__products-counter");
    // Находим число
    counter = counterWrapper.querySelector("[data-counter]");
  }
  // Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
  if (event.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  }
  // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
  if (event.target.dataset.action === "minus") {
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    }
  }


    // Проверяем что клик был совершен по кнопке "Добавить в корзину"
  if (event.target.hasAttribute('data-cart')) {
    const card = event.target.closest('.features__box');

    //Собираем данные с этого товара и записываем их в единный объект productInfo
    const productInfo = {
        id: card.dataset.id,
        imgSrc: card.querySelector('.features__box-img').getAttribute('src'),
        title: card.querySelector('.features__box__title').innerText,
        grams: card.querySelector('.features__box-grams').innerText,
        price: card.querySelector('.features__box-price').innerText,
    }

    //Подставляем наши данные
    const cartItemHTML = `<div class="basket__products-inner">
    <div class="basket__products-image">
        <img src="${productInfo.imgSrc}" alt="peanut-butter">
    </div>
    <div class="basket__products-content">
        <h3 class="basket__products-name">${productInfo.title}</h3>
        <div class="basket__products-info">
            <p class="basket__products-grams">${productInfo.grams}</p>
            <h5 class="basket__products-price">${productInfo.price}</h5>
        </div>
        <div class="basket__products-counter">
            <div class="basket__products-control" data-action="minus">-</div>
            <div class="basket__products-current" data-counter>1</div>
            <div class="basket__products-control" data-action="plus">+</div>
        </div>
    </div>
    <div class="basket__products-dele" data-close="delete">x</div>
    </div>`;

    //Отобразим товар в корзине
    // cartWrapper.insertAdjacentElement('beforeend', cartItemHTML);
  }




  // Удаление товаров из корзины
  if (event.target.dataset.close) {
    // Находим родителя счетчика
    const deleteWrapper = event.target.closest(".basket__products-inner");
    deleteWrapper.remove();
  }
});

// // Очищаем корзину если товаров больше нету
// const basketProducts = document.querySelector('.basket__products-box');
// //Находим всю корзину с товарами и формой для удаления
// const basket = document.querySelector('.basket');
// basket.remove();
