import {Router} from 'express'
import { getAllMessagesController } from '@/controllers';

export const router = Router();

router.get('/', getAllMessagesController);