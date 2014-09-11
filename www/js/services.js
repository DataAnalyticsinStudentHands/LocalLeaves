var plantServices = angular.module('localServicesModule', ['restangular']);
plantServices.factory('localLeavesUserService', ['Restangular', '$q', '$filter', function(Restangular, $q, $filter) {
    var allUsers;
    var promAllUsers;
    var myUser;
    var updating;
    return {
        updateUsers:
            //ACCESSES SERVER AND UPDATES THE LIST OF USERS
            function(update) {
                if(update || (!allUsers && !updating)) {
                    promAllUsers = Restangular.all("users").getList();
                    updating = true;
                    promAllUsers.then(function(success) {
                        updating = false;
                        success = Restangular.stripRestangular(success);
                        allUsers = success;
                    }, function(fail) {
                        
                    });
                    return promAllUsers;
                } else if(updating) {
                    return promAllUsers;
                } else {
                    var defer = $q.defer();
                    defer.resolve("DONE");
                    return defer.promise;
                }
            },
        getAllUsers: 
            function() {
                return this.updateUsers().then(function(success) {
                    return allUsers;
                });
            },
        getMyUser:
            function() {
                return Restangular.all("users").all("myUser").getList();
            },
        getUser:
            function(user_id) {
                return this.updateUsers().then(function(success) {
                    return $filter('getById')(allUsers, user_id);
                });
            },
        addUser:
            function(user) {
                return Restangular.all("users").post(user);
            },
        editUser:
            function(id, user) {
                 return Restangular.all("users").all(id).post(user);
            },
        deleteUser:
            function(uid) {
                return Restangular.all("users").all(uid).remove();
            },
    }
}]);
plantServices.factory('localLeavesCommentService', ['Restangular', '$q', 'localLeavesUserService', function(Restangular, $q, localLeavesUserService) {
    var allComments = [];
    var allCommentsPlain = [];
    var myPostComments = [];
    var metaComments = [];
    var refresh = true;
    return {
        getPostCommentsPromise:
            function(numComments, startindex, pid) {
                var promAll = Restangular.all("comments").getList({"numberOfComments": numComments, "startIndex": startindex, "post_id": pid});
                return promAll.then(function(success) {
                    success = Restangular.stripRestangular(success);
                    allCommentsPlain = success;
//                    console.log(allCommentsPlain);
                    var resultComments = [];
                    success.forEach(function(comment) {
                        comment.time =   new Date(comment.creation_timestamp).toDateString() + " " + new Date(comment.creation_timestamp).toLocaleTimeString().replace(/:\d{2}\s/,' ');
                        vmaUserService.getUser(comment.user_id).then(function(success) { comment.user = success;});
                        comment.img = "img/temp_icon.png";
//                        console.log(comment);
                        resultComments.push(comment);
                    });
                    return resultComments;
                }, function(fail) {
                    
                });
             },
        getPostCommentsPlain:
            function(numComments, startindex, pid) {
                return Restangular.all("comments").getList({"numberOfComments": numComments, "startIndex": startindex, "post_id": pid});
            },
        getPostComments:
            function(num, ind, pid) {
                return this.getPostCommentsPromise(num, ind, pid).then(function(success) {
                    return success;
                });
            },
        getComment:
            function(comment_id) {
                return Restangular.all("comments").get(comment_id);
            },
        addComment:
            function(content, pid, uid) {
                var cmt = {"content" : content, "user_id": uid, "post_id": pid};
                console.log(cmt);
                return Restangular.all("comments").post(cmt);
            },
        editComment:
            function(id, comment) {
                 return Restangular.all("comments").all(id).post(comment);
            },
        deleteComment:
            function(cid) {
                return Restangular.all("comments").all(cid).remove();
            },
    }
}]);
plantServices.service('plantObjectModel', ['$http', function($http) {
    var fanType = []; //???
    var dataIcons = [];
    var srchResults = [];
    //not sure - I'm nesting them so that the search results always go top
/*    $http.get('js/search.json').success(function(data) {
        for (var key in data[0]) {
            dataIcons.push(key)
            dataIcons[key] = data[0][key]
        };
    });*/
    //this.fanType = fanType;
    this.dataIcons = dataIcons;
    $http.get('js/results.json').success(function(data) {
        for (var key in data[0]) {
            dataIcons.push(key)
            dataIcons[key] = data[0][key]
        };
        $http.get('js/search.json').success(function(data) {
            for (var key in data[0]) {
                dataIcons.push(key)
                dataIcons[key] = data[0][key]
            };
        });
    });
    //this.srchResults = srchResults;
    
//    $http({method: 'get', url:'json/searchIcons.json'})
//        .success(function(data, status, headers, config) {
//                //searchIcons = data
//            var searchIcons = data;
//        return  searchIcons
//                //this.searchIcons = searchIcons;
//    })
//    .error(function(data, status, headers, config){
//        alert(data);
//    });
    //can't figure out how to get it to set the value on searchIcons!!!
    
    this.localStorageSet = function(gardenObject) { 
        localStorage.setItem('gardenObject' + gardenObject.id, JSON.stringify(gardenObject));
        //return this.localStorageGetAll();
    },
    this.localStorageGet = function(index) {
        return JSON.parse(localStorage.getItem('gardenObject' + index));
    },
    this.localStorageGetAll = function() {
        console.log('in the service');
        var gardenObjects = [];
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).indexOf('gardenObject') !== -1) {
                    var gardenObject = localStorage.getItem(localStorage.key(i));
                    gardenObjects.push(JSON.parse(gardenObject));
                }
            }
        console.log(gardenObjects.length);
        return gardenObjects;
    };
    
}]);
