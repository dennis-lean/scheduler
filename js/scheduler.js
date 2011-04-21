var Utility = {
	// Check if data is not defined
	isnull: function(value) {
		return (typeof(value) == 'undefined' || value == null);
	},
        
	// Check if data is defined
	isset: function(value) {
		return !this.isnull(value);
	},
        
	// Check whether the passed value is a function
	isfunction: function(value) {
		return this.typeOf(value, 'function');
	},


	// Return the typeof passed argument, extending JavaScript default typeof
	typeOf: function(data, type) {
		var _this = this;
		var result = (function(data) {
			if (_this.isnull(data)) 
				return null;
			else {
				var value = Object.prototype.toString.call(data).match(/(\w+)\]/)[1];
				return (value == 'HTMLDocument' ? 'element' : value.toLowerCase());
			}
		})(data);
                
		return (_this.isset(type) ? (result === type.toLowerCase()) : result);
	}
};

var Scheduler = {
	localData: {},
	todayDate: null,
	dayOffset: (60 * 60 * 24 * 1000),
	dataset: {
		months: null,
		days: null,
		datum: null
	},
	
	monthName: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	
	initiate: function() {
		this.dataset.months = $('#dataset-months');
		this.dataset.days = $('#dataset-days');
	},
	
	fetch: function(curl, data, callback, dataType) {
		if (!Utility.isfunction(callback)) {
			return;
		}
		
		if (dataType == undefined) {
			dataType = 'json';
		}
		
		var request = curl.split(' ');
		var type = 'GET';
		var uri = '';

		var types = ['POST', 'GET', 'PUT', 'DELETE'];

		if (request.length == 1) {
			uri = curl;
		}
		else {
			request[0] = request[0];
			if (jQuery.inArray(request[0], types) >= 0) {
				type = request[0];
			}

			uri = request[1];
		}

		jQuery.ajax({
			'type': type,
			'dataType': dataType,
			'url': uri,
			'data': data,
			'complete': function(xhr) {
				var data = jQuery.parseJSON(xhr.responseText);
				
				switch (xhr.status) {
					case 200:
						callback(data);
						break;
				}
			}
		});
		
	},
	
	generate: function(data, totalMonths, today) {
		
		if (isNaN(totalMonths)) {
			totalMonths = 4;
		}
		
		totalMonths = totalMonths - 1;
		
		if (totalMonths < 0) {
			totalMonths = 0;
		}
		
		var date = today.split('-');
		var year = parseInt(date[0], 10);
		var month = parseInt(date[1], 10);
		
		// new Date(year, month, day, hours, minutes, seconds, milliseconds)
		this.todayDate = new Date(year, (month - 1), date[2], 0, 0, 0, 0);
		
		
		// current month should sit in the middle, split total months into 2
		var prevTotalMonth = Math.floor(totalMonths / 2);
		var nextTotalMonth = totalMonths - prevTotalMonth;
		
		var firstDate = new Date(year, (month - (prevTotalMonth + 1)), 1, 0, 0, 0, 0);
		var lastDate = new Date(year, (month + (nextTotalMonth)), 0, 0, 0, 0, 0, 0);
		
		var totalTime = (((lastDate - firstDate) / this.dayOffset) + 1);
		
		var loopMonth = firstDate.getMonth() - 1;
		
		$('#scheduler').css('width', 250 + (21 * totalTime) + 'px');
		$('#colgroup-date').attr('span', totalTime);
		
		var contents = [];
		var length = data.length;
		
		for(var i = 0; i < length; i++) {
			contents[i] = '';
		}
		
		for (var i = 0; i < totalTime; i++) {
			var loopTime = (firstDate.getTime() + (i * this.dayOffset));
			var loopDate = new Date(loopTime);
			
			if (loopDate.getMonth() != loopMonth) {
				loopMonth = loopDate.getMonth();
				var tmpDate = new Date(loopTime);
				tmpDate.setMonth((loopMonth + 1), 0);
				
				$('<th/>').attr('colspan', tmpDate.getDate()).text(this.monthName[loopMonth]).appendTo(this.dataset.months);
			}
			
			$('<th/>').text(loopDate.getDate()).appendTo(this.dataset.days);
			
			for (var index = 0; index < length; index++) {
				contents[index] += '<td data-month="' + loopDate.getMonth() + '" data-date="' + loopDate.getDate() + '" data-index="' + data[index].id + '">&nbsp;</td>';
			}
		}
		
		for(var i = 0; i < length; i++) {
			var tr = $('<tr />').appendTo('#scheduler tbody');
			tr.append('<th>' + data[i].name + '</th>' + contents[i]);
		}
		
		$('.dataset-datum').bind('click', function() {
			console.log('clicked');
		});
		
	}
};