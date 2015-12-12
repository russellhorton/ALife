/// <reference path="MathsHelper.js"/>
/// <reference path="Gene.js"/>
/// <reference path="Animal.js"/>
/// <reference path="God.js"/>

var Herbivore = function() {
	this.init = function(chromosome) {		

		this.initAnimal(chromosome);
		this.Species = Species.Herbivore;
		if (typeof(chromosome) == 'undefined') {
			this.SetHerbivoreGenomes();
		}
		
	};
	this.SetHerbivoreGenomes = function() {
		this.Chromosome.GenesOfType(GeneTypes.Colour)[1].Code = MathsHelper.ConvertBase(255, 10, 2).toString();
	};
	this.Fitness = function() {
		
		if (this._Fitness > 0){
			return this._Fitness;
		}

		var colourGenes = this.Chromosome.GenesOfType(GeneTypes.Colour),
			nonGreen,
			nonGreenPercent;

		nonGreen = Number(MathsHelper.ConvertBase(colourGenes[0].toString(), 2, 10)) + 
				 Number(MathsHelper.ConvertBase(colourGenes[2].toString(), 2, 10));

		nonGreenPercent = (nonGreen / 756)*100

		this._Fitness = 100 - nonGreenPercent;
		return this._Fitness;


	};
	this.DecideAction = function() {

		var canSee = this.CanSee(),
			preditor = this.FindPreditor(canSee),
			food = this.FindFood(canSee),
			mate = this.FindMate(canSee);

		/*if (preditor != undefined) {	
			if (preditor.distance < 10) {
				this.MoveAway(preditor.animal.Location.X, preditor.animal.Location.Y);
				this.UseEnergy(2);	
				return;						
			}	
		}*/

		if (mate != undefined && this.Energy > 80) {
			if (mate.distance < 4) {
				this.Reproduce(mate.animal);
				this.UseEnergy(3);
			} else {
				this.MoveTowards(mate.animal.Location.X, mate.animal.Location.Y);
				this.UseEnergy(2);	
			}			
			return;
		}

		if (food != undefined) {
			if (food.distance < 4) {
				this.Eat(food.plant)
				this.UseEnergy(1);
				return;
			}
			this.MoveTowards(food.plant.Location.X, food.plant.Location.Y);
			this.UseEnergy(1);
			return;
		}
			
		this.MoveRandom();
		this.UseEnergy(1);		

	};
	this.Eat = function(plant) {
		this.Energy += plant.Energy;
		plant.Energy = 0;
		if (this.Energy > 100) {
			this.Energy = 100;
		} 
	};
	this.FindFood = function(canSee) {

		var food;

		for (var n = 0; n < canSee.length; n += 1) {

			if (canSee[n].plant == undefined) {
				continue;
			}

			if (canSee[n].plant.Species == Species.Plant) {
				if (food == undefined || (canSee[n].plant.Energy > food.plant.Energy) && (canSee[n].distance < food.distance) ) {
					food = canSee[n];
				}
			}
		}

		return food;

	};
	this.FindPreditor = function (canSee) {
		
		var preditor;

		for (var n = 0; n < canSee.length; n += 1) {

			if (canSee[n].animal == undefined) {
				continue;
			}

			if (canSee[n].animal.Species == Species.Carnivore) {
				if (preditor == undefined || canSee[n].animal.Fitness() > preditor.animal.Fitness()) {
					preditor = canSee[n];
				}
			}
		}

		return preditor;

	};
	this.init();
};
Herbivore.prototype = new Animal();


var herbi = new Herbivore();
var herbi2 = new Herbivore();

console.log(herbi.Colour());
console.log(herbi2.Colour());

var ani = new Animal();
