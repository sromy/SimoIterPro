export interface Filter {
    userId :string;
	startDate?:Date;	
	endDate?:Date;	
	minTotal?: number;
	maxTotal?: number;	
}