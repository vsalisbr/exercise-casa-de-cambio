const newElement = (element) => document.createElement(element);
const containerBoxes = () => document.getElementById('container-boxes');
const inputCoin = () => document.getElementById('coin');
const main = () => document.querySelector('main');
const containerBoxesHeader = () => document.getElementById('container-boxes-header')

function reqApi(coin) {
  fetch(`https://api.exchangerate.host/latest?base=${coin}`)
    .then(response => response.json())
    .then(data => {
      const moedasValidas = Object.keys(data.rates);
      if (moedasValidas.some(moeda => moeda === coin)) {
        createBoxes(data.rates);
        createHeader(coin);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Moeda não existe!',
          background: 'rgb(40, 44, 51)'
        })
      }

    })
}

function createHeader(coin) {
  const header = `Valores referentes a 1 ${coin}`;
  containerBoxesHeader().innerText = header;
}

function createBoxes(coins) {
  Object.keys(coins).forEach(coin => {
    const box = newElement('div');
    box.className = 'coin-box';
    box.innerHTML = `<div><i class="bi bi-cash-coin"></i> ${coin} </div><span class="green">${coins[coin].toFixed(3)}<span>`;
    box.style.fontSize = '13px';
    containerBoxes().appendChild(box);
  })
  main().style.display = 'flex';
}

function validateInput() {
  if (inputCoin().value.length <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Você precisa passar uma moeda!',
      background: 'rgb(40, 44, 51)'
    })
    return false;
  }
  return true;
}

document
  .getElementById('btn-search')
  .addEventListener('click', (event) => {
    event.preventDefault();
    main().style.display = 'none';
    if (validateInput()) {
      containerBoxes().innerHTML = '';
      reqApi(inputCoin().value);
    }
  })

inputCoin()
  .addEventListener('input', () => {
    inputCoin().value = inputCoin().value.toUpperCase()
    if (inputCoin().value.length > 3) {
      inputCoin().value = inputCoin().value.substr(0, 3)
    }
  })

inputCoin()
  .addEventListener('keydown', function (event) {
    const nowAllowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

    if (event.key === 'Backspace' || event.key === 'Delete') {
      return;
    }

    if (nowAllowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  });

window.onload = () => {
  inputCoin().value = '';
}
