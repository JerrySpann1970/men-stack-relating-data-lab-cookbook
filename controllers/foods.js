const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            foods: currentUser.foods,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
});

//post routes
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.foods.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// GET /users/:foods/:foodId
router.get('/:foodId', async (req, res) => {
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        // Find the application by the applicationId supplied from req.params
        const food = currentUser.foods.id(req.params.foodId);
        // Render the show view, passing the application data in the context object
        res.render('foods/show.ejs', {
            food: food,
        });
    } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
    }
});

// DELETE /users/:userId/foods/:foodsId
router.delete('/:foodId', async (req, res) => {
    try {
        // Look up the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        // Use the Mongoose .deleteOne() method to delete
        // an application using the id supplied from req.params
        currentUser.foods.id(req.params.foodId).deleteOne();
        // Save changes to the user
        await currentUser.save();
        // Redirect back to the applications index view
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/');
    }
});

// GET /users/:userId/:foodsId/edit
router.get('/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.foods.id(req.params.foodId);
        res.render('foods/edit.ejs', {
            food: food,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// PUT /users/:userId/foods/:foodId
router.put('/:foodId', async (req, res) => {
    try {
        // Find the user from req.session
        const currentUser = await User.findById(req.session.user._id);
        // Find the current application from the id supplied by req.params
        const food = currentUser.foods.id(req.foodId);
        // Use the Mongoose .set() method
        // this method updates the current application to reflect the new form
        // data on `req.body`
        food.set(req.body);
        // Save the current user
        await currentUser.save();
        // Redirect back to the show view of the current application
        res.redirect(
            `/users/${currentUser._id}/foods/${req.params.foodId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
