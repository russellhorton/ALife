var MathsHelper = {
	GenerateRandomNumber: function (min, max) {	
		return Math.floor(Math.random() * (max - min + 1)) + min; 
	},
	BiasCoinThrow: function (probability) {
	    var coin = true,
	    	number = MathsHelper.GenerateRandomNumber(0, 100);
	    
	    if (number > 100*probability) {
	      coin = false;
	    }

	    return coin;
	},	
	GenerateGuid: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
	ConvertBase: function (num, baseFrom, baseTo) {        
        return parseInt(num, baseFrom).toString(baseTo);        
    },
    DateDiff: function(datepart, fromdate, todate) {	
		datepart = datepart.toLowerCase();	
		var diff = todate - fromdate,
			divideBy = { w:604800000, 
			           d:86400000, 
			           h:3600000, 
			           n:60000, 
			           s:1000 };	

		return Math.floor( diff/divideBy[datepart]);
	},
	FormatDate: function(date) {
		return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	}
}