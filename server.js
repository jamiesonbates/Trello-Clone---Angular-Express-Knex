'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const knex = require('./knex');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser());
app.use(morgan('dev'));
app.disable('x-powered-by');

app.use(express.static(path.join('public')));

app.get('/', (req, res, next) => {
  getLists()
    .then((lists) => {
      res.render('home', { lists });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

app.post('/', (req, res, next) => {
  const list_id = req.body.listId;
  const task = req.body.task;

  knex('tasks')
    .insert({ list_id, task })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    })
});

app.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const task = req.body.task;

  knex('tasks')
    .update('task', task)
    .where('id', id)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
});

app.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('tasks')
    .del()
    .where('id', id)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
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
