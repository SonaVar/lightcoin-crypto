class Account {
  constructor(name) {
    this.username = name;
    this.transHistory = [];
  }

  get balance() {
    let balance = 0;
    for (let item of this.transHistory) {
      balance += item.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transHistory.push(transaction);
  }
}

class Transaction {
  constructor(amount, accountDet) {
    this.amount = amount;
    this.account = accountDet;
  }

  commit() {
    if (this.isAllowed) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }

}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  get isAllowed() {
    if (this.amount > this.account.balance) {
      return false;
    }
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  get isAllowed() {
    return true;
  }
}

const userSona = new Account('Sona\'s Account');

console.log('Starting account balance: ', userSona.balance);

console.log('Attempting withdrawal...');
const t1 = new Withdrawal(200.00, userSona);
console.log('Commiting transaction...', t1.commit());
console.log('Your account balance is: ', userSona.balance);


console.log('Attempting deposit...');
const t2 = new Deposit(100.00, userSona);
console.log('Commiting transaction...', t2.commit());
console.log('Your account balance is: ', userSona.balance);

console.log('Ending account balance: ', userSona.balance);
console.log('Account transaction history: ', userSona.transHistory);
