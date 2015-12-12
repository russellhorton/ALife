var Events = {
	Birth : "birth",
	Death : "death",
	Moved : "moved",
	PlantGrowth  : "plantgrowth",
	EndofIteration : "endofiteration",
	RaiseEvent : function(eventName, details) {
		var event = new CustomEvent(eventName, details);
		self.dispatchEvent(event);
	},
	AddListener : function(eventName, callback) {
		self.addEventListener(eventName, callback);
	}
}