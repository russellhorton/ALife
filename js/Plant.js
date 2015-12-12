var Plant = function() {
	this.Energy = 100;
	this.Location = null;
	this.Shape = [7,7,0,7,7,0,0,0];
	this.Id = null;
	this.Species = "Plant";
	this.Init = function() {	
		this.Id = MathsHelper.GenerateGuid();
	};
	this.Grow = function() {
		this.Energy += 1;
		if (this.Energy > 100) {
			this.Energy = 100;
		}
		Events.RaiseEvent(Events.PlantGrowth, {"detail" : this});
	};
	this.Colour = function() {
		var green = MathsHelper.ConvertBase(this.Energy, 10, 16);
		return "#00" + green + "00";
	};
	this.Init();
};