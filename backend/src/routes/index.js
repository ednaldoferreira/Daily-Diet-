import { Router } from 'express'
import { authUser } from '../middlewares/authUser.js'
import * as users from '../controllers/usersController.js'
import * as meals from '../controllers/mealsController.js'
import * as metrics from '../controllers/metricsController.js'

const router = Router()

// Rotas públicas
router.post('/users', users.create)
router.post('/sessions', users.createSession)

// Rotas protegidas: exigem o header x-user-id
router.use(authUser)

router.get('/users/me', users.me)

router.post('/meals', meals.create)
router.get('/meals', meals.index)
router.get('/meals/:id', meals.show)
router.put('/meals/:id', meals.update)
router.delete('/meals/:id', meals.destroy)

router.get('/metrics', metrics.show)

export default router
