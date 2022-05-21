/********************************************************************
 * schema.js 
 * 
 * Author: Zachary Colbert (921899547)
 * Purpose: Helper script to initialize database tables
 *******************************************************************/


/**
 * Initialize the animal table in a MySQL database 
 * @param con An actively connected MySQL database connection object
 */
 function createAnimalTable(con)
 {
     con.query("CREATE TABLE IF NOT EXISTS animal(            \
                 id INTEGER AUTO_INCREMENT PRIMARY KEY,       \
                 keyword VARCHAR(64) UNIQUE,                  \
                 name VARCHAR(64),                            \
                 kingdom VARCHAR(255),                        \
                 description VARCHAR(512),                    \
                 price VARCHAR(32),                           \
                 size VARCHAR(32),                            \
                 blood_temp VARCHAR(32),                      \
                 venomous BOOLEAN,                            \
                 image1 VARCHAR(255),                         \
                 image2 VARCHAR(255),                         \
                 image3 VARCHAR(255),                         \
                 image4 VARCHAR(255),                         \
                 image5 VARCHAR(255)                          \
             );", 
         function (err, result) {
             if (err) throw err;
         });
 }


// Export initDB function so it's accessible from other node.js files
module.exports = {
    initDB: (con) => {
        con.connect(function(err) {
            if (err) throw err;
            createAnimalTable(con);
        });
    }
}
