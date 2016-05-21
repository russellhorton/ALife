var GeneTypes = {
	Colour: 1,
	Size: 2,
	Shape: 3,
	Agression : 4,
	Speed: 5,
	Bravery: 6
}
	
var GeneLength = function(geneType) {
	switch (geneType) {
		case GeneTypes.Colour: 
		return 8;
		
		case GeneTypes.Size:
		return 3;

		case GeneTypes.Shape: 
		return 4;

		case GeneTypes.Agression:
		return 4;
		
		case GeneTypes.Speed:
		return 2;
		
		case GeneTypes.Bravery:
		return 4;

		default :
		return 8;
	}
}
	
var Direction = {
	North: 0,
	South: 1,
	East: 2,
	West: 3
}

var Species = {
	Carnivore: "Carnivore",
	Herbivore: "Herbivore",
	Plant: "Plant"
}

var Actions = {
	Move: 1,
	MoveTowards: 2,
	MoveAway: 3
}
