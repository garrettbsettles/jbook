import './resizable.css'
import {ResizableBox, ResizableBoxProps} from 'react-resizable';
import { useEffect, useState } from 'react';

interface ResizableProps extends Partial<ResizableBoxProps> {
	direction: 'horizontal' | 'vertical';

}
const Resizable: React.FC<ResizableProps> = ({
	direction,
	children,

}) => {

	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [width, setWidth] = useState(window.innerWidth * 0.75)

	useEffect(() => {
		let timer: any;
		const listener = () => {
			//debounce
			if(timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				// horizontal min constraint
				if(window.innerWidth * 0.75 < width) {
					setWidth(window.innerWidth * 0.75)
				}
			}, 100);
		}

		window.addEventListener('resize', listener)

		return () => {
			window.removeEventListener('resize', listener)
		}
	}, [width])

	let resizableProps: ResizableBoxProps;

	if(direction === 'horizontal') {
		resizableProps = {
			onResizeStop: (event, data) => {
				setWidth(data.size.width);
			},
			className: 'resize-horizontal',
			height: Infinity,
			width,
			resizeHandles: ['e'],
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
		}
	}
	else {
		// if (direction === 'vertical')
		resizableProps = {
			height: 300,
			width: Infinity,
			resizeHandles: ['s'],
			maxConstraints: [Infinity, innerHeight * 0.9],
			minConstraints: [Infinity, 24]
		}
	}

	return (
		<ResizableBox {...resizableProps}>
			{children}
		</ResizableBox>
	);
}

export default Resizable;