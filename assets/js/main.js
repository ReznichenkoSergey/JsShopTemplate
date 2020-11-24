let buttonsContainer = document.querySelector(".page-content");
let cartCounterLabel = document.querySelector("#cart-counter");
let buttonRecycle = document.querySelector(".page-header__cart-btn");

//Goods Class
class Goods {
  constructor() {
    this.production = [];
  }
  sum(name) {
    let sum = 0;
    if (name === undefined) {
      this.production.forEach((x) => (sum += x.sum * 100));
    } else {
      this.production.forEach((x) => {
        if (x.name === name) sum += x.sum * 100;
      });
    }
    return Math.round(sum) / 100;
  }
  count() {
    return this.production.length;
  }
}
//List of goods
let goods = new Goods();

let btnClickHandler = (e) => {
  let target = e.target;

  var name = e.target.closest(".container-fluid").querySelector(".item-title")
    .innerHTML;

  if (target.classList.contains("item-actions__cart")) {
    const mockData = +target.parentElement.previousElementSibling.innerHTML.replace(
      /^\$(\d+)\s\D+(\d+).*$/u,
      "$1.$2"
    );

    //Insert an element
    goods.production.push({
      name: name,
      sum: mockData,
    });

    //let cartPrice = Math.round((cartPrice + mockData) * 100) / 100;
    let cartPrice = goods.sum(name);
    let restoreHTML = target.innerHTML;

    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

    //Recycle label
    let counter = goods.count();
    cartCounterLabel.innerHTML = `${goods.count()}`;
    if (counter === 1) cartCounterLabel.style.display = "block";

    buttonsContainer.removeEventListener("click", btnClickHandler);
    target.disabled = true;

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      buttonsContainer.addEventListener("click", btnClickHandler);
      target.disabled = false;
    }, 2000);
  }
};

buttonsContainer.addEventListener("click", btnClickHandler);

//Recycle
let btnRecycleClickHandler = (e) => {
  let message = "";
  if (goods.count() === 0) {
    message = "Корзина пуста!";
  } else {
    message = `Выбрано товаров ${goods.count()} шт.:\r\r`;
    goods.production.forEach((x) => {
      message += `${x.name}     ${x.sum.toFixed(2)}$\r`;
    });
    message += "\r\r" + `Общая сумма: ${goods.sum().toFixed(2)}`;
  }
  alert(message);
};

cartCounterLabel.parentElement.addEventListener(
  "click",
  btnRecycleClickHandler
);
