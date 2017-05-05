'use strict';

const express = require('express');
const router = express.Router();

const util = require('./util');

router.get('/lists', (req, res, next) => {
  console.log('here');
  util.getLists()
    .then((lists) => {
      console.log(lists);
      res.send(lists);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/lists', (req, res, next) => {

});

router.delete('/lists', (req, res, next) => {

});

module.exports = router;
