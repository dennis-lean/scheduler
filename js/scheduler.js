var Scheduler = {
	localData: {},
	todayDate: null,
	dayOffset: (60 * 60 * 24 * 1000),
	dataset: {
		months: null,
		days: null,
		datum: null
	},
	monthName: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
	
	initiate: function(totalMonths, today) {
		
		this.dataset.months = $('#dataset-months');
		this.dataset.days = $('#dataset-days');
		
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
		
		$('table').css('width', 250 + (19 * totalTime) + 'px');
		$('#colgroup-date').attr('span', totalTime);
		
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
			$('.dataset-datum').append('<td/>');
		}
		
	}
};