var app = angular.module('GradesApp', []);

app.run(function ($rootScope) {
	$rootScope.currenUser;
	$rootScope.assignments = ['1 KT', '2 KT', 'Lisapunktid', 'Eksam'];
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
		'Eksam': 5
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

	$rootScope.currenUser = $rootScope.users[1];
});

app.controller('AppCtrl', function ($rootScope) {
	this.currentUser = $rootScope.currenUser;
	$rootScope.$on('userChanged', function () {
		this.currentUser = $rootScope.currenUser;
	});
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

	this.selected = [];
	this.select = function (student) {
		if (!_.contains(this.selected, student)) {
			this.selected.push(student);
			console.log(this.selected);
		}
	};

	this.updateStudent = function (student, ass, grade) {
		student.grades[ass] = grade;
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