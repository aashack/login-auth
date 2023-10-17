import express from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/v1/users/currentuser', currentUser, requireAuth, (req, res) => {
    res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter };