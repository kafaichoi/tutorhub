'use strict';

angular.module('services')
  .service('User',
    function($rootScope, $q, $cookieStore, $http, Auth) {
        this.currentUser = Auth.currentUser;

        this.login = function(params) {
            var d = $q.defer();
            $http({
                url: '/users/sign_in',
                method: 'POST',
                data: {
                    user: params
                }
            }).success(function(response) {
                if(response.success) {
                    var user = response.data.user;
                    user.auth_token = response.data.auth_token; // talk about this
                    Auth.setCurrentUser(user);
                    d.resolve(user);
                } else {
                    d.reject(response)
                }
            }).error(function(reason) {
                d.reject(reason);
            });
            return d.promise;
        };
        this.logout = function() {
            var d = $q.defer();
            Auth.removeCurrentUser();
            d.resolve();
            return d.promise;
        };
        this.signup = function(params) {
            var d = $q.defer();
            $http({
                url: '/users',
                method: 'POST',
                data: {
                    user: params
                }
            }).success(function(response) {
                var user = response.data.user;
                user.auth_token = response.data.auth_token; // talk about this
                Auth.setCurrentUser(user);
                d.resolve(user);
            }).error(function(reason) {
                d.reject(reason);
            });
            return d.promise;
        };
    });
