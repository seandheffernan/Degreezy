/* Dragula inspired by https://codepen.io/nikkipantony/pen/qoKORX */
dragula([
  document.getElementById("queue"),
  document.getElementById("y1s1"),
  document.getElementById("y1s2"),
  document.getElementById("y2s1"),
  document.getElementById("y2s2"),
  document.getElementById("y3s1"),
  document.getElementById("y3s2"),
  document.getElementById("y4s1"),
  document.getElementById("y4s2")
]);

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

$(document).ready(function () {
  var toggleBtnL = document.querySelector('.leftButton');
  var toggleBtnR = document.querySelector('.rightButton');
  var leftArrow = document.querySelector(".fa-arrow-left");
  var rightArrow = document.querySelector(".fa-arrow-right");
  var left = document.querySelector('.left');
  var right = document.querySelector('.right');
  var content = document.querySelector('#content');

  toggleBtnL.addEventListener('click', function() {
    left.classList.toggle('is-closed');
    toggleBtnL.classList.toggle('is-closed');
    leftArrow.classList.toggle('fa-arrow-right');
    leftArrow.classList.toggle('fa-arrow-left');
  })
  toggleBtnR.addEventListener('click', function() {
    right.classList.toggle('is-closed');
    toggleBtnR.classList.toggle('is-closed');
    rightArrow.classList.toggle('fa-arrow-right');
    rightArrow.classList.toggle('fa-arrow-left');
  })
});
