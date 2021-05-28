angular.module('irinasTailoring', []);


var reviewListCtrl = function ($scope, reviewData) {
  $scope.message = "Searching for reviews...";
  //alert('hi');
  // MEAN textbook suggests using reviewData.success(...).error(...);
  // but I had no luck with it. Is it deprecated or something?
  // found .then(...) from W3Schools article on Angular and it works
  reviewData.then(function(data) {
      $scope.message = data.data.length > 0 ? "" : "No reviews found";
      $scope.data = { reviews: data.data };
    }, function(e) {
      //handle err
      $scope.message = "Sorry, something's gone wrong";
      //console.log(e); I don't think the console.log functionality works here
    });
};

var reviewData = function ($http) {
  return $http.get('/api/reviews');
};

angular
  .module('irinasTailoring')
  .controller('reviewListCtrl', reviewListCtrl)
  .service('reviewData', reviewData);
