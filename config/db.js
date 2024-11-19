const mysql = require('mysql2');

const conectarDB = async () => {
    try {
        const connection = mysql.createConnection({
            host: 'localhost', // Cambia esto si tu servidor no está en localhost
            user: 'root', // Tu usuario de MySQL
            password: '', // Tu contraseña de MySQL
            database: 'ep3' // El nombre de tu base de datos
        });

        connection.connect((error) => {
            if (error) {
                console.error('Error conectando a MySQL:', error);
                process.exit(1);
            }
            console.log('Conexión exitosa a MySQL');
        });

        // Opcionalmente, exporta la conexión para usarla en otros archivos
        module.exports = connection;
    } catch (error) {
        console.error('Error general:', error);
        process.exit(1);
    }
};

module.exports = conectarDB;
