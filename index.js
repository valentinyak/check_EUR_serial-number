import alphabet from './alphabet.js';
import contries from './contries.js';

const buttonEl = document.querySelector('button');
const inputEl = document.querySelector('input');
const labelEl = document.querySelector('label');

let countryName = '';
let string = '';
let letter = '';
let newString = '';
let banknoteStat = '';
let numberOfLetter = 0;
let sum = 0;
let checkSum = 0;

buttonEl.addEventListener('click', () => {
  findNumberOfLetter();
  findCheckSumOfSerialNumber();
  findSumFromLetterAndCheckSum();
  findCountryName();
  clearMarkup();
  addMarkup(banknoteStat);
});

function findNumberOfLetter() {
  string = inputEl.value;
  letter = string[0].toUpperCase();
  alphabet.find((element, index) => {
    if (element === letter) {
      numberOfLetter = index + 1;
    }
  });
}

function findCheckSumOfSerialNumber() {
  for (let i = 1; i < string.length; i += 1) {
    let number = Number(string[i]);

    sum += number;
  }
  newString = String(sum);
  checkSum = Number(newString[0]) + Number(newString[1]);

  if (checkSum > 9) {
    newString = String(checkSum);
    checkSum = Number(newString[0]) + Number(newString[1]);
  }
}

function findSumFromLetterAndCheckSum() {
  sum = numberOfLetter + checkSum;
  if (sum < 10) {
    return;
  } else {
    sum = Number(String(sum)[0]) + Number(String(sum)[1]);
  }
}

function findCountryName() {
  contries.find(({ name, checksum, code }) => {
    if (code === letter && checksum === checkSum && sum === 8) {
      banknoteStat = 'ok';
      countryName = name;
    }
  });
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
    document.body.insertAdjacentHTML(
      'beforeend',
      `<p class="created-paragraph">Serial number is ${string}.</br>
      This banknote was issued in ${countryName}.</p>
      <img src="https://static.tildacdn.com/tild3162-3431-4233-b539-393139353330/___-min.jpg">`,
    );
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

{
  /* <img
  src="https://static.tildacdn.com/tild3737-3038-4435-a637-366365633030/___-min.jpg"
></img>; */
}
