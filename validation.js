const p = parseInt('thomas');
console.log(p); //Kommer logga ut NaN
console.log(isNaN(p)); //Kommer logga ut true

const c = parseInt('F', 16);
console.log(c);

const s = 'hello world'.match(/hello/);
console.log(s);