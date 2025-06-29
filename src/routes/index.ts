import {Router} from 'express'
import { indexController } from '@/controllers'

export const router = Router()

router.get('/', indexController)