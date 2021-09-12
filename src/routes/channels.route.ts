import { Router } from 'express'
import ChannelsController from '@controllers/channels.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const path = '/channels'
const router = Router()
const channelsController = new ChannelsController()

// router.post('/', channelsController.createChannel)
router.get('/getChannels', authMiddleware, channelsController.getChannels)
router.get('/getChannelById/:id(\\d+)', channelsController.getChannelById)
router.put('/updateChannel/:id(\\d+)', channelsController.updateChannel)
router.delete('/deleteChannel/:id(\\d+)', channelsController.deleteChannel)

export default { path, router }
