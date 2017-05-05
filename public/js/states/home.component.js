(function() {
  'use strict';

  angular.module('app')
    .component('home', {
      controller,
      template: `
        <header>
          <h1>ToDoly</h1>
        </header>

        <main>
          <new-list add-list="$ctrl.addList(title)"></new-list>

          <div class="all-lists">
            <div class="list" ng-repeat="list in $ctrl.lists">
              <list
                list=list
                delete-list="$ctrl.deleteList(listId)"
                delete-task="$ctrl.deleteTask(listId, taskId)"
                add-task="$ctrl.addTask(listId, addition)"
                update-task="$ctrl.updateTask(listId, taskId, update)">
              </list>
            </div>
          </div>
        </main>
      `
    });

  function controller() {
    const vm = this;

    vm.$onInit = function() {
      vm.lists = [{
          id: 1,
          title: 'My List',
          tasks: [{ id: 1, name: 'Do your homework' }, { id: 2, name: 'Go to school' }, { id: 3, name: 'Eat dinner'}, { id: 4, name: 'Go to the gym' }, { id: 5, name: 'Write in journal' }]
        },
        {
          id: 2,
          title: 'Your List',
          tasks: [{ id: 1, name: 'Go shopping' }, { id: 2, name: 'Go to soccer game' }]
      }];
    }

    vm.addList = function(title) {
      const nextLists = vm.lists;

      nextLists.push({ id: vm.lists.length + 1, title, tasks: [] });

      vm.lists = nextLists;
    }

    vm.deleteList = function(listId) {
      const nextLists = [];

      for (const list of vm.lists) {
        if (list.id !== listId) {
          nextLists.push({
            id: nextLists.length + 1,
            title: list.title,
            tasks: list.tasks
          });
        }

      }

      vm.lists = nextLists;
    }

    vm.deleteTask = function(listId, taskId) {
      const nextLists = [];
      const nextTasks = [];

      for (const list of vm.lists) {
        if (list.id === listId) {
          for (const task of list.tasks) {
            if (task.id !== taskId) {
              nextTasks.push({
                id: nextTasks.length + 1,
                name: task.name
              });
            }

          }

          list.tasks = nextTasks;
        }

        nextLists.push(list);
      }

      vm.lists = nextLists
    }

    vm.updateTask = function(listId, taskId, update) {
      const nextLists = [];
      const nextTasks = [];

      for (const list of vm.lists) {
        if (list.id === listId) {
          for (const task of list.tasks) {
            if (task.id === taskId) {
              task.name = update;
            }

            nextTasks.push(task);
          }

          list.tasks = nextTasks;
        }

        nextLists.push(list);
      }

      vm.lists = nextLists;
    }

    vm.addTask = function(listId, addition) {
      const nextLists = [];

      for (const list of vm.lists) {
        if (list.id === listId) {
          list.tasks.push({
            id: list.tasks.length + 1,
            name: addition
          })
        }

        nextLists.push(list);
      }

      vm.lists = nextLists;
    }
  }
})();
