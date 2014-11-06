/**
 * Frames JavaScript
 *
 * @author kteraguchi@commonsnet.org (Kohei Teraguchi)
 * @link http://www.netcommons.org NetCommons Project
 * @license http://www.netcommons.org/license.txt NetCommons License
 */

// * @copyright Copyright 2014, NetCommons Project
// Invalid JsDoc tag: copyright

NetCommonsApp.requires.push('dialogs.main');
NetCommonsApp.controller('FramesController', function($scope, $http, dialogs) {

  /**
   * scope values
   */
  $scope.deleted = false;

  /**
   * @param {number} frameId
   * @return {void}
   */
  $scope.delete = function(frameId) {
    var message = 'Do you want to delete the frame?<br />' +
                  '(It should use defined language.)';
    dialogs.confirm(undefined, message)
      .result.then(
        function(yes) {
          var url = '/frames/frames/' + frameId.toString();
          var data = {
            id:$('#frameForm' + frameId + ' input[name="data[id]"]').val(),
            _Token:{
              key:$('#frameForm' + frameId + ' input[name="data[_Token][key]"]').val(),
              fields:$('#frameForm' + frameId + ' input[name="data[_Token][fields]"]').val(),
              unlocked:$('#frameForm' + frameId + ' input[name="data[_Token][unlocked]"]').val()
            }
          };
          var config = {
            data:data,
            headers: {"Content-Type": "application/json"}
          };
          $http.delete(url, config)
            .success(function(data, status, headers, config) {
                $scope.deleted = true;
              })
            .error(function(data, status, headers, config) {
                alert(status);  // It should be error code
              });
        });
  };
});
