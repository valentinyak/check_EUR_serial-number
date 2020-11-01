import alphabet from './alphabet.js';
import contries from './contries.js';

const buttonEl = document.querySelector('button');
const inputEl = document.querySelector('input');
const labelEl = document.querySelector('label');

let countryName = '';
let string = '';
let firstLetter = '';
let secondLetter = '';
let newString = '';
let banknoteStat = '';
let seriaOfBanknote = '';
let numberOfFirstLetter = 0;
let numberOfSecondLetter = 0;
let sum = 0;
let checkSum = 0;

buttonEl.addEventListener('click', () => {
  checkSeriaOfBanknote();

  findNumbersOfLetters();
  findCheckSumOfSerialNumber();
  findSumFromLettersAndCheckSum();
  findCountryName();

  clearMarkup();
  addMarkup(banknoteStat);
});

function checkSeriaOfBanknote() {
  string = inputEl.value;

  if (!Number(string[1])) {
    seriaOfBanknote = 'new';
  } else {
    seriaOfBanknote = 'old';
  }
}

function findNumbersOfLetters() {
  firstLetter = string[0].toUpperCase();

  alphabet.find((element, index) => {
    if (element === firstLetter) {
      numberOfFirstLetter = index + 1;
    }
  });

  if (seriaOfBanknote === 'new') {
    secondLetter = string[1].toUpperCase();

    alphabet.find((element, index) => {
      if (element === secondLetter) {
        numberOfSecondLetter = index + 1;
      }
    });
  }
}

function findCheckSumOfSerialNumber() {
  if (seriaOfBanknote === 'old') {
    for (let i = 1; i < string.length; i += 1) {
      let number = Number(string[i]);

      sum += number;
    }
  }

  if (seriaOfBanknote === 'new') {
    for (let i = 2; i < string.length; i += 1) {
      let number = Number(string[i]);

      sum += number;
    }
  }

  newString = String(sum);
  checkSum = Number(newString[0]) + Number(newString[1]);

  if (checkSum > 9) {
    newString = String(checkSum);
    checkSum = Number(newString[0]) + Number(newString[1]);
  }
}

function findSumFromLettersAndCheckSum() {
  sum = numberOfFirstLetter + checkSum;

  if (seriaOfBanknote === 'new') {
    sum += numberOfSecondLetter;
  }

  if (sum < 10) {
    return;
  } else {
    sum = Number(String(sum)[0]) + Number(String(sum)[1]);
  }
}

function findCountryName() {
  if (seriaOfBanknote === 'old') {
    contries.find(({ name, checksum, code }) => {
      if (code === firstLetter && checksum === checkSum && sum === 8) {
        banknoteStat = 'ok';
        countryName = name;
      }
    });
  }

  if (seriaOfBanknote === 'new') {
    contries.find(({ name, code }) => {
      if (code === firstLetter && sum === 7) {
        banknoteStat = 'ok';
        countryName = name;
      }
    });
  }
}

function clearMarkup() {
  const createdParagraphEl = document.querySelector('p.created-paragraph');
  const imgEl = document.querySelector('img');

  if (createdParagraphEl && imgEl) {
    createdParagraphEl.remove();
    imgEl.remove();
    return;
  } else if (createdParagraphEl) {
    createdParagraphEl.remove();
  }
}

function addMarkup(status) {
  labelEl.classList.add('white-text-color');
  banknoteStat = '';
  checkSum = 0;
  sum = 0;

  if (
    document.body.classList.contains('isntOk') ||
    document.body.classList.contains('isOk')
  ) {
    document.body.classList.remove('isntOk');
    document.body.classList.remove('isOk');
  }

  if (status === 'ok') {
    if (seriaOfBanknote === 'old') {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<p class="created-paragraph">Serial number is ${string}.</br>
      This banknote was issued in ${countryName}.</p>
      <img src="https://static.tildacdn.com/tild3162-3431-4233-b539-393139353330/___-min.jpg">`,
      );
    }

    if (seriaOfBanknote === 'new') {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<p class="created-paragraph">Serial number is ${string}.</br>
      This banknote was issued in ${countryName}.</p>
      <img src="https://static.tildacdn.com/tild3737-3038-4435-a637-366365633030/___-min.jpg">`,
      );
    }

    document.body.classList.add('isOk');
  } else {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<p class="created-paragraph">Serial number is ${string}.</br>
        This banknote is fake!!!</p>`,
    );
    document.body.classList.add('isntOk');
  }
}
