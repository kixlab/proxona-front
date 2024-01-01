import React from 'react';
import { useEffect, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import FloatingToolbarPlugin from '../../plugins/FloatingToolbarPlugin';
import { dummy } from '../../data/dummy';
import { sleep } from '../../utils/sleep';

function OnChangePlugin({ onChange }) {
	const [editor] = useLexicalComposerContext();
	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			onChange(editorState);
		});
	}, [editor, onChange]);
}

function onError(error) {
	console.error(error);
}

export const ACTION_TYPE = {
	"append": "APPEND",
	"switch": "SWITCH"
}

export default function FeedbackBoard() {
	const initialConfig = {
		namespace: 'MyEditor',
		onError,
	};

	const actions = Object.keys(ACTION_TYPE) 

	const [editorState, setEditorState] = useState();

	const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);

	const onRef = (_floatingAnchorElem) => {
		if (_floatingAnchorElem !== null) {
		  setFloatingAnchorElem(_floatingAnchorElem);
		}
	  };
	
	function onChange(editorState) {
		setEditorState(editorState);
	}

	const handleAction = async (actionType, proxona, content) => {
		await sleep(3000) // 함수는 여기에 
		return proxona.username
	}

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<RichTextPlugin
				placeholder={<div>Enter some text...</div>}
				contentEditable={
					<div ref={onRef} style={{position:'relative',height: '100%'}} >
						<ContentEditable style={{ height: '100%'}} />
					</div>
					
				}
			/>
			<HistoryPlugin />
			{floatingAnchorElem && (
				<FloatingToolbarPlugin
					anchorElem={floatingAnchorElem}
					onAction={handleAction}
					proxonas={dummy}
					actions={actions}
				/>
			)}
			
		</LexicalComposer>
	);
}