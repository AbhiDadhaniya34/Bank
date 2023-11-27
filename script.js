'use strict';


const account1 = {
  owner: 'Abhi Patel',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Shrish patel',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Kishor Patel',
  movements: [200,5000,4000, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Satish Dadhaniya',
  movements: [430, 1000, 5000,67,60000,700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];


const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];



const displayMovements = function (movements) {
  containerMovements.innerHTML = " ";

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
        <div clasmovementsovements__value">${mov}₹</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};



const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}₹`;
};

const calcDisplaysummry = function (movements) {
  const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.innerHTML = incomes;

  const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.innerHTML = Math.abs(out);

  const intrest = movements.filter(mov => mov > 0).map(deposite => (deposite * 1.2) / 100).reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.innerHTML = intrest;
};

let currentaccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentaccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentaccount.pin === Number(inputLoginPin.value) && currentaccount.username === inputLoginUsername.value) {
    calcDisplaysummry(currentaccount.movements);
    calcDisplayBalance(currentaccount);
    displayMovements(currentaccount.movements);
    containerApp.style.opacity = 100;
    labelWelcome.innerHTML = `Wellcome ${currentaccount.owner}`;
  }
  start();

  inputLoginUsername.value = '';
  inputLoginPin.value = '';

});
let transferaccounts;
let TransferAmount;
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  transferaccounts = accounts.find(acc => acc.username === inputTransferTo.value);
  TransferAmount = Number(inputTransferAmount.value);


  if (TransferAmount > 0 && currentaccount.balance >= TransferAmount && currentaccount !== transferaccounts) {
    currentaccount.movements.push(-TransferAmount);
    transferaccounts.movements.push(TransferAmount);
    calcDisplaysummry(currentaccount.movements);
    calcDisplayBalance(currentaccount);
    displayMovements(currentaccount.movements);

    inputTransferAmount.value = '';
    inputTransferTo.value = '';

  } else {
    console.log("abhi");
  }
});


const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentaccount.username && Number(inputClosePin.value) === currentaccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentaccount.username);
    inputCloseUsername.value = '';
    inputClosePin.value = '';
    accounts.splice(index);
    containerApp.style.opacity = 0;
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  let amount = Number(inputLoanAmount.value);
  if (amount > 0) {
    currentaccount.movements.push(amount);
    calcDisplaysummry(currentaccount.movements);
    calcDisplayBalance(currentaccount);
    displayMovements(currentaccount.movements);
    inputLoanAmount.value = '';
  }
})

btnSort.addEventListener("click", function () {
  let abhi = currentaccount.movements.sort(function (a, b) {
    return (b - a)
  });
  displayMovements(currentaccount.movements);
  console.log(abhi);

});

let now = new Date();
let date = `${now.getDate()}`.padStart(2, 0);
let month = `${now.getMonth()}`.padStart(2, 0);
let year = now.getFullYear();
labelDate.innerHTML = `${date}/${month}/${year}`;

// let start = function () {
//   let time = 100;

//   let a = setInterval(function () {
//     labelTimer.innerHTML = time;

//     if (time === 0) {
//       clearInterval(a);
//       containerApp.style.opacity = 0;
//       labelWelcome.innerHTML = "Log in to get started";
//     }
//     time--;
//   }, 1000)
// }
// let a = document.getElementById('a1');
let a = a1.getboundingclientrect();
console.log(a);
