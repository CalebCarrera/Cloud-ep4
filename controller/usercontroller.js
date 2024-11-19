const User = require('../model/user')
const config = require('../config/global');
exports.crearUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, email, password } = req.body;

        // Encriptar la contraseña usando el método estático
        const hashedPassword = await User.encryptPassword(password);

        // Crear el usuario con la contraseña encriptada
        const newUser = await User.create({
            nombres,
            apellidos,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

exports.validarUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        let usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).send('Usuario no encontrado');
        }

        const passwordValido = await usuario.validatePassword(password);
        if (!passwordValido) {
            return res.status(400).send('Contraseña incorrecta');
        }

        res.json({ message: 'Inicio de sesión exitoso'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};