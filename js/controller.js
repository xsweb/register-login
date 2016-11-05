/**
 * Created by tuoniao_king on 2016/11/5.
 */
angular.module('userApp',[])
.controller('registerCtrl',['$scope','$window',function($scope,$window){
    $scope.username='';
    $scope.password='';
    $scope.password2='';
    $scope.msg='';
    $scope.agree=false;
    $scope.register=function(){
        if($scope.agree===false){
            return $scope.msg="请同意协议！";
        }
        if(!/^[a-zA-Z0-9_]{3,16}$/.test($scope.username)){
            return $scope.msg="用户名格式不正确！";
        }
        if(!/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test($scope.password)){
            return $scope.msg="密码格式不正确！";
        }
        if($scope.password!==$scope.password2){
            return $scope.msg="两次密码输入不正确！";
        }
        var users=JSON.parse($window.localStorage.getItem('users')||'[]');
        if(users.some(function(user,index){
                return $scope.username===user.username;
            })){
            return $scope.msg='用户名被占用了！';
        }
        users.push({
            username:$scope.username,
            password:$scope.password
        })
        $window.localStorage.setItem('users',JSON.stringify(users));
        $scope.msg='注册成功！';
    }
}])
.controller('loginCtrl',['$scope','$window',function($scope,$window){
    $scope.username='';
    $scope.password='';
    $scope.msg='';
    $scope.login=function(){
        var users=JSON.parse($window.localStorage.getItem('users'));
        if(users.some(function(user,index){
                return user.username===$scope.username&&user.password===$scope.password;
            })){
            return $scope.msg="登陆成功!";
        }
        $scope.msg="用户名或者密码不正确！";
    }
}])