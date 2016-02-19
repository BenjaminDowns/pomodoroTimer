angular.module('myApp', []).controller('MainCtrl', ['$scope', '$interval', function($scope, $interval) {

    $scope.deadline = null
    $scope.breakTime;
    $scope.workTime;
    $scope.work = false;
    $scope.time;
    $scope.running = false;
    $scope.minutes = '00'
    $scope.seconds = '00'

    $scope.toggleWork = function() {
        $scope.work = !$scope.work
    }

    $scope.runClock = function(time) {
        if ($scope.running) { $interval.cancel($scope.countdown) };
        var time = time * 60
        time % 60 === 0 ? $scope.seconds = "00" : $scope.seconds = time % 60
        $scope.minutes = Math.floor(time / 60)
        $scope.countdown = $interval(function() {
            $scope.running = true;
            if (time <= 0) {
              $scope.stopTimer()
              $scope.toggleWork()
              return
            } 
            time--
            time % 60 === 0 ? $scope.seconds = "00" : $scope.seconds = time % 60
            $scope.seconds < 10 ? $scope.seconds = "0" + $scope.seconds : null
            $scope.minutes = Math.floor(time / 60)
            $scope.minutes < 10 ? $scope.minutes = "0" + $scope.minutes : null
        }, 1000)

    }

    $scope.stopTimer = function() {
        $interval.cancel($scope.countdown)
        $scope.running = !$scope.running
    }

    $scope.startTimer = function(workTime, breakTime) {
        workTime == undefined ? workTime = 30 : workTime = workTime
        breakTime == undefined ? breakTime = 15 : breakTime = breakTime
        $scope.work ? $scope.runClock(workTime) : $scope.runClock(breakTime)
    }
}]);