/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "./index.css";

import { $isCodeHighlightNode } from "@lexical/code";
import { $isAtNodeEnd } from "@lexical/selection";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister, $insertNodeToNearestRoot } from "@lexical/utils";
import {
	$createParagraphNode,
	$createTextNode,
	$getSelection,
	$isParagraphNode,
	$isRangeSelection,
	$isTextNode,
	$setSelection,
	COMMAND_PRIORITY_EDITOR,
	COMMAND_PRIORITY_LOW,
	FORMAT_TEXT_COMMAND,
	LexicalCommand,
	LexicalEditor,
	SELECTION_CHANGE_COMMAND,
	createCommand,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { createPortal } from "react-dom";

import { getSelectedNode } from "./utils/getSelectedNode";
import { setFloatingElemPosition } from "./utils/setFloatingElemPosition";
import { getDOMRangeRect } from "./utils/getDomRangeRect";
import { dummy } from "../../data/dummy";
import { ACTION_TYPE } from "../../components/FeedbackBoard/FeedbackBoard";
import { colors } from "../../data/color";

export const INSERT_INLINE_COMMAND = createCommand("INSERT_INLINE_COMMAND");

export const CUSTOM_COMMAND = createCommand("CUSTOM_COMMAND");

function TextFormatFloatingToolbar({
	editor,
	anchorElem,
	isLink,
	isBold,
	isItalic,
	isUnderline,
	isCode,
	isStrikethrough,
	isSubscript,
	isSuperscript,
	proxonas,
	actions,
	onAction,
}) {
	const popupCharStylesEditorRef = useRef(null);

	const [selection, setSelection] = useState();

	const [selectedAction, setSelectedAction] = useState("");

	const insertLink = useCallback(() => {
		if (!isLink) {
			editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
		} else {
			editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
		}
	}, [editor, isLink]);

	const insertComment = () => {
		editor.dispatchCommand(INSERT_INLINE_COMMAND, undefined);
	};

	function mouseMoveListener(e) {
		if (
			popupCharStylesEditorRef?.current &&
			(e.buttons === 1 || e.buttons === 3)
		) {
			if (popupCharStylesEditorRef.current.style.pointerEvents !== "none") {
				const x = e.clientX;
				const y = e.clientY;
				const elementUnderMouse = document.elementFromPoint(x, y);

				if (!popupCharStylesEditorRef.current.contains(elementUnderMouse)) {
					// Mouse is not over the target element => not a normal click, but probably a drag
					popupCharStylesEditorRef.current.style.pointerEvents = "none";
				}
			}
		}
	}
	function mouseUpListener(e) {
		if (popupCharStylesEditorRef?.current) {
			if (popupCharStylesEditorRef.current.style.pointerEvents !== "auto") {
				popupCharStylesEditorRef.current.style.pointerEvents = "auto";
			}
		}
	}

	useEffect(() => {
		if (popupCharStylesEditorRef?.current) {
			document.addEventListener("mousemove", mouseMoveListener);
			document.addEventListener("mouseup", mouseUpListener);

			return () => {
				document.removeEventListener("mousemove", mouseMoveListener);
				document.removeEventListener("mouseup", mouseUpListener);
			};
		}
	}, [popupCharStylesEditorRef]);

	const updateTextFormatFloatingToolbar = useCallback(() => {
		const selection = $getSelection();
		setSelection(selection);

		const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
		const nativeSelection = window.getSelection();

		if (popupCharStylesEditorElem === null) {
			return;
		}

		const rootElement = editor.getRootElement();
		if (
			selection !== null &&
			nativeSelection !== null &&
			!nativeSelection.isCollapsed &&
			rootElement !== null &&
			rootElement.contains(nativeSelection.anchorNode)
		) {
			const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

			setFloatingElemPosition(
				rangeRect,
				popupCharStylesEditorElem,
				anchorElem,
				isLink
			);
		}
	}, [editor, anchorElem, isLink]);

	useEffect(() => {
		const scrollerElem = anchorElem.parentElement;

		const update = () => {
			editor.getEditorState().read(() => {
				updateTextFormatFloatingToolbar();
			});
		};

		window.addEventListener("resize", update);
		if (scrollerElem) {
			scrollerElem.addEventListener("scroll", update);
		}

		return () => {
			window.removeEventListener("resize", update);
			if (scrollerElem) {
				scrollerElem.removeEventListener("scroll", update);
			}
		};
	}, [editor, updateTextFormatFloatingToolbar, anchorElem]);

	useEffect(() => {
		editor.getEditorState().read(() => {
			updateTextFormatFloatingToolbar();
		});
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					updateTextFormatFloatingToolbar();
				});
			}),

			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				() => {
					updateTextFormatFloatingToolbar();
					return false;
				},
				COMMAND_PRIORITY_LOW
			)
		);
	}, [editor, updateTextFormatFloatingToolbar]);

	const excuteAction = async (action, proxona, content, ss) => {
		try {
			const res = await onAction(action, proxona, content);
			editor.update(() => {
				const highlight = $createTextNode(
					selectedAction === `suggestion` ? `${content}` : `${content}`
				).setStyle(`background-color: ${colors[proxona.idx]}`);
				ss.insertNodes([highlight]);
				// ss.insertText(selectedAction === `append` ? `${content} ${res}` : res);
			});
		} catch (err) {
			console.error("Error executing action", err);
		} finally {
			editor.setEditable(true);
		}
	};

	return (
		<div ref={popupCharStylesEditorRef} className="floating-text-format-popup">
			{editor.isEditable()
				? selectedAction &&
				  Object.values(Object.fromEntries(actions)).indexOf(selectedAction) >
						-1
					? proxonas.map((proxona) => (
							<button
								type="button"
								onClick={() => {
									editor.update(() => {
										const ss = $getSelection();
										const content = ss.getTextContent();
										excuteAction(selectedAction, proxona, content, ss);
										editor.setEditable(false);
										return true;
									});
								}}
								className={"popup-item"}
								aria-label="Insert link"
								style={{ backgroundColor: colors[proxona.idx] }}
							>
								{proxona.name}
							</button>
					  ))
					: actions.map((action) => (
							<button
								type="button"
								onClick={() => {
									setSelectedAction(action[1]);
									editor.update(() => {
										const ss = $getSelection();
									});
								}}
								className={"popup-item"}
								aria-label="Insert link"
							>
								{action[0]}
							</button>
					  ))
				: null}
		</div>
	);
}

function useFloatingTextFormatToolbar(
	editor,
	anchorElem,
	proxonas,
	actions,
	onAction
) {
	const [isText, setIsText] = useState(false);
	const [isLink, setIsLink] = useState(false);
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);
	const [isSubscript, setIsSubscript] = useState(false);
	const [isSuperscript, setIsSuperscript] = useState(false);
	const [isCode, setIsCode] = useState(false);

	const updatePopup = useCallback(() => {
		editor.getEditorState().read(() => {
			// Should not to pop up the floating toolbar when using IME input
			if (editor.isComposing()) {
				return;
			}
			const selection = $getSelection();
			const nativeSelection = window.getSelection();
			const rootElement = editor.getRootElement();

			if (
				nativeSelection !== null &&
				(!$isRangeSelection(selection) ||
					rootElement === null ||
					!rootElement.contains(nativeSelection.anchorNode))
			) {
				setIsText(false);
				return;
			}

			if (!$isRangeSelection(selection)) {
				return;
			}

			const node = getSelectedNode(selection);

			// Update text format
			setIsBold(selection.hasFormat("bold"));
			setIsItalic(selection.hasFormat("italic"));
			setIsUnderline(selection.hasFormat("underline"));
			setIsStrikethrough(selection.hasFormat("strikethrough"));
			setIsSubscript(selection.hasFormat("subscript"));
			setIsSuperscript(selection.hasFormat("superscript"));
			setIsCode(selection.hasFormat("code"));

			// Update links
			const parent = node.getParent();
			if ($isLinkNode(parent) || $isLinkNode(node)) {
				setIsLink(true);
			} else {
				setIsLink(false);
			}

			if (
				!$isCodeHighlightNode(selection.anchor.getNode()) &&
				selection.getTextContent() !== ""
			) {
				setIsText($isTextNode(node) || $isParagraphNode(node));
			} else {
				setIsText(false);
			}

			const rawTextContent = selection.getTextContent().replace(/\n/g, "");
			if (!selection.isCollapsed() && rawTextContent === "") {
				setIsText(false);
				return;
			}
		});
	}, [editor]);

	useEffect(() => {
		document.addEventListener("selectionchange", updatePopup);
		return () => {
			document.removeEventListener("selectionchange", updatePopup);
		};
	}, [updatePopup]);

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(() => {
				updatePopup();
			}),
			editor.registerRootListener(() => {
				if (editor.getRootElement() === null) {
					setIsText(false);
				}
			})
		);
	}, [editor, updatePopup]);

	if (!isText) {
		return null;
	}

	return createPortal(
		<TextFormatFloatingToolbar
			editor={editor}
			anchorElem={anchorElem}
			isLink={isLink}
			isBold={isBold}
			isItalic={isItalic}
			isStrikethrough={isStrikethrough}
			isSubscript={isSubscript}
			isSuperscript={isSuperscript}
			isUnderline={isUnderline}
			isCode={isCode}
			proxonas={proxonas}
			actions={actions}
			onAction={onAction}
		/>,
		anchorElem
	);
}

export default function FloatingToolbarPlugin({
	anchorElem = document.body,
	proxonas = proxonas,
	actions = Object.values(ACTION_TYPE),
	onAction,
}) {
	const [editor] = useLexicalComposerContext();
	return useFloatingTextFormatToolbar(
		editor,
		anchorElem,
		proxonas,
		actions,
		onAction
	);
}
