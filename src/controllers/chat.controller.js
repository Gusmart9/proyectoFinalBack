import config from '../config/config.js'

export const chatController = (req, res) => {
    const userAdminControl = req.session.user.email != config.adminEmail ? true : false;
    res.render('chat', { email: userAdminControl });
}