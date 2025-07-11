import express from 'express';
import User from '../models/user.js';
import auth from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000, // 1 MB
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(gif|jpg|jpeg|png)$/)) {
            return callback(new Error('Please upload a GIF, JPG, JPEG, or PNG file'));
        }
        callback(undefined, true);
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login a user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Log out a user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Log out all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get the current user
router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update user account
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        const invalidFields = updates.filter((update) => !allowedUpdates.includes(update));
        return res.status(400).send({ error: 'The following fields are not allowed to be updated: ' + invalidFields.join(', ') });
    }

    try {
        const user = req.user;
        updates.forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Upload avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.status(200).send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

// Delete user account
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;