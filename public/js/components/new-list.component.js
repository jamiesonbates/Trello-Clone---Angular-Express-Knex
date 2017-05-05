(function() {
  'use strict';

  angular.module('app')
    .component('newList', {
      controller,
      bindings: {
        addList: '&'
      },
      template: `
        <div class="new-list">
          <form>
            <input type="text" name="title" ng-model="$ctrl.listTitle" placeholder="Create a list" autocomplete="off" wrap="soft">
            <button type="button" ng-click="$ctrl.addList({ title: $ctrl.listTitle }); $ctrl.listTitle = ''" class="btn list-btn">Create</button>
          </form>
        </div>
      `
    })

    function controller() {
      const vm = this;

      vm.$onInit = function() {
        vm.listTitle = '';
      }
    }
})();
