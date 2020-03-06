var app = angular.module('app', []);
app.controller('ctrl', function ($scope, $http) {
  // $scope.Math=window.Math;
  $scope.run = function(){
    $http({
      method: 'GET',
        url: '/courses?searchString=CSCI'
      }).then(function successCallback(response) {
          $scope.courses = response.data; 
          console.log("Success!");
      }, function errorCallback(response) {
          console.log(response.data);
    })
    // to be implemented
    // $http({
    //     method: 'GET',
    //     url: '/schedules'
    //   }).then(function successCallback(response) {
    //       $scope.schedule = response.data.semesters;
    //       console.log("Success!");
    //   }, function errorCallback(response) {
    //       console.log(response.data);
    // });



    // TEMP SETUP OF THE SEMESTERS IN THE LOCAL DATABASE
    // *************************************************

    // for (let i = 1; i <= 8; i++) {
    //   var string = "sem" + i;
    //   var object = {
    //     courses: [],
    //     name: string
    //   };

    //   $http({
    //       method: 'POST',
    //       url: '/semesters',
    //       dataType: 'JSON',
    //       data: object
    //     }).then(function successCallback(response) {
    //         // $scope.schedule = response.data.semesters;
    //         console.log("Success!");
    //     }, function errorCallback(response) {
    //         console.log(response.data);
    //   });
    // }

    // *************************************************

    // var all_semester_content = {
    //   sem1: {},
    //   sem2: {},
    //   sem3: {},
    //   sem4: {},
    //   sem5: {},
    //   sem6: {},
    //   sem7: {},
    //   sem8: {}
    // };

    // for (let i = 1; i <= 8; i++) {
    //   var string = "sem" + i;
    //   var link = '/semesters?semester=' + string

    //   $http({
    //       method: 'GET',
    //       url: link
    //     }).then(function successCallback(response) {
    //         // $scope.string = response.data.semesters;
            
            
    //         console.log("Success!");
    //     }, function errorCallback(response) {
    //         console.log(response.data);
    //   });
    // }

  }
  var drake = dragula([
    document.getElementById("queue"),
    document.getElementById("sem1"),
    document.getElementById("sem2"),
    document.getElementById("sem3"),
    document.getElementById("sem4"),
    document.getElementById("sem5"),
    document.getElementById("sem6"),
    document.getElementById("sem7"),
    document.getElementById("sem8")
  ]);

  // // ON DRAG
  // // uses source of the drag (where the dragged element originated from)
  // drake.on('drag', (el, source) => {
  //   // never to be deleted from the queue
  //   // if (source.id != "queue") {
  //     $scope.drag(source.id, el.id);
  //   // }
  //   // el.classList.add('ex-moved');
  // });
  // $scope.drag = function(sourceID, courseInfo){
  //   console.log("INFO:" +courseInfo);

  //   // name should be semester name
  //   // courses array should be filled with courses for that semester

  //   var course_json = JSON.parse(courseInfo);
  //   // alert(sourceID + " " + course_json.name);

  //   var object = {
  //     course: course_json.name,
  //     name: sourceID
  //   };

  //   $http({
  //       method: 'DELETE',
  //       url: '/semesters/pull',
  //       dataType: 'JSON',
  //       data: object
  //     }).then(function successCallback(response) {
  //         // $scope.schedule = response.data.semesters;
  //         console.log("DELETE successful");
  //     }, function errorCallback(response) {
  //         console.log(response.data);
  //   });
  // }

  // ON DROP
  // uses target of the drag (where it will be dropped) &
  // uses source of the drag (where the dragged element originated from)

  drake.on('drop', (el, target, source) => {
    // alert(source.id);
    $scope.drop(source.id, target.id, el.id);
    el.classList.add('ex-moved');
  });
  $scope.drop = function(sourceID, semesterID, courseInfo){
    console.log("INFO:" +courseInfo);

    // name should be semester name
    // courses array should be filled with courses for that semester

    var course_json = JSON.parse(courseInfo);

    if (sourceID != semesterID) {
      var to_delete = {
        course: course_json.name,
        name: sourceID
      };

      alert(sourceID + " " + course_json.name);

      $http({
          method: 'DELETE',
          url: '/semesters/pull',
          dataType: 'JSON',
          data: to_delete
        }).then(function successCallback(response) {
            // $scope.schedule = response.data.semesters;
            console.log("DELETE successful");
        }, function errorCallback(response) {
            console.log(response.data);
      });

      var to_insert = {
        course: course_json.name,
        name: semesterID
      };

      alert(semesterID + " " + course_json.name);

      $http({
          method: 'PUT',
          url: '/semesters/push',
          dataType: 'JSON',
          data: to_insert
        }).then(function successCallback(response) {
            // $scope.schedule = response.data.semesters;
            console.log("PUT successful");
        }, function errorCallback(response) {
            console.log(response.data);
      });
    }

    // $http({
    //     method: 'PUT',
    //     url: '/semesters/push',
    //     dataType: 'JSON',
    //     data: object
    //   }).then(function successCallback(response) {
    //       // $scope.schedule = response.data.semesters;
    //       console.log("PUT successful");
    //   }, function errorCallback(response) {
    //       console.log(response.data);
    // });

    // when removed from a semester, DELETE request should be issued
  }
});


/* Dragula inspired by https://codepen.io/nikkipantony/pen/qoKORX */




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

// // search
// function myFunction() {
//   var input, filter, ul, li, a, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   ul = document.getElementById("myUL");
//   li = ul.getElementsByTagName("li");
//   for (i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }

