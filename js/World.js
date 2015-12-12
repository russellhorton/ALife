var World = function () {
	this.StartTime = null;
	this.Life = {
		Animals: [],
		Plants: []
	};
	this.Options = {
		CarnivorePopulation : 30,
		HerbivorePopulation : 60,
		PlantPopulation : 200,
		Width : 500,
		Height : 500
	};
	this.Init = function () {
		this.StartTime = new Date();
		this.PopulateWorld();
		this.PositionAnimals();		
	};
	this.PopulateWorld = function () {
		
		for (var n = 0; n < this.Options.CarnivorePopulation; n += 1) {
			this.Life.Animals.push(new Carnivore());
		}
		for (var n = 0; n < this.Options.HerbivorePopulation; n += 1) {
			this.Life.Animals.push(new Herbivore());
		}
		for (var n = 0; n < this.Options.PlantPopulation; n += 1) {
			this.Life.Plants.push(new Plant());
		}

	};
	this.PositionAnimals = function() {
		for (var n = 0; n < this.Life.Animals.length; n += 1) {
			this.Life.Animals[n].Location = new Location(MathsHelper.GenerateRandomNumber(0, this.Options.Width), MathsHelper.GenerateRandomNumber(0, this.Options.Height));
		}
		for (var n = 0; n < this.Life.Plants.length; n += 1) {
			this.Life.Plants[n].Location = new Location(MathsHelper.GenerateRandomNumber(0, this.Options.Width), MathsHelper.GenerateRandomNumber(0, this.Options.Height));
		}
	};
	this.toString = function() {
		var thisWorld = '',
			animalCensus = this.FindAllTypesOfAnimals();

		thisWorld += "Total population : " + (this.Life.Animals.length);
		thisWorld += "\nWidth : " + this.Options.Width;
		thisWorld += "\nHeight : " + this.Options.Height;
		thisWorld += "\nStart time : " + MathsHelper.FormatDate(this.StartTime);
		thisWorld += "\nAge of world : " + MathsHelper.DateDiff("s", this.StartTime, Date.now()) + " seconds";

		for(var key in animalCensus) {
			thisWorld += "\n" + key + " : " + animalCensus[key];
		}

/*
		thisWorld += "\nCarnivores : " + this.Life.Carnivores.length + "\n";
		for (var n = 0; n < this.Life.Carnivores.length -1; n += 1) {
			thisWorld += this.Life.Carnivores[n].toString() + ", ";
		}
		thisWorld += "\nHerbivores : " + this.Life.Herbivores.length + "\n";
		for (var n = 0; n < this.Life.Herbivores.length -1; n += 1) {
			thisWorld += this.Life.Herbivores[n].toString() + ", ";
		}*/
		return thisWorld;
	};
	this.FindAllTypesOfAnimals = function() {
		var animals = {};

		for(var n = 0; n < this.Life.Animals.length; n += 1) {

			var type = this.Life.Animals[n].Species;

			if (animals[type] == undefined){
				animals[type] = 1;
			} else {
				animals[type] += 1;
			}

		}
		return animals;
	}
	this.Init();

};