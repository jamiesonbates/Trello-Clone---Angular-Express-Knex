'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const knex = require('../knex');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));

app.use('*', (req, res, next) => {
  res.sendFile('index.html', { root: path.join(__dirname, '..', 'public')});
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

function getTasks(list) {
  const promise = new Promise((resolve, reject) => {
    knex('tasks')
    .where('list_id', list.id)
    .orderBy('id')
    .returning('*')
    .then((tasks) => {
      const listObj = {
        id: list.id,
        title: list.title,
        tasks
      }

      resolve(listObj);
    });
  });

  return promise;
}

function getLists() {
  return knex('lists')
    .returning('*')
    .then((lists) => {
      const promises = [];

      for (const list of lists) {
        promises.push(getTasks(list));
      }

      return Promise.all(promises);
    })
    .then((lists) => {
      return lists;
    })
}


module.exports = app;
