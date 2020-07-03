const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    employee = require('../models/employee'),
    permissions = require('../permissions');

router.route('/')
    .get((req, res) => {
        res.sendFile('/workspace/personal/Github/CRUD app with mongodb, expressJs, pug & nodeJs/app/views/login.html')
        //res.render('login')
    })
    .post(passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
        employee.findOne({ username: req.body.username }, (err, person) => {
            if (err) throw err
            res.redirect(permissions[person.role].homepage)
        })
    })

module.exports = router;