var app = angular.module('app', []);
app.controller('ctrl', function ($scope, $http) {
  // $scope.Math=window.Math;

  const param = new URLSearchParams(location.search);
  $scope.userObj = JSON.parse(param.get("result"));
  $scope.run = function(){
    $http({
      method: 'GET',
        url: '/courses?searchString='
      }).then(function successCallback(response) {
          $scope.courses = response.data;
          console.log("Success!");
      }, function errorCallback(response) {
          console.log(response.data);
    });

    var userToken = $scope.userObj.usertoken;
    var all_semester_content = [[], [], [], [], [], [], [], [], [], []];

    for (let i = 1; i <= 10; i++) {
      var string = 'sem' + i;
      var user_string = userToken + '_' + string;
      var link = '/semesters?_id=' + user_string;
      // alert(link);

      $http({
          method: 'GET',
          url: link
        }).then(function successCallback(response) {
            var head = response.data.courses;

            for (let j in head) {
              // alert(JSON.stringify(head[j]));
              all_semester_content[i-1].push(head[j]);
            }
            $scope.sem_content = all_semester_content;

            console.log("Success!");
        }, function errorCallback(response) {
            console.log(response.data);
      });
    }

    let num_semesters = 8;

    // function update_semesters() {
    //   for (var s = 1; s <= num_semesters; s++) {
    //     var string = "#sem_hide" + s;
    //     var indic_string = "#indicator_hide" + s;

    //     $(string).show();
    //     $(indic_string).show();
    //   }

    //   for (var s = num_semesters; s < 10; s++) {
    //     var number = s + 1;
    //     var string = "#sem_hide" + number;
    //     var indic_string = "#indicator_hide" + number;

    //     $(string).hide();
    //     $(indic_string).hide();
    //   }
    // }

    function update_semesters() {
      // for (var s = 1; s <= 10; s++) {
      //   var string = '#sem' + s;
      //   $(string).removeClass('active');
      // }

      for (var s = 1; s <= num_semesters; s++) {
        var string = '#sem_hide' + s;
        var simple = '#sem' + s;
        var indic_string = '#indicator_hide' + s;

        $(string).find('div').show();
        $(simple).removeClass('slide-hide-on-mobile');
        // $(simple).show();

        $(indic_string).show();

        // if (s == num_semesters) {
        //   $(string).addClass('active');
        // }
      }

      for (var s = num_semesters; s < 10; s++) {
        var number = s + 1;
        var string = '#sem_hide' + number;
        var simple = '#sem' + number;
        var indic_string = '#indicator_hide' + number;

        // $(string).removeClass('active');

        $(string).find('div').hide();
        $(simple).addClass('slide-hide-on-mobile');
        // $(simple).hide();


        $(indic_string).hide();

        // if (s == num_semesters) {
        //   $(string).addClass('active');
        // }
      }

      // for (var s = 1; s < 10; s++) {
      //   var number = s + 1;
      //   var simple = '#sem' + s;
      //   var next = '#sem' + number;
      //   // $(simple).removeClass('active');
      //   // if ($(next).hasClass('slide-hide-on-mobile')) {
      //   //   alert(simple);
      //   // }
      // }

      // $('#sem_hide1').addClass('active');
    }

    $scope.sub = function() {
      if (num_semesters > 1) {
        num_semesters = num_semesters - 1;
      }

      update_semesters();
    }
    
    $scope.add = function() {
      if (num_semesters < 10) {
        num_semesters = num_semesters + 1;
      }

      update_semesters();
    }


    update_semesters();

    $scope.reqCheck();
  }

  $scope.originalProfile = {
    usertoken: '',
    firstName: 'RPI',
    lastName: 'Student',
    semesterAdmitted: 'Spring 2016',
    expectedGraduation: 'Fall 2023',
    firstProgram: '',
    secondProgram: ''
  };

  $scope.profile = angular.copy($scope.originalProfile);

  $scope.submitProfileForm = function () {

      var onSuccess = function (data, status, headers, config) {
          alert('Profile Updated');
      };

      var onError = function (data, status, headers, config) {
          alert('Error occured.');
      }

      $http.post('users/update?token=' + profile:$scope.profile.token, { profile:$scope.profile })
          .success(onSuccess)
          .error(onError);

    };

  $scope.runPrograms = function(){
    $http({
      method: 'GET',
        url: '/programs/all'
      }).then(function successCallback(response) {
          $scope.programInfo = response.data;
          console.log("Success!");
      }, function errorCallback(response) {
          console.log(response.data);
    });
  };





  var creditCount;

  // Carousel (mobile only view)
  $(window).on('load resize', function() {
    $('#carousel').carousel('pause');

    if ( document.documentElement.clientWidth <= 767 ) {
      $('.sem_col').addClass('carousel-item');
      $('.sem_col').removeClass('col-md-6');
      $('.sem_col').removeClass('col-sm-6');
      $('.sem_col').removeClass('col-xs-6');

      $('.sem').css('border-radius', 0);
      $('.sem').css('min-height', '30rem');

      $('.carousel-indicators').show();
      $('.carousel-control-prev').show();
      $('.carousel-control-next').show();

      $('.outside').addClass('carousel-inner');
      $('.outside').removeClass('row');

    } else {
      $('.sem_col').removeClass('carousel-item');
      $('.sem_col').addClass('col-md-6');
      $('.sem_col').addClass('col-sm-6');
      $('.sem_col').addClass('col-xs-6');

      $('.sem').css('border-radius', 10);
      $('.sem').css('min-height', '400px');

      $('.carousel-indicators').hide();
      $('.carousel-control-prev').hide();
      $('.carousel-control-next').hide();

      $('.outside').removeClass('carousel-inner');
      $('.outside').addClass('row');
      // $('.inside').addClass('row');




    }
  });

  // $('#carousel').on('slide.bs.carousel', function(){
  //   // if ( $('#carousel') ) {

  //   // }


  //   // if($(nextslide).hasClass("slide-hide-on-mobile")){
  //     alert('blah');
  //   // }
  // });

  var drake = dragula([
    document.getElementById("queue"),
    document.getElementById("sem1"),
    document.getElementById("sem2"),
    document.getElementById("sem3"),
    document.getElementById("sem4"),
    document.getElementById("sem5"),
    document.getElementById("sem6"),
    document.getElementById("sem7"),
    document.getElementById("sem8"),
    document.getElementById("sem9"),
    document.getElementById("sem10")
  ]);

  // ON DROP
  // uses target of the drag (where it will be dropped) &
  // uses source of the drag (where the dragged element originated from)
  drake.on('drop', (el, target, source) => {
    //getprogress  reruns
    
    // alert(el.id);
    $scope.drop(source.id, target.id, el.id);
    // console.log(source.id);
    el.classList.add('ex-moved');
    $scope.reqCheck();
  });
  $scope.drop = function(sourceID, semesterID, courseName){
    var userToken = $scope.userObj.usertoken;
    // alert(userToken);

    var to_delete = {
      course: courseName,
      _id: userToken + '_' + sourceID
    };

    var to_insert = {
      course: courseName,
      _id: userToken + '_' + semesterID
    };

    $http({
        method: 'POST',
        url: '/semesters/pull',
        dataType: 'JSON',
        data: to_delete
      }).then(function successCallback(response) {
          console.log("DELETE successful");
      }, function errorCallback(response) {
          console.log(response.data);
    });

    $http({
        method: 'PUT',
        url: '/semesters/push',
        dataType: 'JSON',
        data: to_insert
      }).then(function successCallback(response) {
          console.log("PUT successful");
      }, function errorCallback(response) {
          console.log(response.data);
    });



  }
  $scope.reqCheck = function (){
      var urlString = "/users/getprogress?token=";
      var userToken = $scope.userObj['usertoken'];
      // var userToken = 'Joe Ross';
      $http({
        method: 'GET',
        url: urlString+userToken
     }).then(function successCallback(response) {
          $scope.require = response.data.concentrations;
          console.log("Requirements data: "+ JSON.stringify(response.data.concentrations));
      }, function errorCallback(response) {
          console.log(response.data);
    });
  }

});


/* Dragula inspired by https://codepen.io/nikkipantony/pen/qoKORX */

// search
function searchFunction() {
  var input = document.getElementById("myInput");
  var filter = input.value.toUpperCase();
  var ul = document.getElementById("queue");
  var li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    var a = li[i]
    var txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}




// removeOnSpill: false
//   .on("drag", function(el) {
//     el.className.replace("ex-moved", "");
//   })
//   .on("drop", function(el) {
//     el.className += "ex-moved";
//   })
//   .on("over", function(el, container) {
//     container.className += "ex-over";
//   })
//   .on("out", function(el, container) {
//     container.className.replace("ex-over", "");
//   });

// const list_items = document.querySelectorAll('.list-item');
// const lists = document.querySelectorAll('.list');
// // const lists = document.querySelectorAll('.list-item'); //interesting behavior; can drag elements into elements

// let draggedItem = null;

// for (let i = 0; i < list_items.length; i++) {
// 	const item = list_items[i];

// 	item.addEventListener('dragstart', function () {
// 		draggedItem = item;
// 		setTimeout(function () {
// 			// item.style.display = 'none';
//       item.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
// 		}, 0)
// 	});

// 	item.addEventListener('dragend', function () {
// 		setTimeout(function () {
// 			// draggedItem.style.display = 'block';
//       draggedItem.style.backgroundColor = '#F3F3F3';
// 			draggedItem = null;
// 		}, 0);
// 	})

// 	for (let j = 0; j < lists.length; j++) {
// 		const list = lists[j];

// 		list.addEventListener('dragover', function (e) {
//       e.preventDefault();
//       this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
// 		});
		
// 		list.addEventListener('dragenter', function (e) {
// 			// e.preventDefault();
// 			// this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
// 		});

// 		list.addEventListener('dragleave', function (e) {
// 			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
// 		});

// 		list.addEventListener('drop', function (e) {
// 			console.log('drop');
// 			this.append(draggedItem);
//       // this.append("hi"); // will print 7 times
// 			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
// 		});
// 	}
// }



