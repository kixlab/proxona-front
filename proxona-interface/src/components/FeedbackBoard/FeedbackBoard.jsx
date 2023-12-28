import React from 'react';
import { useEffect, useState } from 'react';
// import {$getRoot, $getSelection} from 'lexical';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// import { FloatingMenuPlugin } from "lexical-floating-menu";
import { FloatingMenuPlugin } from '../../plugins/FloatingMenuPlugin';
import { FloatingMenu } from "../FloatingMenu/FloatingMenu";

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
	function onChange(editorState) {
		setEditorState(editorState);
	}

	return (
		<div>
			<LexicalComposer initialConfig={initialConfig}>
				<RichTextPlugin
					placeholder={<div>Enter some text...</div>}
					contentEditable={<ContentEditable />}
				/>
				<HistoryPlugin />
				<OnChangePlugin onChange={onChange} />
				<FloatingMenuPlugin
					MenuComponent={FloatingMenu}
					element={document.body}
					offset={{
						x: 10
					}}
				/>
			</LexicalComposer>
			{/* <FloatingMenu></FloatingMenu> */}
		</div>

	);
}

// // export function FeedbackBoard(props) {
// //   return (
// //     <LexicalComposerContext initialConfig={props.config}>
// //       {/* ... other plugins (e.g. RichTextPlugin) */}
// //       <FloatingMenuPlugin
// //         MenuComponent={FloatingMenu}
// //         element={document.body}
// //       />
// //     </LexicalComposerContext>
// //   );
// // }