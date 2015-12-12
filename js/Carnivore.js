var Carnivore = function (chromosome) {
	this.init = function(chromosome) {
		//this._super(chromosome);
		this.initAnimal(chromosome);
		this.Species = Species.Carnivore;
		if (typeof(chromosome) == 'undefined') {
			this.SetCarnivoreGenomes();
		}

	};
	this.SetCarnivoreGenomes =  function(){
		this.Chromosome.GenesOfType(GeneTypes.Colour)[0].Code = MathsHelper.ConvertBase(255, 10, 2).toString();
	};
	this.Fitness = function() {
		
		if (this._Fitness > 0){
			return this._Fitness;
		}

		var colourGenes = this.Chromosome.GenesOfType(GeneTypes.Colour),
			nonRed,
			nonRedPercent;

		nonRed = Number(MathsHelper.ConvertBase(colourGenes[1].toString(), 2, 10)) + 
				 Number(MathsHelper.ConvertBase(colourGenes[2].toString(), 2, 10));

		nonRedPercent = (nonRed / 756)*100

		this._Fitness = 100 - nonRedPercent;
		return this._Fitness;


	};
	this.DecideAction = function() {

		var canSee = this.CanSee(),
			food = this.FindFood(canSee),			
			mate = this.FindMate(canSee);

		if (mate != undefined) {
			if ((this.Energy > 80)|| mate.distance < 10) {
				if (mate.distance < 4) {
					this.Reproduce(mate.animal);
					this.UseEnergy(3);
				} else {
					this.MoveTowards(mate.animal.Location.X, mate.animal.Location.Y);
					this.UseEnergy(1);	
				}			
				return;
			}
		}

		if (food != undefined) {
			if (food.distance < 4) {
				this.Eat(food.animal)
				this.UseEnergy(3);
				return;
			}
			this.MoveTowards(food.animal.Location.X, food.animal.Location.Y);
			this.UseEnergy(1);
			return;
		}

		this.MoveRandom();
		this.UseEnergy(1);		

	};
	this.FindFood = function (canSee) {
		
		var dinner;

		for (var n = 0; n < canSee.length; n += 1) {

			if (canSee[n].animal == undefined) {
				continue;
			}

			if (canSee[n].animal.Species == Species.Herbivore) {
				if (dinner == undefined || canSee[n].animal.Fitness() > dinner.animal.Fitness()) {
					dinner = canSee[n];
				}
			}
		}

		return dinner;

	};
	this.Eat = function(animal) {

		if (MathsHelper.BiasCoinThrow(0.6)) {
			this.Energy += (animal.Energy / 2);
			if (this.Energy > 100) {
				this.Energy = 100;
			}
		}

	};
	this.init(chromosome);
};
Carnivore.prototype = new Animal();



var carny = new Carnivore();
var carny2 = new Carnivore();

console.log(carny.Colour());
console.log(carny2.Colour());
console.log(carny.Fitness());
//console.log(carny.CanSee());