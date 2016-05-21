var Animal = function() {
	this.Id = '';
	this.Chromosome= null;
	this.Energy = 0;
	this.Location = null;	
	this.Species = '';
	this.Name = null;
	this.Parents = null;
	this.Children = null;
	this.BirthDay = null;
	this._Colour = null;
	this._Size = null;
	this._Shape = null;
	this._Speed = null;
	this._Agression = null;
	this._Bravery = null;
	this._Fitness = 0;
	this._FieldOfVisionRadius = 100;
	this._HasMated = false;
	this.initAnimal = function(chromosome) {
		if (typeof(chromosome) == "undefined") 
		{
			this.Chromosome = new Chromosome();
		}
		else {
			this.Chromosome = chromosome;
		}

		this.Id = MathsHelper.GenerateGuid();

		this.Name = new Array();

		this.Name.push(chance.first());
		this.Name.push(chance.last());
		this.BirthDay = new Date();	
		this.Children = new Array();	
		this.Energy = 100;
		//Events.RaiseEvent(Events.Birth, { "detail" : this });
	};
	this.Age = function() {
		return MathsHelpers.DateDiff("s", God.Hands.World.StartTime, this.BirthDay);
	},
	this.Colour = function() {

		if (this._Colour != null) {
			return this._Colour;
		}

		var colourString = [],
			componentIndex = 0,
			genes = this.Chromosome.GenesOfType(GeneTypes.Colour);
			
		for (var n = 0; n < genes.length; n += 1) {
			
			var gene = genes[n];

			if (gene.GeneType == GeneTypes.Colour) {
				
				var colourComponent = MathsHelper.ConvertBase(gene.toString(), 2, 16);

				colourString[componentIndex] = colourComponent.length == 1 ? "0" + colourComponent : colourComponent;				
				componentIndex +=1;
			}
			if (componentIndex >= 3) {
				break;
			}

		}

		this._Colour = "#" + colourString[0] + colourString[1] + colourString[2];
		return this._Colour;
	};
	this.Size = function() {

		if (this._Size != null) {
			return this._Size;
		}

		var size = new Location(),
			genes = this.Chromosome.GenesOfType(GeneTypes.Size);

		size.X = MathsHelper.ConvertBase(genes[0].toString(), 2, 10);
		size.Y = MathsHelper.ConvertBase(genes[1].toString(), 2, 10);

		this._Size = size;
		return this._Size;
	};
	this.Shape = function() {

		if (this._Shape != null) {
			return this._Shape;
		}

		var shape = [],
			genes = this.Chromosome.GenesOfType(GeneTypes.Shape);

		for (var n = 0; n < genes.length; n += 1) {
			var gene = genes[n];
			shape.push(Number(MathsHelper.ConvertBase(gene.toString(), 2, 10)));
		}

		this._Shape = shape;
		return this._Shape;
	},
	this.Speed = function() {
		if (this._Speed != null) {
			return this._Speed;
		}

		var genes = this.Chromosome.GenesOfType(GeneTypes.Speed);
			
		this._speed = Number(MathsHelper.ConvertBase(genes[0].toString(), 2, 10));
		return this._speed;	
	},
	this.Move = function() {

		var direction,
			canSee = this.FilterFamily(this.CanSee()),
			mostAttractive;// = MathsHelper.GenerateRandomNumber(0, 3);

		for(var n = 0; n < canSee.length; n+=1 )
		{
			if (canSee[n].animal.Species == this.Species) {
				if (mostAttractive == null || 
					(canSee[n].animal.Fitness() > mostAttractive.animal.Fitness()&& canSee[n].animal.Name[1] != this.Name[1])) {
					mostAttractive = canSee[n];
				}
			}	
		}

		if (mostAttractive != null ) {

			if (mostAttractive.distance < 2) {
				this.Reproduce(mostAttractive.animal);				
			}

			this.MoveTowards(mostAttractive.animal.Location.X, mostAttractive.animal.Location.Y);
			this.CorrectLocationForWorldCurvature();
		} else {
			
		}
		Events.RaiseEvent(Events.Moved, { "detail" :{ "direction" : direction, "animal" : this }});

	};
	this.MoveRandom = function() {
		var direction = MathsHelper.GenerateRandomNumber(0, 3),
			speed = this.Speed();

		switch (direction) {
			case Direction.North :
			this.Location.Y = this.Location.Y > 0 ? this.Location.Y -= speed : God.Hands.World.Options.Height;			
			break;

			case Direction.South :
			this.Location.Y = this.Location.Y < God.Hands.World.Options.Height ? this.Location.Y += speed : 0;
			break;

			case Direction.East :
			this.Location.X = this.Location.X < God.Hands.World.Options.Width ? this.Location.X += speed : 0;			
			break;

			case Direction.West :
			this.Location.X = this.Location.X > 0 ? this.Location.X -= speed : God.Hands.World.Options.Width;			
			break;

		}
		Events.RaiseEvent(Events.Moved, { "detail" :{ "animal" : this }});
	};
	this.MoveTowards = function(x, y) {

		var speed = this.Speed(),
			yOffSet = 0,
			xOffSet = 0;

		if (this.Location.Y - y < speed) {
			yOffSet = speed - this.Location.Y;
		}

		if (this.Location.Y > y) {
			this.Location.Y -= speed;
		} else if (this.Location.Y < y) {
			this.Location.Y += speed;
		}

		if (this.Location.X > x) {
			this.Location.X -= speed;
		} else if (this.Location.X < x) {
			this.Location.X +=speed ;
		}
		Events.RaiseEvent(Events.Moved, { "detail" :{ "animal" : this }});
	};
	this.MoveAway = function(x, y) {
		
		var speed = this.Speed();
		
		if (this.Location.Y > y) {
			this.Location.Y += speed;
		} else if (this.Location.Y < y) {
			this.Location.Y -= speed;
		}

		if (this.Location.X > x) {
			this.Location.X += speed;
		} else if (this.Location.X < X) {
			this.Location.X -=speed ;
		}
		Events.RaiseEvent(Events.Moved, { "detail" :{ "animal" : this }});
	};
	this.CorrectLocationForWorldCurvature = function() {
		if (this.Location.Y > God.Hands.World.Options.Height) {
			this.Location.Y = 0;
		}
		if (this.Location.X > God.Hands.World.Options.Width) {
			this.Location.X = 0;
		}
		if (this.Location.Y < 0){
			this.Location.Y = God.Hands.World.Options.Height;
		}
		if (this.Location.X < 0) {
			this.Location.X = God.Hands.World.Options.Width;
		}
	};
	this.FindMate = function (canSee) {
		var mate,
			potentials = this.FilterFamily(canSee);

		for (var n = 0; n < potentials.length; n += 1) {	

			if (potentials[n].animal == undefined) {
				continue;
			}

			if (potentials[n].animal.Species == this.Species) {
				if (mate == undefined || potentials[n].animal.Fitness() > mate.animal.Fitness()) {
					mate = potentials[n];
				}
			}
		}

		return mate;
	};
	this.Reproduce = function(mate) {

		if (!mate instanceof Animal) {
			console.log('wtf');
			return;
		}		

		if (mate.Species != this.Species) {			
			return;
		}

		if (this.IsFamilyOf(mate)) {
			return;
		}

		var mother = this.Chromosome.Clone(),
			father = mate.Chromosome.Clone(),
			offspring = [];
		
		var splitPoint = MathsHelper.GenerateRandomNumber(0, mother.Genes.length -1);

		//console.log("split point: " + splitPoint);

		var motherHalves = mother.Split(splitPoint),
			fatherHalves = father.Split(splitPoint);

		//console.log("mother split");
		//console.log(motherHalves.first.toString());
		//console.log(motherHalves.second.toString());

		//console.log("father split");
		//console.log(fatherHalves.first.toString());
		//console.log(fatherHalves.second.toString());

		var firstChildChromosome = new Chromosome(motherHalves.first.concat(fatherHalves.second)),
			secondChildChromosome = new Chromosome(fatherHalves.first.concat(motherHalves.second)),
			firstChild,
			secondChild;

		if (this.Species == Species.Carnivore) {
			firstChild = new Carnivore(firstChildChromosome);
			secondChild = new Carnivore(secondChildChromosome);
		} else {
			firstChild = new Herbivore(firstChildChromosome);
			secondChild = new Herbivore(secondChildChromosome);
		}

		firstChild.Name[1] = this.Name[1];
		secondChild.Name[1] = this.Name[1];

		firstChild.Location = new Location(this.Location.X, this.Location.Y);
		secondChild.Location = new Location(this.Location.X, this.Location.Y);

		firstChild.AddParents(this, mate);		
		secondChild.AddParents(this, mate);

		offspring.push(firstChild);
		offspring.push(secondChild);

		this.Children.push(firstChild, secondChild);		
		mate.Children.push(firstChild, secondChild);		

		Events.RaiseEvent(Events.Birth, { "detail" : { "animal" : firstChild } });
		Events.RaiseEvent(Events.Birth, { "detail" : { "animal" : secondChild } });

		return offspring;


	};
	this.AddParents = function(mother, father) {
		if (this.Parents == undefined) {
			this.Parents = [mother, father];			
		}
	},
	this.CanSee = function() {
		var animals = God.Hands.World.Life.Animals,
			plants = God.Hands.World.Life.Plants,
			canSee = [],
			distance;

		for (var n = 0; n < animals.length; n += 1) {
			
			if (animals[n].Id == this.Id) {
				continue;
			}

			distance = this.DistanceToObject(animals[n].Location.X, animals[n].Location.Y);

			if(distance <= this._FieldOfVisionRadius) {
				canSee.push({ "animal" : animals[n], "distance": distance });			
			}

		}

		for (var n = 0; n < plants.length; n += 1) {

			distance = this.DistanceToObject(plants[n].Location.X, plants[n].Location.Y);

			if(distance <= this._FieldOfVisionRadius) {
				canSee.push({ "plant" : plants[n], "distance": distance });			
			}
		}

		return canSee;
	};
	this.DistanceToObject = function(x, y) {

		var a = (x - this.Location.X),
			b = (y - this.Location.Y),
			c;

		c =  Math.sqrt((a * a) + (b * b));

		return c;
	};
	this.FilterFamily = function(animals) {

		var noFamily = [];

		for ( var n = 0; n < animals.length; n += 1) {			

			if (animals[n].Species == Species.Plant) {
				continue;
			}

			if (!this.IsFamilyOf(animals[n].animal)) {
				noFamily.push(animals[n]);
			}
		}
		return noFamily;
	};
	this.IsFamilyOf = function (animal) {
		
		var family = this.GetAncestors(this),
			animalFamily = this.GetAncestors(animal);

		family = family.concat(this.GetAllChildrenOf(family));
		family = family.concat(this.GetAllChildrenOf([this]));

		animalFamily = animalFamily.concat(this.GetAllChildrenOf(animalFamily));
		animalFamily = animalFamily.concat(this.GetAllChildrenOf([animal]));

		for (var n = 0; n < family.length; n+=1){

			var thisAnimal = family[n];

			for(var i = 0; i < animalFamily.length; i += 1) {
				if (thisAnimal.Id == animalFamily[i].Id) {
					return true;
				}
			}


		}

		return false;
	};
	this.GetAllChildrenOf = function(animals) {

		var children = [];
	
		for(var n = 0; n < animals.length; n += 1) {

			if (animals[n] == undefined) {
				continue;
			}

			if (animals[n].Children == null) {
				continue;
			}

			children = children.concat(animals[n].Children);
			children = children.concat(this.GetAllChildrenOf(animals[n].Children));

		}
		
		return children;

	};
	this.GetAncestors = function(animal) {

		var ancestors = [];

		if (animal == undefined || animal.Parents == undefined) {
			return [];
		}
		
		ancestors = ancestors.concat(animal.Parents);
		ancestors = ancestors.concat(this.GetAncestors(animal.Parents[0]));
		ancestors = ancestors.concat(this.GetAncestors(animal.Parents[1]));

		return ancestors;

	};
	this.UseEnergy = function(value) {
		this.Energy -= value;
		if (this.Energy <= 0) {
			Events.RaiseEvent(Events.Death, {"detail": {animal : this } });
		}
	};
	this.toString = function() {
		return this.Chromosome.toString();
	};	
};

var Location = function(x, y) {
	this.X = x;
	this.Y = y;
	this.toString = function() {
		//return this.X + "," + this.Y;
		return JSON.stringify(this);
	}
}


/*var mum = new Animal();
var dad = new Animal();
console.log("mum:  " + mum.Chromosome.toString());
console.log("dad:  " + dad.Chromosome.toString());

var offspring = mum.Reproduce(dad);

console.log(offspring);

console.log("child1: " + offspring[0].Chromosome.toString());
console.log("child2: " + offspring[1].Chromosome.toString());

console.log("mum after:  " + mum.Chromosome.toString());
console.log("dad after:  " + dad.Chromosome.toString());
*/