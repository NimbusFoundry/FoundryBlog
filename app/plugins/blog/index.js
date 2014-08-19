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
    blog_model = foundry._models.Blog;
    blog_model.onUpdate(function(mode, obj, isLocal){
      if (!isLocal) {
        $scope.load();
        $scope.$apply();
      };
    });

    $scope.load = function(){
        $scope.entries = blog_model.all()
    }

    $scope.delete_todo = function(index){
        var id = $scope.entries[index].id,
            entry =blog_model.findByAttribute('id', id);

        entry.destroy();
        $scope.load();
    }

    $scope.load();
  }]);
}
