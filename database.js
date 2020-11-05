// require sqlite to be able to use CRUD-operations on our database
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// Create a database promise object by connecting to database 
const dbPromise = (async () => {
    return open({
        filename: './example.db',
        driver: sqlite3.Database
    });
})();

const doQueryCB = () => {
    open({
        filename: './example.db',
        driver: sqlite3.Database
    }).then((con) => {
        con.all('SELECT username, id FROM users ORDER BY username ASC')
            .then((rows) => {
                console.log(rows);
            })
            .catch(error => {
                console.log('Något gick fel');
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            console.log('were finally done with database');
        });
};

const doQuery = async () => {
    try {
        const db = await dbPromise;
        const users = await db.all('SELECT username, id FROM users ORDER BY username ASC');
        console.log(users);
        return users;
    }
    catch(error) {
        throw new Error(error);
    }
};

doQueryCB();
(async () => {
    doQuery();
})();