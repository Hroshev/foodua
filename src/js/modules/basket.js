// Div внутри корзины, в который мы добавляем товары 
const cartWrapper = document.querySelector('.basket__products-box');

//Функция если корзина пуста
function toggleCartStatus() {
  const cartEmptyBadge = document.querySelector('[data-cart-empty]');
  const ordedrForm = document.querySelector('#order-form');
  const shipping = document.querySelector('.basket__shipping-inner');
  const basket = document.querySelector('.menu__cart');

  if (cartWrapper.children.length > 0) {
    cartEmptyBadge.style.display = "none";
    ordedrForm.style.display = "block";
    shipping.style.display = "block";
    basket.style.display = "block";
  } else {
    cartEmptyBadge.style.display = "block";
    ordedrForm.style.display = "none";
    shipping.style.display = "none";
    basket.innerText = "Кошик порожній";
    basket.style.display = "none";
  }
}

//Подсчет стоимости товаров 
function calcCartPriceAndbasket() {
  const cartItems = document.querySelectorAll('.basket__products-inner');
  const totalPriceEl = document.querySelector('.basket__result');
  //Корзина для подсчета количества товаров в корзине
  const basket = document.querySelector('.menu__cart');
  //Доставка
  const deliveryCost = document.querySelector('[data-cart-delivery]');

  let totalPrice = 0;
  let totlaCount = 0;

  cartItems.forEach(function (item) {
    const amountEl = item.querySelector('[data-counter]');
    const priceEl = item.querySelector('.basket__products-price');
    const currentPrice = Math.ceil(parseInt(amountEl.textContent) * parseInt(priceEl.textContent));
    totalPrice += currentPrice;
    totlaCount += parseInt(amountEl.textContent);
  })
  //Корзина для подсчета количества товаров в корзине
  basket.textContent = `Ваш кошик (${totlaCount})`;

  //Отображаем цену на странице
  totalPriceEl.textContent = totalPrice;

  //Указываем стоимость доставки
  if (totalPrice >= 600) {
    deliveryCost.classList.add('basket__shipping-free');
    deliveryCost.textContent = 'безкоштовно';
  } else {
    deliveryCost.classList.remove('basket__shipping-free');
    deliveryCost.textContent = 'за тарифами Нової Пошти'; 
  }
}

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
    // Удаляем товар если он больше не нужен по клику на минус
    } else if(event.target.closest('.basket__products-box') && parseInt(counter.innerText) === 1) {
      //Удаляем товар из корзины
      event.target.closest('.basket__products-inner').remove()

      //Отображение статуса корзины Пустая / Полная
      toggleCartStatus();

      //Пересчет общей стоимости товаров в корзине
      calcCartPriceAndbasket()
    }
  }
  //Проверяем клик на + или - внутри корзины
  if (event.target.hasAttribute('data-action') && event.target.closest('.basket__products-box')) {
    //Пересчет общей стоимости товаров в корзине
    calcCartPriceAndbasket()
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
        counter: parseInt(1),
    }

    //Проверяем есть ли уже такой товар в корзине 
    const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

    //Если товар есть в корзине
    if(itemInCart) {
      const counterElement = itemInCart.querySelector('[data-counter]');
      parseInt(counterElement.textContent++);
      //Пересчет общей стоимости товаров в корзине
      calcCartPriceAndbasket()
    } else {

    //Подставляем наши данные
    const cartItemHTML = `<div class="basket__products-inner" data-id="${productInfo.id}">
    <div class="basket__products-image">
        <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
    </div>
    <div class="basket__products-content">
        <h3 class="basket__products-name">${productInfo.title}</h3>
        <div class="basket__products-info">
            <p class="basket__products-grams">${productInfo.grams}</p>
            <h5 class="basket__products-price">${productInfo.price}</h5>
        </div>
        <div class="basket__products-counter">
            <div class="basket__products-control" data-action="minus">-</div>
            <div class="basket__products-current" data-counter>${productInfo.counter}</div>
            <div class="basket__products-control" data-action="plus">+</div>
        </div>
    </div>
    </div>`;

    //Отобразим товар в корзине
    cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
    
    //Отображение статуса корзины Пустая / Полная
    toggleCartStatus();

    //Пересчет общей стоимости товаров в корзине
    calcCartPriceAndbasket()
    }

  }
});