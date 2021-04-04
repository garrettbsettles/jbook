export interface Cell {
	id: string;
	cellType: CellTypes;
	content: string;
}
export type CellTypes = 'code' | 'text';
export type Direction = 'up' | 'down';