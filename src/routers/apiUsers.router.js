import { Router } from "express";
import { isAdmin } from '../public/js/authMiddleware.js';
import { apiUsersGetUsers, apiUsersChangeRole, apiUsersUploadDocuments, apiUsersDeleteInactiveUsers, apiUsersDeleteUser } from '../controllers/apiUsers.controller.js'


const router = Router();

router.get('/', isAdmin, apiUsersGetUsers);

router.put('/premium/:uid', isAdmin, apiUsersChangeRole);

router.post('/:uid/documents', apiUsersUploadDocuments);

router.delete('/', isAdmin, apiUsersDeleteInactiveUsers);

router.delete('/:uid', isAdmin, apiUsersDeleteUser);

export default router