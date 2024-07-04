import logger from '../logger.js'
import UserModel from '../models/user.model.js'

export const viewsUserRegisterController = (req, res) => {
    if (req.session.user) {
        // Si el usuario ya está autenticado, redireccionar al perfil
        res.redirect('/profile');
    } else {
        res.render('register');
    }
}

export const viewsUserLoginController = (req, res) => {
    if (req.session.user) {
        // Si el usuario ya está autenticado, redireccionar al perfil
        res.redirect('/products');
    } else {
        res.render('login');
    }
}

export const viewsUserProfileController = (req, res) => {
    // Obtener la información del usuario desde la sesión
    const userInfo = {
        first_name: req.session.user.first_name,
        last_name: req.session.user.last_name,
        email: req.session.user.email,
        age: req.session.user.age,
        cart: req.session.user.cart,
    };
    logger.debug('UserInfo:', userInfo);
    res.render('profile', userInfo);
}

export const viewsUserLogoutController = async (req, res) => {
    if (req.session.user) {
        try {
            // Obtén el usuario actual desde la base de datos utilizando su ID
            const userId = req.session.user._id;
            const user = await UserModel.findById(userId);

            if (user) {
                // Actualiza la propiedad "last_connection" con la fecha y hora actual
                user.last_connection = new Date();
                await user.save();
            }
        } catch (error) {
            logger.error(error.message);
        }
    }

    // Destruir la sesión actual del usuario
    req.session.destroy((err) => {
        if (err) {
            logger.error(err.message);
        }
        // Redireccionar a la vista de inicio de sesión
        res.redirect('/login');
    });
}

export const viewsUserForgetPasswordController = (req, res) => {

    res.render('forget-password');
}

export const viewUserStateController = async (req, res) => {
    const users = await UserModel.find().lean().exec();

    const filteredUsers = users.filter(user => user.role !== "admin");
    
    res.render('users-state', {filteredUsers});
}

