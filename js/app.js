var app = angular.module('GradesApp', []);

app.run(function ($rootScope) {
	//$rootScope.currenUser;
	$rootScope.assignments = ['1 KT', '2 KT', 'Lisapunktid', 'Eksam'];
	//var grades = [
	//	{name: '1 KT', grade: 5},
	//	{name: '2 KT', grade: 1},
	//	{name: 'Lisapunktid', grade: 9},
	//	{name: 'Eksam', grade: 1}
	//];
	//var grades = [
	//	{name: '1 KT', grade: 3},
	//	{name: '2 KT', grade: 3},
	//	{name: 'Lisapunktid', grade: 3},
	//	{name: 'Eksam', grade: 9}
	//];
	//var grades1 = [
	//	{name: '1 KT', grade: 4},
	//	{name: '2 KT', grade: 8},
	//	{name: 'Lisapunktid', grade: 1},
	//	{name: 'Eksam', grade: 1}
	//];
	//var grades2 = [
	//	{name: '1 KT', grade: 1},
	//	{name: '2 KT', grade: 5},
	//	{name: 'Lisapunktid', grade: 5},
	//	{name: 'Eksam', grade: 4}
	//];
	//var grades3 = [
	//	{name: '1 KT', grade: 2},
	//	{name: '2 KT', grade: 1},
	//	{name: 'Lisapunktid', grade: 3},
	//	{name: 'Eksam', grade: 7}
	//];
	//var grades4 = [
	//	{name: '1 KT', grade: 5},
	//	{name: '2 KT', grade: 2},
	//	{name: 'Lisapunktid', grade: 3},
	//	{name: 'Eksam', grade: 7}
	//];
	var grades = {
		'1 KT': 5,
		'2 KT': 2,
		'Lisapunktid': 3,
		'Eksam': 7
	};
	var grades1 = {
		'1 KT': 1,
		'2 KT': 4,
		'Lisapunktid': 5,

	};
	var grades2 = {
		'1 KT': 7,
		'2 KT': 0,
		'Lisapunktid': 9,
		'Eksam': 1
	};
	var grades3 = {
		'1 KT': 11,
		'2 KT': 4,
		'Lisapunktid': 0,
		'Eksam': 7
	};
	var grades4 = {
		'1 KT': 4,
		'2 KT': 4,
		'Lisapunktid': 5,
		'Eksam': 5
	};

	$rootScope.users = [
		{id: 312123, email: 'm@m.mm', firstName: 'Mikk', lastName: 'K', pass: 's', status: 'student', code: 123123, grades: grades},
		{id: 312133, email: 'm@m1.mm', firstName: 'Paul', lastName: 'K', pass: 's', status: 'student', code: 123523, grades: grades1},
		{id: 412123, email: 'm@m2.mm', firstName: 'Jeesus', lastName: 'K', pass: 's', status: 'student', code: 123153, grades: grades2},
		{id: 312223, email: 'm@m3.mm', firstName: 'Roberta', lastName: 'K', pass: 's', status: 'student', code: 126123, grades: grades3},
		{id: 312124, email: 'm@m4.mm', firstName: 'Roberto', lastName: 'K', pass: 's', status: 'student', code: 123723, grades: grades4},
		{
			id: 123421, email: 't@t.tt', firstName: 'Teacher', lastName: 'T', pass: 't', status: 'teacher'
		}];

	$rootScope.assignments = ['1 KT', '2 KT', 'Lisapunktid', 'Eksam'];

	$rootScope.currenUser = $rootScope.users[5];

	//$rootScope.setView = function () {
	//	if ($rootScope.currenUser.status === 'student') {
	//		$rootScope.studentView();
	//	} else if ($rootScope.currenUser.status === 'teacher') {
	//		$rootScope.teacherView();
	//	} else {
	//		$rootScope.introView();
	//	}
	//};
	//$rootScope.studentView = function () {
	//	$('.intro-view').hide();
	//	$('.teacher-view').hide();
	//	$('.student-view').show();
	//};
	//$rootScope.teacherView = function () {
	//	$('.intro-view').hide();
	//	$('.teacher-view').show();
	//	$('.student-view').hide();
	//};
	//$rootScope.introView = function () {
	//	$('.intro-view').show();
	//	$('.teacher-view').hide();
	//	$('.student-view').hide();
	//}
	//
	//$rootScope.setView();

});

app.controller('AppCtrl', function ($scope, $rootScope) {
	this.currentUser = $rootScope.currenUser;
	$scope.$on('userChanged', function () {
		this.currentUser = $rootScope.currenUser;
		console.log('user', this.currentUser);
		//$rootScope.setView();
	});

	this.logout = function () {
		$rootScope.currentUser = undefined;
		this.currentUser = $rootScope.currentUser;
		//$rootScope.setView();
	}
});

app.controller('IntroCtrl', function ($rootScope) {
	this.login = true;
	this.switch = function () {
		this.login = !this.login;
	};
});

app.controller('LoginCtrl', function ($rootScope) {
	this.login = true;
	this.error = false;
	this.user = {};

	this.login = function () {
		let user = this.getValidUser(this.user);
		if (user) {
			$rootScope.currenUser = user;
			$rootScope.$broadcast('userChanged');
			this.error = false;
		} else {
			this.error = true;
		}
	};

	this.getValidUser = function (user) {
		var usr = undefined;
		$rootScope.users.forEach(function (u) {
			if (user.email === u.email && user.pass === u.pass) {
				usr = u;
			}
		});
		return usr;
	}
});

app.controller('RegisterCtrl', function ($rootScope) {
	this.status = 'student';
	this.error = false;
	this.infoSet = true;
	this.user = {};

	$('.mdl-radio.student').click(function  () {
		$(".student-code").show( "slow" );
	});
	$('.mdl-radio.teacher').click(function () {
		$(".student-code").slideUp();
	});

	this.register = function () {
		this.user.status = this.status;
		this.infoSet = this.user.email && this.user.firstName && this.user.lastName && this.user.pass
			&& (this.status === 'student' && this.user.code || this.status === 'teacher');

		if (!this.emailAvailable(this.user.email)) {
			this.error = true;
		}
		if (this.infoSet) {
			this.user.id = Math.random();
			$rootScope.users.push(this.user);
			$rootScope.currenUser = this.user;
			$rootScope.$broadcast('userChanged');
			this.error = false;
		}
	};

	this.emailAvailable = function (email) {
		var avaialble = true;
		$rootScope.users.forEach(function (u) {
			if (email === u.email) {
				console.log(email + "===" + u.email);
				avaialble = false;
			}
		});
		return avaialble;
	}
});

app.controller('TableCtrl', function ($rootScope) {
	this.students = $rootScope.users.filter(function (u) { return u.status === 'student' });
	this.assignments = $rootScope.assignments;
	//this.headers = ['Name', 'Student code'].concat(this.assignments);
	this.selected = [];
	this.multiselect = false;
	this.tab = 'all';

	this.setTab = function (tab) {
		this.tab = tab;
	};

	this.edit = function (student) {
		console.log('srucent', student);
		if (this.newAssPopupVisible) {
			return;
		}
		this.currentStudent = student;
		//this.editPopupVisible = true;

	};

	this.selectMultiple = function () {
		this.multiselect = !this.multiselect;
		this.selected = [];
	};

	this.select = function (student) {
		if (!this.multiselect) return;
		if (!_.contains(this.selected, student)) {
			this.selected.push(student);
		} else {
			this.selected = _.without(this.selected, student);
		}
	};

	this.studentSelected = function (student) {
		var b = _.contains(this.selected, student);
		return b;
	};

	this.updateStudent = function (student, ass, grade) {
		if (this.multiselect && this.studentSelected(student)) {
			this.selected.forEach(function (s) {
				s.grades[ass] = grade;
			});
		} else {
			student.grades[ass] = grade;
		}
	};

	this.showPopup = function (name) {
		if (name === 'new_ass') {
			this.newAssPopupVisible = true;
		} else if (name === 'edit') {
			this.editPopupVisible = true;
		}
	};

	this.create = function () {
		if (this.newAssName) {
			$rootScope.assignments.push(this.newAssName);
			this.newAssPopupVisible = false;
		}
	};

	this.save = function () {

	};

	this.cancel = function () {
		this.newAssPopupVisible = false;
		this.editPopupVisible = false;
	};
});

app.controller('GradesCtrl', function ($rootScope) {
	this.assignments = $rootScope.assignments;
	this.grades = $rootScope.currenUser.grades;

	this.submit = function () {
		var file = $('#file-input')[0].files[0];
		var comments = this.comments;
		$('#file-input').val('');
		this.comments = undefined;
		if (file) {
			console.log(file);
			console.log(comments);
			// TODO: UPLOAD FILE
		}
		this.currentAssignment = undefined;
	};

	this.submitAssignment = function (index) {
		this.currentAssignment = this.assignments[index];
		console.log(this.currentAssignment)
	};

	this.cancel = function () {
		this.currentAssignment = undefined;
	}


});