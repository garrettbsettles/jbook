import {ActionType} from '../action-types';
import * as models from '../models'

interface GenericAction {
	type: string;
	payload?: any;
}

export interface MoveCellAction extends GenericAction {
	type: ActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: models.Direction;
	}
}

export interface DeleteCellAction extends GenericAction {
	type: ActionType.DELETE_CELL;
	payload: string;
}

export interface InsertCellAfter extends GenericAction {
	type: ActionType.INSERT_CELL_AFTER;
	payload: {
		id: string | null;
		cellType: models.CellTypes;
	}
}

export interface UpdateCellAction extends GenericAction {
	type: ActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	}
}

export interface BundleStartAction extends GenericAction {
	type: ActionType.BUNDLE_START;
	payload: {
		cellId: string;
	}
}
export interface BundleCompleteAction extends GenericAction {
	type: ActionType.BUNDLE_COMPLETE;
	payload: {
		cellId: string;
		bundle: {
			code: string;
			err: string;
		}
	}
}

export interface FetchCellsAction extends GenericAction {
	type: ActionType.FETCH_CELLS;
}
export interface FetchCellsCompleteAction extends GenericAction {
	type: ActionType.FETCH_CELLS_COMPLETE;
	payload: models.Cell[];
}
export interface FetchCellsErrorAction extends GenericAction {
	type: ActionType.FETCH_CELLS_ERROR;
	payload: string;
}

export interface SaveCellsErrorAction extends GenericAction {
	type: ActionType.SAVE_CELLS_ERROR,
	payload: string;
}

export type Action = MoveCellAction
	| DeleteCellAction
	| InsertCellAfter
	| UpdateCellAction
	| BundleStartAction
	| BundleCompleteAction
	| FetchCellsAction
	| FetchCellsCompleteAction
	| FetchCellsErrorAction
	| SaveCellsErrorAction