const bcrypt = require('bcrypt');
const saltRounds = 10;
const genPass = async (pwd) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(pwd, salt);
    return hash;
};
const compPass = async (pwd, hash) => {
    const match = await bcrypt.compare(pwd, hash);
    return match;
};
(async ( ) => {
    const password = 'kallekula';
    const password2 = 'tomteluva';
    const pass1 = await genPass(password);
    const pass2 = await genPass(password);
    const pass3 = await genPass(password2);
    
    console.log(await compPass(password, pass1));//True
    console.log(await compPass(password, pass2));//True
    console.log(await compPass(password, pass3));//False
    console.log(await compPass(password2, pass3));//True
})();
