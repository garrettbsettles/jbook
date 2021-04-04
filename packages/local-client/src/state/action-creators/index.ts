import {Dispatch} from 'redux';
import axios from 'axios';
import * as models from '../models'
import {ActionType} from '../action-types';
import * as Actions from '../actions';
import { CellTypes, Direction } from '../models';
import bundle from '../../bundler';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): Actions.UpdateCellAction  => ({
	type: ActionType.UPDATE_CELL,
	payload: {
		id,
		content
	}
});

export const deleteCell = (id: string): Actions.DeleteCellAction => ({
	type: ActionType.DELETE_CELL,
	payload: id
});

export const moveCell = (id: string, direction: Direction): Actions.MoveCellAction => ({
	type: ActionType.MOVE_CELL,
	payload: {
		id,
		direction
	}
});

export const insertCellAfter = (id: string | null, cellType: CellTypes): Actions.InsertCellAfter => ({
	type: ActionType.INSERT_CELL_AFTER,
	payload: {
		id,
		cellType
	}
});

export const createBundle = (cellId: string, input: string) => {
	return async (dispatch: Dispatch<Actions.Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellId
			}
		})

		const result = await bundle(input);

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellId,
				bundle: result
			}
		})
	}
}

export const fetchCells = () => {
	return async (dispatch: Dispatch<Actions.Action>) => {
		dispatch({type: ActionType.FETCH_CELLS })

		try {
			const {data}: {data: models.Cell[]} = await axios.get('/cells');
			dispatch({
				type: ActionType.FETCH_CELLS_COMPLETE,
				payload: data
			})
		} catch (error) {
			dispatch({
				type: ActionType.FETCH_CELLS_ERROR,
				payload: error.message
			})
		}
	}
}

export const saveCells = () => {
	return async (dispatch: Dispatch<Actions.Action>, getState: () => RootState) => {
		const {cells: {data,order}} = getState();
		const cells = order.map(id => data[id]);

		try {

			await axios.post('/cells', {cells});
		} catch (error) {
			dispatch({
				type: ActionType.SAVE_CELLS_ERROR,
				payload: error.message
			})
		}
	}
}