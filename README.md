FoundryBlog
========

This is a demo project for this tutorial: [http://nimbusfoundry.com/modeldoc.html](http://nimbusfoundry.com/modeldoc.html).

# How to do it?

#### Clone the start branch

Clone the repository to a local folder, then checkout the start branch.

``` 
git clone git://github.com/NimbusFoundry/FoundryBlog
cd FoundryBlog && git checkout start
```

#### Add the html and javascript code

You can follow the tutorial to do this.

 ``` javascript
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
}

$scope.entry_data = {};
$scope.mode='create';
 ```

 Also the html part.

 ```
<div class="create modal fade nimbus_form_modal large-modal">
  <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-hidden="true" ng-click="clear()">
            &times;
          </button>
          <h4 class="modal-title">Blog entry</h4>
        </div>
        <div class="modal-body">
          <model-form model-name="blog_config" form-mode="mode" instance-name="entry_data"></model-form>
        </div>
      </div>
  </div>
</div>
 ```
####Setup angular controller
```
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
```

# Support

If you have any question about this framework, you can feel free to conatct us directly via admin#nimbusfoundry.com (replace the # with @)