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

  controller.$inject = ['listsService', 'tasksService'];
  function controller(listsService, tasksService) {
    const vm = this;

    vm.$onInit = function() {
      listsService.getLists()
        .then((lists) => {
          vm.lists = lists;
        });
    }

    vm.addList = function(title) {
      listsService.postLists(title)
        .then(() => {
          return listsService.getLists();
        })
        .then((lists) => {
          vm.lists = lists;
        });
    }

    vm.deleteList = function(listId) {
      listsService.deleteLists(listId)
        .then(() => {
          return listsService.getLists();
        })
        .then((lists) => {
          vm.lists = lists;
        });
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
