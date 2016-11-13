var perceptivewellness = angular.module('perceptivewellness', ['ui.router','ui.materialize','firebase']);
var config = {
    apiKey: "AIzaSyB9lOF5xYPNzPJDHy5qcuGz-IRikbaZbxI",
    authDomain: "perceptivewellness.firebaseapp.com",
    databaseURL: "https://perceptivewellness.firebaseio.com",
    storageBucket: "perceptivewellness.appspot.com",
};
perceptivewellness.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html',
            controller: function ($scope ,header,$firebaseObject) {
                var ref = firebase.database().ref('header');
                headerinit.core.initAll();
                $('.parallax').parallax();


                ref.on("value", function(snapshot) {

                $scope.header = snapshot.val();
                $scope.backgrounds = $scope.header.slides.map(function (o) {
                     o.background = {'background-image': 'url("'+o.img+'")'};
                    return o;
                });
                });
            }
        })

      // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'aboutSection@about': {
                    templateUrl: 'partial-about-mystory.html'
                },
            }
            
        })
        .state('about.mytraining', {
            url: '/mytraining',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'aboutSection@about': { templateUrl: 'partial-about-mytraining.html' },

            }
        });

        
});
perceptivewellness.factory("header", ["$firebaseObject",
    function($firebaseObject) {
        // create a reference to the database location where we will store our data
        var ref = firebase.database().ref('header');

        // this uses AngularFire to create the synchronized array
        return $firebaseObject(ref);
    }
]);
perceptivewellness.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});
perceptivewellness.controller('mainCtr',[ '$scope' ,function($scope) {
    // create a three-way binding to our Profile as $scope.profile

    $scope.googleSignin = toggleSignIn;
    $scope.openDropdown= function () {
        $('.dropdown-button').dropdown('open');
    };
    function toggleSignIn() {
        if (!firebase.auth().currentUser) {
            // [START createprovider]
            var provider = new firebase.auth.GoogleAuthProvider();
            // [END createprovider]
            // [START addscopes]
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            // [END addscopes]
            // [START signin]
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info
                var user = result.user;

                alert('yeah I am in');
                $('#modal1').closeModal();
                // [START_EXCLUDE]
                // document.getElementById('quickstart-oauthtoken').textContent = token;
                // [END_EXCLUDE]
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // [START_EXCLUDE]
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    alert('You have already signed up with a different auth provider for that email.');
                    // If you are using multiple auth providers on your app you should handle linking
                    // the user's accounts here.
                } else {
                    console.error(error);
                }
                // [END_EXCLUDE]
            });
            // [END signin]
        } else {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
        // [START_EXCLUDE]
        // document.getElementById('quickstart-sign-in').disabled = true;
        // // [END_EXCLUDE]
    }
    function initApp() {
            // Result from Redirect auth flow.
            // [START getidptoken]
            firebase.auth().getRedirectResult().then(function(result) {
                if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // [START_EXCLUDE]
                    // document.getElementById('quickstart-oauthtoken').textContent = token;
                } else {
                    // document.getElementById('quickstart-oauthtoken').textContent = 'null';
                    // [END_EXCLUDE]
                }
                // The signed-in user info.
                var user = result.user;

                console.log(user);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // [START_EXCLUDE]
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    alert('You have already signed up with a different auth provider for that email.');
                    // If you are using multiple auth providers on your app you should handle linking
                    // the user's accounts here.
                } else {
                    console.error(error);
                }
                // [END_EXCLUDE]
            });
            // [END getidptoken]
            // Listening for auth state changes.
            // [START authstatelistener]
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;
                    // [START_EXCLUDE]
                    // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                    // document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                    // document.getElementById('quickstart-account-details').textContent =
                    console.log(JSON.stringify(user));
                    // [END_EXCLUDE]
                } else {
                    // User is signed out.
                    // [START_EXCLUDE]
                    // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                    // document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
                    // document.getElementById('quickstart-account-details').textContent = 'null';
                    // document.getElementById('quickstart-oauthtoken').textContent = 'null';
                    // [END_EXCLUDE]
                }
                // [START_EXCLUDE]
                // document.getElementById('quickstart-sign-in').disabled = false;
                // [END_EXCLUDE]
            });

    }
    window.onload = function() {
        initApp();
    };
    
    

}]);
perceptivewellness.directive('openModal',openModal);

function openModal(){
    return {
        template: '<a class="waves-effect waves-light" ng-click="signIn()"><i class="fa fa-sign-in fa-2x" aria-hidden="true"></i> Sign in</a>',
        restrict: 'AE',
        scope: {
            options: '=',
            data: '='
        },
        link: function (scope, element, attr, ctrl) {

            scope.signIn = openmodal;

             function openmodal(){
                 
                 $('#modal1').openModal();

             }
            // [START buttoncallback]


        }
    }

}

perceptivewellness.directive('flickity', [function() {
    return {
        restrict: 'E',
        templateUrl: 'flickity.html',
        replace: true,
        scope: { items: '=' },
        link: function(scope, elem, attrs, ctrl) {
            scope.$watch('items', function() {
                elem.flickity({
                    cellAlign: 'center',
                    imagesLoaded: true,
                    wrapAround: false,
                    contain: true
                });
            });
        }
    };
}]);