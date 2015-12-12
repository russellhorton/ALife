var GeneTypes = {
		Colour : 1,
		Size : 2,
		Shape : 3
	};

var GeneLength = function(geneType) {
	switch (geneType) {
		case GeneTypes.Colour : 
		return 8;
		
		case GeneTypes.Size :
		return 3;

		case GeneTypes.Shape : 
		return 4;

		default :
		return 8;
	}
}

var Gene = function(geneType) {
	this.GeneType = 0;
	this.Code = '';	
	this.GeneLength = 0;
	this.ProbabilityOfMutation = 0.01;
	this.Init = function(geneType) {		
		
		this.GeneType = geneType;	
		this.GeneLength = GeneLength(geneType);

		for (var n = 1; n <= this.GeneLength; n+=1) {
			this.Code += MathsHelper.GenerateRandomNumber(0,1);
		}

	};
	this.Clone = function() {
		var clone = new Gene(this.GeneType);
		clone.Code = this.Code;
		clone.Mutate();
		return clone;
	}
	this.Mutate = function() {

		var newGeneCode = '';

		for (var n = 0; n < this.GeneLength; n+=1) {

			if (MathsHelper.BiasCoinThrow(this.ProbabilityOfMutation)) {				
				newGeneCode += this.FlipBit(this.Code.substr(n,1))
			} else {
				newGeneCode += this.Code.substr(n,1);
			}

		}
		this.Code = newGeneCode;
	}
	this.FlipBit = function (bit) {
		if (bit == 0)
			return 1;

		return 0;
	}
	this.toString = function(){
		return this.Code;
	}
	this.Init(geneType);
}

/*var blah = new Gene(GeneTypes.Colour);
console.log(blah.Code);*/