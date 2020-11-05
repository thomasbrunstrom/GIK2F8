const firstName = 'Thomas'
//[ 'Thomas', index: 0, input: 'Thomas', groups: undefined ]
console.log(firstName.match(/^\w+$/));

const validPhone = '072-7138658';
const nonValidPhone = 'abs-027812';

//[ '072-7138658', index: 0, input: '072-7138658', groups: undefined ]
console.log(validPhone.match(/[0-9]{3}-[0-9]{7}/));
//null
console.log(nonValidPhone.match(/[0-9]{3}-[0-9]{7}/));

