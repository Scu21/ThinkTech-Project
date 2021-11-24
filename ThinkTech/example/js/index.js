import 'bootstrap';
import 'd3';
import 'jquery-ui';
import moment from 'moment';

import 'dashboard-framework/dashboard-core';
import 'dashboard-framework/dashboard-util';
import 'dashboard-framework/dashboard-template';

// import this first because it sets a global all the rest of the widgets need
import './widgets/widget-root';

window.Tower = {
	ready: false,
	current: null,
	status: {},

	// Tower Control becomes ready only after the first status is received from the server
	isReady: function() {
		Tower.ready = true;

		// let everyone listening in know
		Dashboard.Utils.emit('tower-control|ready|true');

		return true;
	},


	init: function() {
		//set options for the Dashboard
		Dashboard.setOptions({
			'appName': 'sample-dashboard'
		});

		//initialize the Dashboard, set up widget container
		Dashboard.init()

	    Dashboard.preregisterWidgets({
		  'controls'		: require('./widgets/controls'),
		  'info'			: require('./widgets/info'),
	      'form'            : require('./widgets/form'),
	      'misc'            : require('./widgets/misc'),
		  'date'			: require('./widgets/date'),
		  'weather'			: require('./widgets/weather')
		});

		//open first section - console
		Tower.section['console']();
	},

	//RBJ - Here's where we define the sections
	section: {
		'console': function() {
			// data that the widgets will use
			var data = {
				'numUser': 4,
				'appName': 'sample app',
				'url': 'hello.com',
				'description': 'this is a description of the app.'
			}

			// the array of widgets that belong to the section,
			// these were preregistered in init() because they are unique
			var widgets = [
				{ widgetId: 'date' },
				{ widgetId: 'controls' },
				{ widgetId: 'weather' },
				{ widgetId: 'info' , data: data}, //data can be passed in
				{ widgetId: 'form' },
				{ widgetId: 'misc' },
			];

			// opens the section and pass in the widgets that it needs
			Dashboard.showSection('console', widgets);
		},

		// a section using same widget template for multiple widgets
		'users': function() {

			// define the data
			var userlist = {
				'user1': {
					'name'	: 'Developer',
					'role'	: 'developer',
					'id'	: 456
				},
				'user2': {
					'name'	: 'Developer',
					'role'	: 'developer',
					'id'	: 456
				},
				'user3': {
					'name'	: 'Data Scientist',
					'role'	: 'data scientist',
					'id'	: 789
				},
				'user4': {
					'name'	: 'QA',
					'role'	: 'qa',
					'id'	: 101
				},
				'user5': {
					'name'	: 'QA',
					'role'	: 'qa',
					'id'	: 101
				}
			}

			var widgets = [];
			//iterate over the data, creating a new widget for each item
			_.each(userlist, function(user, key) {
				var widget = {};
				widget[key + '-user'] = require('./widgets/user.js');
				Dashboard.preregisterWidgets(widget);

				widgets = widgets.concat([{
					widgetId: key + '-user',
					data: user
				}])
			})

			Dashboard.showSection('users', widgets);
		},

		// a section using same widget template for multiple widgets
		'lusers': function() {
			//import styles from "./style.css";

			// the array of widgets that belong to the section,
			// these were preregistered in init() because they are unique
			var widgets = [
				{ widgetId: 'gauge0'},
				/*{ widgetId: 'gauge1'},
				{ widgetId: 'gauge2'},
				{ widgetId: 'gauge3'},
				{ widgetId: 'gauge4'},
				{ widgetId: 'gauge5'},
				{ widgetId: 'gauge6'},*/
			];

			// opens the section and pass in the widgets that it needs
				Dashboard.showSection('lusers', widgets);

			// data that the widgets will use
			var pad = function(tar) {}

      		var gauge0 = Gauge(document.getElementById("gauge0"));

		      var gauge1 = Gauge(
		        document.getElementById("gauge1"),
				    {
		          max: 100,
		          dialStartAngle: -90,
		          dialEndAngle: -90.001,
		          value: 100,
		          label: function(value) {
		            return (Math.round(value * 100) / 100) + "/" + this.max;
		          }
		        }
		      );

		      var gauge2 = Gauge(
		        document.getElementById("gauge2"),
				    {
		          min: -100,
		          max: 100,
		          dialStartAngle: 180,
		          dialEndAngle: 0,
		          value: 50,
		          viewBox: "0 0 100 57",
		          color: function(value) {
		            if(value < 20) {
		              return "#5ee432";
		            }else if(value < 40) {
		              return "#fffa50";
		            }else if(value < 60) {
		              return "#f7aa38";
		            }else {
		              return "#ef4655";
		            }
		          }
		        }
		      );

		      var gauge3 = Gauge(
		        document.getElementById("gauge3"),
				    {
		          max: 100,
		          value: 50
		        }
		      );

		      var gauge4 = Gauge(
		        document.getElementById("gauge4"),
				    {
		          max: 100,
		          dialStartAngle: 180,
		          dialEndAngle: -90,
		          viewBox: "0 0 60 60",
		          value: 50
		        }
		      );

		      var gauge5 = Gauge(
		        document.getElementById("gauge5"),
				    {
		          max: 200,
		          dialStartAngle: 0,
		          dialEndAngle: -180,
		          viewBox: "0 35 100 100",
		          value: 50
		        }
		      );

		      var gauge6 = Gauge(
		        document.getElementById("gauge6"),
				    {
		          max: 100,
		          dialStartAngle: 90.01,
		          dialEndAngle: 89.99,
		          dialRadius: 15,
		          showValue: false,
		          value: 100
		        }
		      );

		      (function loop() {
		        var value1 = Math.random() * 100,
		            value2 = Math.random(),
		            value3 = Math.random() * 100,
		            value4 = Math.random() * 100,
		            value5 = Math.random() * 200;

		        gauge0.setValue(value1, 1);
		        gauge1.setValueAnimated(value1, 1);
		        gauge2.setValueAnimated(50 - value1, 3);
		        gauge3.setValueAnimated(value3, 1.5);
		        gauge4.setValueAnimated(value4, 2);
		        gauge5.setValueAnimated(value5, 1);
		        gauge6.setValueAnimated(value1, 1);
		        window.setTimeout(loop, 4000);
		      })();
			}

	},


	debug: function(message) {
		var _ref;
		return typeof window !== 'undefined' && window !== null ? (_ref = window.console) !== null ? _ref.log(message) : void 0 : void 0;
	}
};



$(function() {
	$(window).on('scroll', function(e) {
		if ($(window).scrollTop() > 50) {
			$('body').addClass('sticky');
		} else {
			$('body').removeClass('sticky');
		}
	});

	// logo handler
	$("a.tower-logo").click(function(e) {
		e.preventDefault();
		$("#console").click();
	});

	// Menu (burger) handler
	$('.tower-toggle-btn').on('click', function() {
		$('.tower-logo-container').toggleClass('tower-nav-min');
		$('.tower-sidebar').toggleClass('tower-nav-min');
		$('.tower-body-wrapper').toggleClass('tower-nav-min');
	});

	$('#reset').on('click', function() {
		Dashboard.reset();
	})

	// Navigation menu handler
	$('.tower-sidebar li').click(function(e) {
		var id = $(this).attr('id');

		e.preventDefault();

		Tower.current = id;

		$('.tower-sidebar li').removeClass('active');
		$(this).addClass('active');

		Tower.section[Tower.current]();

		$('.tower-page-title').html( $('<span>', { html: $(this).find('.tower-sidebar-item').html() }) );

	});

	// ---------- INIT -----------
	Tower.init();

	// Setting 'Console' as first section
	$('.tower-sidebar li').first().click();
});
