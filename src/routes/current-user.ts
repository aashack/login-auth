import express from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

// Simple endpoint to check if a user is logged in
router.get('/v1/users/currentuser', currentUser, requireAuth, (req, res) => {
    
    res.send(
        { 
            email: req.currentUser?.email || null,
            token: req.session?.jwt || null
        }
    );
});

export {router as currentUserRouter };