const Promise = require('bluebird');
const sqlite = require('sqlite');
const settings = require('./settings.json');

const dbCon = sqlite.open(settings.databasefile, {Promise});

const doQueryCB = () => {
    dbCon.then((con) => {
        con.all('SELECT username, id FROM users ORDER BY username ASC')
            .then((rows) => {
                console.log(rows);
            })
            .catch((error) => {
                console.log('Något gick fel');
                console.log(error)
            })
            .finally(() => {
                console.log('Were done');
            });
    });
};

const doQuery = async () => {
    try {
        const db = await dbCon;
        const users = await db.all('SELECT username, id FROM users2 ORDER BY username ASC');
        return users;
    }
    catch(error) {
        // console.log('Något gick fel.');
        // console.log(error);
        throw new Error(error);
        //return error;
    }
};

//doQueryCB();
//doQuery();
// const myFunction = async() => {

// };
// module.exports = { func: myFunction };

module.exports = { getUsers : doQuery };