angular.module('app.controllers', [])

  .controller('homeCtrl', ['$scope', '$stateParams', '$location', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

      var seconds;
      var temp;
      console.clear()

      function countdown() {
        time = document.getElementById('countdown').innerHTML;
        timeArray = time.split(':')
        seconds = timeToSeconds(timeArray);
        if (seconds == '') {
          temp = document.getElementById('countdown');
          temp.innerHTML = "00:00";
          return;
        }
        seconds--;
        temp = document.getElementById('countdown');
        temp.innerHTML = secondsToTime(seconds);
        timeoutMyOswego = setTimeout(countdown, 1000);

      }

      function timeToSeconds(timeArray) {
        var minutes = (timeArray[0] * 1);
        var seconds = (minutes * 60) + (timeArray[1] * 1);
        return seconds;
      }

      function secondsToTime(secs) {
        var hours = Math.floor(secs / (60 * 60));
        hours = hours < 10 ? '0' + hours : hours;
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        seconds = seconds < 10 ? '0' + seconds : seconds;


        return minutes + ':' + seconds;
        //hours + ':' + 

      }
      countdown();
      // $scope.countries = {

      //   'USA': {
      //     'Alabama': ['Montgomery', 'Birmingham'],
      //     'California': ['Sacramento', 'Fremont'],
      //     'Illinois': ['Springfield', 'Chicago']
      //   },
      //   'India': {
      //     'Maharashtra': ['Pune', 'Mumbai', 'Nagpur', 'Akola'],
      //     'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur'],
      //     'Rajasthan': ['Jaipur', 'Ajmer', 'Jodhpur']
      //   },
      //   'Australia': {
      //     'New South Wales': ['Sydney'],
      //     'Victoria': ['Melbourne']
      //   }
      // };


    }
  ])

  .controller('myPetsCtrl', ['$scope', '$stateParams', '$location', '$http', '$rootScope', 'sharedUtils', '$state', '$firebase', '$firebaseObject', '$firebaseArray', '$ionicHistory', 'fireBaseData', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location, $http, $rootScope, sharedUtils, $state, $firebase, $firebaseObject, $firebaseArray, $ionicHistory, fireBaseData, $ionicPopup) {

      $rootScope.extras = true;

      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          $scope.mypets = $firebaseArray(fireBaseData.refUser().child(user.uid).child("pets"));
          // $scope.user_extras = $firebaseObject(fireBaseData.refUser().child(user.uid));
          $scope.user_info = user;

          $scope.speciess = [
              "Feline",
              "Canine",
              "Other"
            ],

            $scope.genders = [
              "Female",
              "Female Spayed",
              "Male",
              "Male Neutered",
              "Unknown"
            ],


            $scope.data = { name: '', birthdate: '', species: '', gender: '', weight: '', addcomments: '' },

            $scope.$apply();

          sharedUtils.hideLoading();

        }

      });

      $scope.addpet = function() {
        debugger;
        $scope.mypets.$addpet($scope.data);
        $scope.data = { name: '', birthdate: '', species: '', gender: '', weight: '', addcomments: '' }

      }

    }
  ])

  .controller('notificationsCtrl', ['$scope', '$stateParams', '$location', '$http', '$rootScope', '$firebase', 'fireBaseData', '$firebaseObject', '$ionicPopup', '$state', '$window', '$firebaseArray', 'sharedUtils', '$cordovaImagePicker', '$cordovaFile', '$ionicPlatform', '$q', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location, $http, $rootScope, $firebase, fireBaseData, $firebaseObject, $ionicPopup, $state, $window, $firebaseArray, sharedUtils, $cordovaImagePicker, $cordovaFile, $ionicPlatform, $q, $timeout) {

      $rootScope.extras = true;

      //Shows loading bar
      //sharedUtils.showLoading();

      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          firebase.database().ref('assets').on('value', function(_snapshot) {

            // need to reset array each time
            var result = [];

            // loop through the snapshot to get the objects
            // to display in the list
            _snapshot.forEach(function(childSnapshot) {
              // get key & data...
              // var element = Object.assign({ id: childSnapshot.key }, childSnapshot.val());
              var element = childSnapshot.val();
              element.id = childSnapshot.key;

              // add to array object
              result.push(element);
            });
            $timeout(function() {
              $scope.assetCollection = result;
            }, 2);
          })
        }
      })

    }
  ])

  .controller('menuCtrl', ['$scope', '$stateParams', '$location', '$http', '$rootScope', 'sharedUtils', '$ionicHistory', '$state', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location, $http, $rootScope, sharedUtils, $ionicHistory, $state, $ionicSideMenuDelegate) {

      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $scope.user_info = user; //Saves data to user_info
        } else {

          // If the user is not logged in
          $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
          $ionicSideMenuDelegate.canDragContent(false); // To remove the sidemenu white space

          $ionicHistory.nextViewOptions({
            historyRoot: true
          });
          $rootScope.extras = false;
          sharedUtils.hideLoading();
          $state.go('menu.login', {}, { location: "replace" });

        }
      });

      // On Loggin in to menu page, the sideMenu drag state is set to true
      $ionicSideMenuDelegate.canDragContent(true);
      $rootScope.extras = true;

      // When user visits A-> B -> C -> A and clicks back, he will close the app instead of back linking
      $scope.$on('$ionicView.enter', function(ev) {
        if (ev.targetScope !== $scope) {
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache();
        }
      });


      $scope.logout = function() {

        sharedUtils.showLoading();

        // Main Firebase logout
        firebase.auth().signOut().then(function() {


          $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
          $ionicSideMenuDelegate.canDragContent(false); // To remove the sidemenu white space

          $ionicHistory.nextViewOptions({
            historyRoot: true
          });


          $rootScope.extras = false;
          sharedUtils.hideLoading();
          $state.go('menu.login', {}, { location: "replace" });

        }, function(error) {
          sharedUtils.showAlert("Error", "Logout Failed")
        });

      }
    }
  ])

  .controller('loginCtrl', ['$scope', '$stateParams', '$location', '$http', '$rootScope', '$firebaseAuth', '$ionicSideMenuDelegate', '$ionicHistory', 'sharedUtils', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location, $http, $rootScope, $firebaseAuth, $ionicSideMenuDelegate, $ionicHistory, sharedUtils, $state) {

      $rootScope.extras = false; // For hiding the side bar and nav icon

      // When the user logs out and reaches login page,
      // we clear all the history and cache to prevent back link
      $scope.$on('$ionicView.enter', function(ev) {
        if (ev.targetScope !== $scope) {
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache();
        }
      });


      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          //Removes back link to login page
          $ionicHistory.nextViewOptions({
            historyRoot: true
          });
          $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
          $rootScope.extras = true;
          sharedUtils.hideLoading();
          $state.go('menu.home', {}, { location: "replace" });

        }
      });


      $scope.loginEmail = function(formName, cred) {


        if (formName.$valid) { // Check if the form data is valid or not

          sharedUtils.showLoading(); //starts the loading popup

          //Email Login via Firebase
          firebase.auth().signInWithEmailAndPassword(cred.email, cred.password).then(function(result) {

              // You dont need to save the users session in your local session or cookies. Firebase handles it.

              // You only need to :
              // 1. clear the login page history from the history stack so that you cant come back
              // 2. Set rootScope.extra;
              // 3. Turn off the loading
              // 4. Got to menu page


              $ionicHistory.nextViewOptions({
                historyRoot: true //1
              });
              $rootScope.extras = true; //2
              sharedUtils.hideLoading(); //3
              $state.go('menu.home', {}, { location: "replace" }); //4

            },
            function(error) {
              sharedUtils.hideLoading();
              sharedUtils.showAlert("Please note", "Authentication Error");
            }
          );

        } else {
          sharedUtils.showAlert("Please note", "Entered data is not valid");
        }



      };


      $scope.loginFb = function() {
        //Facebook Login
        var ref = new Firebase('https://vetnical-43fd7.firebaseio.com');
        var authObject = $firebaseAuth(ref);

        authObject.$authWithOAuthPopup('facebook').then(function(authData) {

          console.log(authData);
        }).catch(function(error) {
          console.log('error' + error)

        })

      };

      $scope.loginGmail = function() {
        //Gmail Login
      };

    }
  ])

  .controller('signupCtrl', ['$scope', '$rootScope', 'sharedUtils', '$ionicSideMenuDelegate', '$state', 'fireBaseData', '$ionicHistory', // The following is the constructor function for this pages controller.See https: //docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, sharedUtils, $ionicSideMenuDelegate, $state, fireBaseData, $ionicHistory) {

      $rootScope.extras = false; // For hiding the side bar and nav icon

      $scope.signupEmail = function(formName, cred) {

        if (formName.$valid) { // Check if the form data is valid or not

          sharedUtils.showLoading();

          //Main Firebase Authentication part
          firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function(result) {

            //Add name and default dp to the Autherisation table
            result.updateProfile({
              displayName: cred.name
            }).then(function() {}, function(error) {});

            //Add phone number to the user table
            fireBaseData.refUser().child(result.uid).set({
              telephone: cred.phone
            });
            debugger;
            //Registered OK
            $ionicHistory.nextViewOptions({
              historyRoot: true
            });
            $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
            $rootScope.extras = true;
            sharedUtils.hideLoading();
            $state.go('menu.home', {}, { location: "replace" });

          }, function(error) {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Please note", "Sign up Error");
          });

        } else {
          sharedUtils.showAlert("Please note", "Entered data is not valid");
        }

      }

    }

  ])


  .controller('addAPetCtrl', ['$scope', '$stateParams', '$location', '$http', '$rootScope', 'sharedUtils', '$state', '$firebase', '$firebaseObject', '$firebaseArray', '$ionicHistory', 'fireBaseData', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location, $http, $rootScope, sharedUtils, $state, $firebase, $firebaseObject, $firebaseArray, $ionicHistory, fireBaseData, $ionicPopup) {

      $rootScope.extras = true;

      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          $scope.mypets = $firebaseArray(fireBaseData.refUser().child(user.uid).child("pets"));
          // $scope.user_extras = $firebaseObject(fireBaseData.refUser().child(user.uid));
          $scope.user_info = user;

          $scope.speciess = [
              "Vegetables",
              "Fruits",
              "Grains"
            ],

            $scope.genders = [
              "Female",
              "Female Spayed",
              "Male",
              "Male Neutered",
              "Unknown"
            ],


            $scope.data = { name: '', birthdate: '', species: '', gender: '', weight: '', addcomments: '' },

            $scope.$apply();

          sharedUtils.hideLoading();

        }

      });

      $scope.addpet = function() {
        $scope.mypets.$add($scope.data);
        $scope.data = { name: '', birthdate: '', species: '', gender: '', weight: '', addcomments: '' }

      }
    }
  ])

  .controller('requestAnAppointmentCtrl', ['$scope', '$stateParams', '$location', '$http', '$rootScope', 'sharedUtils', '$state', '$firebase', '$firebaseObject', '$firebaseArray', '$ionicHistory', 'fireBaseData', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location, $http, $rootScope, sharedUtils, $state, $firebase, $firebaseObject, $firebaseArray, $ionicHistory, fireBaseData, $ionicPopup) {

      
    }
  ])

  .controller('orderFoodOrPrescriptionCtrl', ['$scope', '$stateParams', '$location', '$http', '$rootScope', 'sharedUtils', '$state', '$firebase', '$firebaseObject', '$firebaseArray', '$ionicHistory', 'fireBaseData', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location, $http, $rootScope, sharedUtils, $state, $firebase, $firebaseObject, $firebaseArray, $ionicHistory, fireBaseData, $ionicPopup) {
      $rootScope.extras = true;

      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          $scope.myorders = $firebaseArray(fireBaseData.refUser().child(user.uid).child("order"));
          // $scope.user_extras = $firebaseObject(fireBaseData.refUser().child(user.uid));
          $scope.user_info = user;

          $scope.requests = [
              "Chicken poop",
              "Soil",
              "Other"
            ],

            $scope.times = [
              "Early Morning",
              "Late Morning",
              "Early Afternoon",
              "Late Afternoon"
            ],


            $scope.data = { request: '', foodpic: '', productname: '', pickdate: '', picktime: '', addcomments: '', addcomments: '' },

            $scope.$apply();

          sharedUtils.hideLoading();

        }

      });

      $scope.placeOrder = function() {
        debugger;
        $scope.myorders.$add($scope.data);
        $scope.data = { request: '', foodpic: '', productname: '', pickdate: '', picktime: '', addcomments: '', addcomments: '' }

      }

    }
  ])

  .controller('selfieShotsCtrl', ['$scope', '$stateParams', '$location', '$http', '$rootScope', '$firebase', 'fireBaseData', '$firebaseObject', '$ionicPopup', '$state', '$window', '$firebaseArray', 'sharedUtils', '$cordovaImagePicker', '$cordovaFile', '$ionicPlatform', '$q', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location, $http, $rootScope, $firebase, fireBaseData, $firebaseObject, $ionicPopup, $state, $window, $firebaseArray, sharedUtils, $cordovaImagePicker, $cordovaFile, $ionicPlatform, $q, $timeout) {

      $rootScope.extras = true;

      //Shows loading bar
      //sharedUtils.showLoading();

      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          $scope.nickname = [
              "Vegetables",
              "Fruits",
              "Grains"
            ],

            firebase.database().ref('assets').on('value', function(_snapshot) {

              // need to reset array each time
              var result = [];

              // loop through the snapshot to get the objects
              // to display in the list
              _snapshot.forEach(function(childSnapshot) {
                // get key & data...
                // var element = Object.assign({ id: childSnapshot.key }, childSnapshot.val());
                var element = childSnapshot.val();
                element.id = childSnapshot.key;

                // add to array object
                result.push(element);
              });
              $timeout(function() {
                $scope.assetCollection = result;
              }, 2);
            })
        }
      })

      function saveToFirebase(_imageBlob, _filename) {

        return $q(function(resolve, reject) {
          // Create a root reference to the firebase storage
          var storageRef = firebase.storage().ref();

          // pass in the _filename, and save the _imageBlob
          var uploadTask = storageRef.child('images/' + _filename).put(_imageBlob);

          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on('state_changed', function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // See below for more detail
          }, function(error) {
            // Handle unsuccessful uploads, alert with error message
            alert(error.message)
            reject(error)
          }, function() {
            // Handle successful uploads on complete
            var downloadURL = uploadTask.snapshot.downloadURL;

            // when done, pass back information on the saved image
            resolve(uploadTask.snapshot)
          });
        });
      }

      function saveReferenceInDatabase(_snapshot) {
        var ref = firebase.database().ref('assets');

        // see information in firebase documentation on storage snapshot and metaData
        var dataToSave = {
          'URL': _snapshot.downloadURL, // url to access file
          'name': _snapshot.metadata.name, // name of the file
          'owner': firebase.auth().currentUser.uid,
          'email': firebase.auth().currentUser.email,
          'lastUpdated': new Date().getTime(),
        };

        return ref.push(dataToSave).catch(function(_error) {
          alert("Error Saving to Assets " + _error.message);
        })
      }

      /** 
       * copied directly from documentation
       * http://ngcordova.com/docs/plugins/imagePicker/
       */
      $scope.doGetImage = function() {
        var options = {
          maximumImagesCount: 1, // only pick one image
          width: 800,
          height: 800,
          quality: 80
        };

        var fileName, path;

        $cordovaImagePicker.getPictures(options)
          .then(function(results) {
            console.log('Image URI: ' + results[0]);

            // lets read the image into an array buffer..
            // see documentation:
            // http://ngcordova.com/docs/plugins/file/
            fileName = results[0].replace(/^.*[\\\/]/, '');

            // modify the image path when on Android
            if ($ionicPlatform.is("android")) {
              path = cordova.file.cacheDirectory
            } else {
              path = cordova.file.tempDirectory
            }

            return $cordovaFile.readAsArrayBuffer(path, fileName);
          }).then(function(success) {
            // success - get blob data
            var imageBlob = new Blob([success], { type: "image/jpeg" });

            return saveToFirebase(imageBlob, fileName);
          }).then(function(_responseSnapshot) {
            // we have the information on the image we saved, now 
            // let's save it in the realtime database
            return saveReferenceInDatabase(_responseSnapshot)
          }).then(function(_response) {
            alert("Saved Successfully!!")
          }, function(error) {
            // error
            console.log(error)
          });

      }

    }
  ])

  .controller('accountCtrl', ['$scope', '$stateParams', '$location', '$http', '$rootScope', '$firebase', 'fireBaseData', '$firebaseObject', '$ionicPopup', '$state', '$window', '$firebaseArray', 'sharedUtils', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $location, $http, $rootScope, $firebase, fireBaseData, $firebaseObject, $ionicPopup, $state, $window, $firebaseArray, sharedUtils) {
      //Bugs are most prevailing here
      $rootScope.extras = true;

      //Shows loading bar
      //sharedUtils.showLoading();

      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          //Accessing an array of objects using firebaseObject, does not give you the $id , so use firebase array to get $id
          $scope.addresses = $firebaseArray(fireBaseData.refUser().child(user.uid).child("address"));

          // firebaseObject is good for accessing single objects for eg:- telephone. Don't use it for array of objects
          $scope.user_extras = $firebaseObject(fireBaseData.refUser().child(user.uid));

          $scope.user_info = user; //Saves data to user_info
          //NOTE: $scope.user_info is not writable ie you can't use it inside ng-model of <input>

          //You have to create a local variable for storing emails
          $scope.data_editable = {};
          $scope.data_editable.email = $scope.user_info.email; // For editing store it in local variable
          $scope.data_editable.password = "";

          $scope.$apply();

          sharedUtils.hideLoading();

        }

      });

      //Function 1
      $scope.addManipulation = function(edit_val) { // Takes care of address add and edit ie Address Manipulator


        if (edit_val != null) {
          $scope.data = edit_val; // For editing address
          var title = "Edit Address";
          var sub_title = "Edit your address";
        } else {
          $scope.data = {}; // For adding new address
          var title = "Add Address";
          var sub_title = "Add your new address";
        }
        // An elaborate, custom popup
        var addressPopup = $ionicPopup.show({
          template: '<input type="text"   placeholder="Nick Name"  ng-model="data.nickname"> <br/> ' +
            '<input type="text"   placeholder="Address" ng-model="data.address"> <br/> ' +
            '<input type="number" placeholder="Pincode" ng-model="data.pin"> <br/> ' +
            '<input type="number" placeholder="Phone" ng-model="data.phone">',
          title: title,
          subTitle: sub_title,
          scope: $scope,
          buttons: [
            { text: 'Close' }, {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.nickname || !$scope.data.address || !$scope.data.pin || !$scope.data.phone) {
                  e.preventDefault(); //don't allow the user to submit unless he enters full details
                } else {
                  return $scope.data;
                }
              }
            }
          ]
        });

        addressPopup.then(function(res) {

          if (edit_val != null) {
            //Update  address
            fireBaseData.refUser().child($scope.user_info.uid).child("address").child(edit_val.$id).update({ // update
              nickname: res.nickname,
              address: res.address,
              pin: res.pin,
              phone: res.phone
            });
          } else {
            //Add new address
            fireBaseData.refUser().child($scope.user_info.uid).child("address").push({ // push
              nickname: res.nickname,
              address: res.address,
              pin: res.pin,
              phone: res.phone
            });
          }

        });

      };

      // A confirm dialog for deleting address
      $scope.deleteAddress = function(del_id) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Address',
          template: 'Are you sure you want to delete this address',
          buttons: [
            { text: 'No', type: 'button-stable' }, {
              text: 'Yes',
              type: 'button-assertive',
              onTap: function() {
                return del_id;
              }
            }
          ]
        });

        confirmPopup.then(function(res) {
          if (res) {
            fireBaseData.refUser().child($scope.user_info.uid).child("address").child(res).remove();
          }
        });
      };

      //Function 2
      $scope.save = function(extras, editable) {
        //1. Edit Telephone doesnt show popup 2. Using extras and editable  // Bugs
        if (extras.telephone != "" && extras.telephone != null) {
          //Update  Telephone
          fireBaseData.refUser().child($scope.user_info.uid).update({ // set
            telephone: extras.telephone
          });
        }

        //Edit Password
        if (editable.password != "" && editable.password != null) {
          //Update Password in UserAuthentication Table
          firebase.auth().currentUser.updatePassword(editable.password).then(function(ok) {}, function(error) {});
          sharedUtils.showAlert("Account", "Password Updated");
        }

        //Edit Email
        if (editable.email != "" && editable.email != null && editable.email != $scope.user_info.email) {

          //Update Email/Username in UserAuthentication Table
          firebase.auth().currentUser.updateEmail(editable.email).then(function(ok) {
            $window.location.reload(true);
            //sharedUtils.showAlert("Account","Email Updated");
          }, function(error) {
            sharedUtils.showAlert("ERROR", error);
          });
        }

      };

      $scope.cancel = function() {
        // Simple Reload
        $window.location.reload(true);
        console.log("CANCEL");
      }

    }
  ])
