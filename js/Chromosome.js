/// <reference path="MathsHelper.js"/>
/// <reference path="Gene.js"/>
/// <reference path="Definitions.js"/>

var Chromosome = function(geneSequence) {
	this.Options = {		
		GeneMakeup : { Colour: 3, Size: 2, Shape: 8, Agression: 1, Speed: 1, Bravery: 1 }
	}
	this.Genes = [],
	this.Init = function(geneSequence) {

		if (typeof(geneSequence) != 'undefined') {
			this.Genes = geneSequence;
		} else  {
			
			for (var geneType in GeneTypes) {
				this.AddGenes(GeneTypes[geneType], this.Options.GeneMakeup[geneType]);
			}
			/*
			this.AddGenes(GeneTypes.Colour, this.Options.GeneMakeup.Colour);
			this.AddGenes(GeneTypes.Size, this.Options.GeneMakeup.Size);
			this.AddGenes(GeneTypes.Shape, this.Options.GeneMakeup.Shape);*/
		}
		
	};
	this.AddGenes = function(type, number) {
		for (var n = 1; n <= number; n+=1){
			this.Genes.push(new Gene(type));
		}
	};
	this.GenesOfType = function(geneType) {
		var genes = [];
		
		for (var n = 0; n < this.Genes.length; n+=1) {
			if (this.Genes[n].GeneType == geneType) {
				genes.push(this.Genes[n]);
			}
		}

		return genes;
	};
	this.toString = function() {
		var completeString = '';
		for (var n = 0; n < this.Genes.length; n+=1){		
			completeString += this.Genes[n].toString();
		}
		return completeString;
	};
	this.Split = function(splitPoint) {
		var halves = { first : [], second : []};

		halves.first = this.Genes.slice(0, splitPoint);
		halves.second = this.Genes.slice(splitPoint, this.Genes.length);

		return halves;

	};
	this.Clone = function() {
		var clonedGenes = [];

		for(var n = 0; n < this.Genes.length; n+=1) {
			clonedGenes.push(this.Genes[n].Clone());
		}
		var newChromosome = new Chromosome(clonedGenes);		

		return newChromosome;
	};
	this.Init(geneSequence);
}

var chrom = new Chromosome();
console.log(chrom.toString());