angular.module('irinasTailoring', []);

var reviewListCtrl = function ($scope) {
  $scope.data = {
    reviews: [{
      name: 'Test Name',
      date: '',
      email: 'test@name.blah',
      review: 'test review'
    }, {
      name: 'Test Name 2',
      date: '',
      email: 'test@name.blah 2',
      review: 'test review2'
    }]
  };
};


angular.module('irinasTailoring').controller('reviewListCtrl', reviewListCtrl);
