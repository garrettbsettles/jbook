import './preview.css'
import { useEffect, useRef } from 'react';

interface PreviewProps {
	code: string;
	err: string;
}

const script = () => {
	//@ts-ignore
	const handleError = (message) => {
		const root = document.querySelector<HTMLDivElement>('#root')
		const style = 'color: red;'
		//@ts-ignore
		root.innerHTML =
			`<div style="${style}">
				<h4>Runtime Error</h4>
				${message}
			</div>`;
		console.error(message);
	};

	window.addEventListener('error', (event) => {
		event.preventDefault();
		handleError(event.message);
	});

	window.addEventListener('message', (event) => {
		// eslint-disable-next-line no-eval
		try {eval(event.data)}
		catch(err){handleError(err)}
	}, false)
}

const html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8"/>
			<title>Document</title>
			<style>html {background-color: white;}</style>
		</head>
		<body>
			<div id="root"></div>
			<script>(${script.toString()})();</script>
		</body>
		</html>
	`;

const Preview: React.FC<PreviewProps> = ({code, err}) => {
	const iframe = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		iframe.current!.srcdoc = html;
		setTimeout(() => {
			iframe.current?.contentWindow?.postMessage(
				code,
				"*"
			);
		}, 50);

	}, [code])

	return (
		<div className="preview-wrapper">
			<iframe
				title="preview"
				srcDoc={html}
				ref={iframe}
				sandbox="allow-scripts"
			/>
			{err && <div className="preview-error">{err}</div>}
		</div>
	)
}

export default Preview
