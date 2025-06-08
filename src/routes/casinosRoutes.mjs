import express from 'express';
import { listAllCasinos, findById, addCasino } from '../controllers/casinosController.mjs';

const router = express.Router();


router.route('/').get(listAllCasinos).post(addCasino);
router.route( '/:id' ).get(findById);




export default router;