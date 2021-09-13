import { Router } from 'express'
import ChannelsController from '@controllers/channels.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const path = '/channels'
const router = Router()
const channelsController = new ChannelsController()

router.post('/createChannel', authMiddleware, channelsController.createChannel)
router.post('/getAllChannels', authMiddleware, channelsController.getAllChannels)
router.post('/getChannels', authMiddleware, channelsController.getChannels)
router.get('/getChannelById/:channelId(\\d+)', authMiddleware, channelsController.getChannelById)
router.put('/updateChannel/:channelId(\\d+)', authMiddleware, channelsController.updateChannel)
router.delete('/deleteChannel/:channelId(\\d+)', authMiddleware, channelsController.deleteChannel)

export default { path, router }
