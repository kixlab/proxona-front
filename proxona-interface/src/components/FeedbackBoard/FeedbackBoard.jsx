import React from 'react';
import { useEffect, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { FloatingMenuPlugin } from '../../plugins/FloatingMenuPlugin';
import { FloatingMenu } from "../FloatingMenu/FloatingMenu";
import FloatingToolbarPlugin from '../../plugins/FloatingToolbarPlugin';

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

export default function FeedbackBoard() {
	const initialConfig = {
		namespace: 'MyEditor',
		onError,
	};

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

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<RichTextPlugin
				placeholder={<div>Enter some text...</div>}
				contentEditable={
					<div ref={onRef} style={{height: '100%'}} >
						<ContentEditable style={{height: '100%'}} />
					</div>
					
				}
			/>
			<HistoryPlugin />
			{floatingAnchorElem && (
				<FloatingToolbarPlugin
					anchorElem={floatingAnchorElem}
				/>
			)}
			
		</LexicalComposer>
	);
}