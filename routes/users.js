const express = require('express');
const {
  addNewUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../services/usersService");
const { generateAccessToken, verifyAccessToken } = require("../config/jwt");
const UserBook = require('../models/UserBook'); 
 

const router = express.Router();

let jwtMiddleware = async function (req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        try {
            const payload = await verifyAccessToken(bearerToken);
            const user = await getUserByEmail(req, payload.email);

            if (user) {
                req.user = user;
                next();
            } else {
                res.sendStatus(403);
            }

        } catch (err) {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
};

router.post('/auth/signin', async (req, res, next) => {
    try {
        const { password, email } = req.body;

        const user = await getUserByEmail(req, email);

        if (!user) {
            return res.status(401).json({ message: 'No user found with this email' });
        }

        const validPassword = user.password === password;

        if (!validPassword) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }

        const token = generateAccessToken(user.email);
        return res.json({ token });
    } catch (error) {
        next(error);
    }
});

router.post('/users', async (req, res, next) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).send('Name, email, and password are required');
    }
  
    if (name.length === 0 || password.length === 0 || email.length === 0) {
      return res.status(400).send('Name, email, and password cannot be empty');
    }
  
    try {
     
      const user = await addNewUser(req, name, email, password);
      console.log(`User created: ${user}`);
      return res.status(201).json({ message: "User created successfully", user });
    } catch (e) {
      console.error(`Error in POST /users: ${e.message}`);
      return res.status(500).json({ message: "Error creating user", error: e.message });
    }
  });
  

router.get('/users/:id', async (req, res, next) => {
    try {
        const user = await getUserById(req);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.get('/users', async (req, res, next) => {
    try {
        const users = await getAllUsers(req);
        return res.json(users);
    } catch (error) {
        next(error);
    }
});

router.delete('/users/:id', jwtMiddleware, async (req, res, next) => {
    try {
        const deletedUser = await deleteUser(req);

        res.json(deletedUser);
    } catch (error) {
        next(error);
    }
});

router.put('/users/:id', jwtMiddleware, async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const updatedUser = await updateUser(req, name, email, password);

        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});


router.get('/book-activity/:userId', jwtMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    
    const userBooks = await UserBook.find({ userId }).populate('bookId');
    
    res.status(200).json(userBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user book activity', error: error.message });
  }
});

router.use(function (err, req, res, next) {
    res.status(500).json({ error: err.message });
});

module.exports = router;
