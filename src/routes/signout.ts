import express from 'express';

const router = express.Router();

// Signout just nulls the session object effectively deleting
// the users session.
router.post('/v1/users/signout', (req, res) => {
    req.session = null;
    res.send({});
});

export {router as signoutRouter };