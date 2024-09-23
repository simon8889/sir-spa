type SIRParameters = {
	infection: number
	recuperation: number
	population: number
	infected: number
}

type SIR = {
	S: number
	I: number 
	R: number
}

type SIRApiData = {
	data: SIR[]
}