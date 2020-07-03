const { Employee } = require('../permissions');

const express = require('express'),
    router = express.Router(),
    administrator = require('../models/administrator'),
    employee = require('../models/employee');

router.route('/administrator')
    .get((req, res) => {
        res.sendFile('/workspace/personal/Github/CRUD app with mongodb, expressJs, pug & nodeJs/app/views/regEmployee.html')
        //res.render('regEmployeee', { success: false })
    })
    .post((req, res) => {
        const b = new administrator({
            username: 'Anabel',
            password: '1234',
            role: 'Administrator'})

        administrator.register(b, b.password, (err) =>{
            if(err) throw err
        })
        res.redirect('/login')
    })

router.route('/employee')
    .get((req, res) => {
        res.sendFile('/workspace/personal/Github/CRUD app with mongodb, expressJs, pug & nodeJs/app/views/regCustomer.html')
        //res.render('regCustomer', { success: false })
    })
    .post((req, res) => {
        res.render('/employee', { success: true })
    })

module.exports = router;