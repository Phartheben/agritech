angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.myPets', {
    url: '/mypets',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myPets.html',
        controller: 'myPetsCtrl'
      }
    }
  })

  .state('menu.category', {
    url: '/category',
    views: {
      'side-menu21': {
        templateUrl: 'templates/category.html',
        controller: 'categoryCtrl'
      }
    }
  })

  .state('menu.notifications', {
    url: '/notifications',
    views: {
      'side-menu21': {
        templateUrl: 'templates/notifications.html',
        controller: 'notificationsCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.addAPet', {
    url: '/addapet',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addAPet.html',
        controller: 'addAPetCtrl'
      }
    }
  })

  .state('menu.requestAnAppointment', {
    url: '/requestanappointment',
    views: {
      'side-menu21': {
        templateUrl: 'templates/requestAnAppointment.html',
        controller: 'requestAnAppointmentCtrl'
      }
    }
  })

  .state('menu.orderFoodOrPrescription', {
    url: '/orderFoodOrPrescription',
    views: {
      'side-menu21': {
        templateUrl: 'templates/orderFoodOrPrescription.html',
        controller: 'orderFoodOrPrescriptionCtrl'
      }
    }
  })

  .state('menu.selfieShots', {
    url: '/selfieshots',
    views: {
      'side-menu21': {
        templateUrl: 'templates/selfieShots.html',
        controller: 'selfieShotsCtrl'
      }
    }
  })

  .state('menu.account', {
    url: '/account',
    views: {
      'side-menu21': {
        templateUrl: 'templates/account.html',
        controller: 'accountCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/login')


});