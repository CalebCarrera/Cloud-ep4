const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

// Configuración de la conexión
const sequelize = new Sequelize('ep3', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Definición del modelo Usuario
class User extends Model {
    // Método para encriptar contraseñas
    static async encryptPassword(password) {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    }

    // Método para validar contraseñas
    async validatePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        nombres: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        email: { 
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: { 
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize, // Conexión a la base de datos
        modelName: 'User',
        tableName: 'users', // Nombre de la tabla en la base de datos
        timestamps: false // Cambiar a true si quieres createdAt/updatedAt
    }
);

// Sincronización del modelo con la base de datos (opcional)
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a MySQL exitosa');
        await sequelize.sync(); // Esto crea la tabla si no existe
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
})();

module.exports = User;
