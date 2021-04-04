import './text-editor.css';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState, useRef } from 'react';
import { Cell } from '../state/models';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
	cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell: {content, id} }) => {
	const
		[editing, setEditing] = useState(false),
		editorRef = useRef<HTMLDivElement>(null),
		{updateCell} = useActions();

	useEffect(() => {
		const
			listener = (event: MouseEvent) => {
				const isEditor = !!editorRef.current?.contains(event?.target as Node);
				setEditing(isEditor);
			},
			setup = () => document.addEventListener('click', listener, {capture: true}),
			teardown = () => document.removeEventListener('click', listener, {capture: true})

		setup()
		return teardown;
	})

	const
		Editor =
		<div
			className="text-editor"
			ref={editorRef}
		>
			<MDEditor value={content} onChange={v => updateCell(id, v || '')}/>
		</div>,
	 	Preview =
		 <div
		 	className="text-editor card"
			 onClick={() => {setEditing(true)}}
		>
			<div className="card-content">
				<MDEditor.Markdown source={content || 'click to edit'}/>
			</div>
		</div>;

	if(editing) return Editor;
	else return Preview;

}

export default TextEditor
