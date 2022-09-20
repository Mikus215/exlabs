import express from 'express'
import { postCreateUser, postLoginUser, deleteCookie } from '../controllers/userController.js'
import { getUsers, getUser, deleteUser, postCreateRoleUser, updateUser } from '../controllers/userRoleController.js'
import { cookieJwtAuth } from '../middleware/cookieJwtAuth.js'

const router = express.Router()

router.post('/register', postCreateUser)
router.post('/login', postLoginUser)
router.get('/logout', deleteCookie)
router.get('/users',cookieJwtAuth ,getUsers)
router.get('/user/:id',cookieJwtAuth ,getUser)
router.delete('/user/:id',cookieJwtAuth ,deleteUser)
router.post('/user',cookieJwtAuth ,postCreateRoleUser)
router.patch('/user/:id',cookieJwtAuth ,updateUser)

export default router