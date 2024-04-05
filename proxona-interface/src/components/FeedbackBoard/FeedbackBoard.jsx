import React, { useCallback } from "react";
import { useEffect, useState, useRef } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import FloatingToolbarPlugin from "../../plugins/FloatingToolbarPlugin";
import CodeHighlightPlugin from "../../plugins/CodeHighlightPlugin";
// import { dummy } from "../../data/dummy";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { Typography } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { port } from "../../data/port";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function useDebouncedLexicalOnChange(getEditorState, callback, delay) {
	const lastPayloadRef = React.useRef(null);
	const callbackRef = React.useRef(callback);
	React.useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);
	const callCallbackWithLastPayload = React.useCallback(() => {
		if (lastPayloadRef.current) {
			callbackRef.current?.(lastPayloadRef.current);
		}
	}, []);
	const call = useDebouncedCallback(callCallbackWithLastPayload, delay);
	const onChange = React.useCallback(
		(editorState) => {
			editorState.read(() => {
				lastPayloadRef.current = getEditorState(editorState);
				call();
			});
		},
		[call, getEditorState]
	);
	return onChange;
}

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
	"What are your thoughts on this part?": "EVALUATION",
	"How can I revise/improve this part?": "SUGGESTION",
};

export default function FeedbackBoard(props) {
	const { plot, messages, setMessages } = props;
	const { handleId } = useParams();

	if (!plot || !plot.draft) {
		return <Typography>loading..</Typography>;
	}
	return <Editor {...props} />;
}

const Editor = ({
	handleId,
	plot,
	proxonas,
	createFeedback,
	messages,
	setMessages,
	botIsLoading,
	setBotIsLoading,
}) => {
	const { draft } = plot;

	// console.log(handleId);

	const initEditor = (editor) => {
		if (draft) {
			const root = $getRoot();
			const p = $createParagraphNode();
			p.append($createTextNode(draft));
			root.append(p);
		}
	};

	const initialConfig = {
		editorState: initEditor,
		namespace: "MyEditor",
		onError,
	};

	const actions = Object.entries(ACTION_TYPE);
	const [editorState, setEditorState] = useState();
	const { username, handle } = useSelector((state) => state.loginInfo);

	const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);

	const onRef = (_floatingAnchorElem) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem);
		}
	};

	const handleAction = async (actionType, proxona, content) => {
		setBotIsLoading(true);
		try {
			const res = await createFeedback({
				mode: actionType,
				proxona_name: proxona.name,
				dragged: content,
			});

			if (res) {
				// console.log(res.data);

				setMessages([
					...messages,
					{
						who: "me",
						text: (
							<>
								{`@${proxona.name}`} <b>'{content}'</b>{" "}
								{actionType == "EVALUATION"
									? "What are your thoughts on this part?"
									: "How can I revise/improve this part?"}
							</>
						),
					},
					{ who: res.data.proxona["name"], text: res.data.feedback },
				]);
				setBotIsLoading(false);
				return res.data.feedback;
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getEditorState = (editorState) => ({
		text: $getRoot().getTextContent(false),
		stateJson: JSON.stringify(editorState),
	});

	const savePlot = async (draft) => {
		// console.log(draft);
		const res = await axios.patch(
			port + `youtube_api/${username}/${handleId}/plot/${plot.id}/`,
			{
				draft,
			}
		);
	};

	const debouncedOnChange = useCallback((value) => {
		// console.log(new Date(), value);
		savePlot(value.text);
	}, []);

	const onChange = useDebouncedLexicalOnChange(
		getEditorState,
		debouncedOnChange,
		1000
	);

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<RichTextPlugin
				contentEditable={
					<div ref={onRef} style={{ position: "relative", height: "100%" }}>
						<ContentEditable style={{ height: "100%", padding: "16px" }} />
					</div>
				}
			/>
			<HistoryPlugin />
			<OnChangePlugin onChange={onChange} />
			{floatingAnchorElem && (
				<FloatingToolbarPlugin
					anchorElem={floatingAnchorElem}
					onAction={handleAction}
					proxonas={proxonas}
					actions={actions}
				/>
			)}
		</LexicalComposer>
	);
};
