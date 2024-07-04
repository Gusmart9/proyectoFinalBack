import { Router } from 'express'
import { createSession, success, cancel } from '../controllers/payments.controller.js';

const router = Router()

router.get('/create-checkout-session', createSession) // Realiza el envio de los productos del carrito a Stripe
router.get('/success', success) // Si se realiza la compra
router.get('/cancel', cancel)   // Si se cancela la compra

export default router