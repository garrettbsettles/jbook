import './code-cell.css'
import {useEffect } from "react";
import { Cell } from '../state/models';
import { useActions} from '../hooks/use-actions'
import {useTypedSelector} from '../hooks/use-typed-selector';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell: {cellType, content, id}}) => {
	const {updateCell, createBundle} = useActions();
	const bundle = useTypedSelector((state) => state.bundles[id]);
	const cumulativeCode = useCumulativeCode(id);

	useEffect(() => {
		//debounce
		if(!bundle) {
			createBundle(id, cumulativeCode)
			return;
		}

		const timer = setTimeout(async() => {
			createBundle(id, cumulativeCode)
		}, 750)

		return () => {
			clearTimeout(timer)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cumulativeCode, id, createBundle])

	return (
		<Resizable direction="vertical" >
			<div style={{
				height: 'calc(100% - 10px)',
				display: 'flex',
				flexDirection: 'row'
			}}>
				<Resizable
					direction="horizontal"
				>
					<CodeEditor
						initialValue={content} onChange={value => updateCell(id, value)}
					/>
				</Resizable>
				<div className="progress-wrapper">
			{
				!bundle || bundle.loading
					?	<div className="progress-cover">
							<progress
								className="progress is-small is-primary"
								max="100"
							>
								Loading
							</progress>
						</div>
					: <Preview code={bundle.code} err={bundle.err}/>
			}
			</div>
			</div>
		</Resizable>
	)
};

export default CodeCell;