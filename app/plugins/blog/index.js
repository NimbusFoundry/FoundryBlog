define('Blog', function(){
  return {
    title : 'Blog', // this will shown as the menu title
    name : 'Blog', // Foundry will add an object with this name, so you can access with it.
    type : 'plugin',
    anchor : '#/Blog', // this property is for angular route
    icon : 'icon-list',
    init : function(){
      // a basic method for foundry to init your plugin
      // we will setup a model here
      var self = this;
      foundry.model('Entry', ['title','content'], function(model){
        foundry.initialized(self.name);
      });
    },
    inited : function(){ 
       // inited is an optinal method
       define_controller();
    }
  } 
});

// maybe some code for angular controller
function define_controller(){
  angular.module('foundry').controller('BlogController', ['$scope', function($scope){
    $scope.entries = [];
    // get a reference with the model we registered above
    blog_model = foundry._models.Entry;
    blog_model.onUpdate(function(mode, obj, isLocal){
      if (!isLocal) {
        $scope.load();
        $scope.$apply();
      };
    });

    // config object
    $scope.blog_config = {
      fields : {
         title : {
           type : 'input',
           label : 'Title'
         },
         content : {
           type : 'input',
           label : 'Content'
         }
      },
      create : "create()",
      update : "update()"
    };

    $scope.entry_data = {
      title : '',
      content : ''
    };
    $scope.mode = 'create';

    $scope.load = function(){
        $scope.entries = blog_model.all()
    }

    $scope.show_create = function(){
      $scope.entry_data = {};
      $scope.mode = 'create';
      $('.create').modal('show')
    }

    $scope.create = function(){
      if ($scope.entry_data.title) {
        blog_model.create($scope.entry_data)
        $scope.load();
        // body...
        $('.modal').modal('hide');
      };
    }

    $scope.clear = function(){
      $scope.entry_data = {};
      $('.modal').modal('hide');
    }

    $scope.show_edit = function(blog){
      $scope.entry_data = blog;
      $scope.mode = 'edit';
      $('.create').modal('show');

    };

    $scope.update = function(){
      // body...
      var entry = blog_model.findByAttribute('id', $scope.entry_data.id);
      entry.updateAttributes($scope.entry_data);
      $scope.load();

      $('.modal').modal('hide');
    }

    $scope.delete_entry = function(index){
        var id = $scope.entries[index].id,
            entry =blog_model.findByAttribute('id', id);

        entry.destroy();
        $scope.load();
    }

    $scope.load();
  }]);
}
