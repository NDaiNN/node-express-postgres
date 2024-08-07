const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  knex("tasks")
    .select("*")
    .then(function (results) {
      res.render('index', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

router.post('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const todo = req.body.add;
  knex("tasks")
    .insert({user_id: 1, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});


router.post('/complete/:id', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const taskId = req.params.id;
  knex("tasks")
    .where({ id: taskId })
    .update({ completed: true })
    .then(function () {
      res.redirect('/');
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});


router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;