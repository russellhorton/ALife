importScripts('lib/chance.min.js','Definitions.js', 'Events.js', 'MathsHelper.js', 'Gene.js', 'Chromosome.js','Plant.js','Animal.js', 'Carnivore.js', 'Herbivore.js', 'World.js'); 

var God = {
	Options : {
		MaximumCycles : 500
	},
	Hands : {
		World : null
	},
	Init: function() {
		God.EventHandlers.Init();
		God.Hands.World = new World();
		console.log(God.Hands.World.toString());
		God.GuideFollowers();
	},
	GuideFollowers: function() {

		var Animals = God.Hands.World.Life.Animals,
			Plants = God.Hands.World.Life.Plants,
			animalIndex = 0,
			plantIndex = 0,
			iteration = 0;

		var cycle = setInterval(function() {

			if (animalIndex >= Animals.length) {

				animalIndex = 0;
				iteration += 1;
				
				Events.RaiseEvent(Events.EndofIteration , null)
			}

			if (iteration > God.Options.MaximumCycles) {
				console.log("end");
				console.log(God.Hands.World.toString());
				clearInterval(cycle);
			}

			Animals[animalIndex].DecideAction();
			animalIndex += 1;

			Plants[plantIndex].Grow();
			plantIndex = plantIndex >= Plants.length -1 ? 0 : plantIndex + 1;

		}, 0.5); 		

	},
	EventHandlers : {
		Init: function() {
			Events.AddListener(Events.Birth, God.EventHandlers.Birth);
			Events.AddListener(Events.Moved, God.EventHandlers.Moved);
			Events.AddListener(Events.EndofIteration, God.EventHandlers.EndofIteration);
			Events.AddListener(Events.Death, God.EventHandlers.Death);
			Events.AddListener(Events.PlantGrowth, God.EventHandlers.PlantGrowth);
		},
		Birth: function(e) {
			//self.postMessage(e.detail);
			console.log("birth : " + e.detail.animal.Name + "(" + e.detail.animal.Species + ")");
			var message = {"Event": Events.Birth, "Id" : e.detail.animal.Id, "Colour" : e.detail.animal.Colour(), "Shape" : e.detail.animal.Shape(), "Size" : e.detail.animal.Size(), "Location" :  e.detail.animal.Location};
			God.Hands.World.Life.Animals.push(e.detail.animal);			
			self.postMessage(JSON.stringify(message));
		},
		Moved: function(e) {
			var message = {"Event": Events.Moved, "Id" : e.detail.animal.Id, "Colour" : e.detail.animal.Colour(), "Shape" : e.detail.animal.Shape(), "Size" : e.detail.animal.Size(), "Location" :  e.detail.animal.Location};
			self.postMessage(JSON.stringify(message));
			//console.log("moved : " + e.detail.direction + " (" + e.detail.animal.Location.toString() + ")");
		},
		Death: function(e) {
			console.log("death : " + e.detail.animal.Name + "(" + e.detail.animal.Species + ")");
			var message = { "Event": Events.Death, "Id" : e.detail.animal.Id, "Colour" : "#000000", "Shape" : e.detail.animal.Shape(), "Size" : e.detail.animal.Size(), "Location" :  e.detail.animal.Location};
			var index = God.Hands.World.Life.Animals.indexOf(e.detail.animal);
			God.Hands.World.Life.Animals.splice(index, 1);
			self.postMessage(JSON.stringify(message))
		},
		PlantGrowth: function(e) {
			var message = { "Event": Events.PlantGrowth, "Id" : e.detail.Id, "Colour" : e.detail.Colour(), "Shape" : e.detail.Shape, "Location" :  e.detail.Location};
			self.postMessage(JSON.stringify(message));
		},
		EndofIteration: function(e) {

		}
	}

}

//big bang.0
God.Init();