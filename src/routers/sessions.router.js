import { Router } from "express";
import passport from 'passport';
import {
  createUserController,
  failCreateUserController,
  loginUserController,
  errorLoginUserController,
  failLoginUserController,
  githubLoginUserController,
  githubCallbackLoginUserController,
  readInfoUserController,
  forgetPassword,
  verifyToken,
  resetPassword
} from "../controllers/session.controller.js";

const router = Router();

router.post('/register', createUserController); // crea un usuario

router.get('/failRegister', failCreateUserController) // devuelve un error al registrar un usuario

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/failLogin' }), loginUserController, errorLoginUserController); // inicia sesión

router.get('/failLogin', failLoginUserController) // devuelve un error al iniciar sesión

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), githubLoginUserController) // inicia sesión con GitHub

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallbackLoginUserController) // callback de GitHub para iniciar sesión

router.get('/current', readInfoUserController); // devuelve los detalles del usuario actual

router.post('/forget-password', forgetPassword); // Restablece la password para iniciar sesión mediante un mail enviado al correo del usuario ingresado

router.get('/verify-token/:token', verifyToken)

router.post('/reset-password/:user', resetPassword)

export default router;