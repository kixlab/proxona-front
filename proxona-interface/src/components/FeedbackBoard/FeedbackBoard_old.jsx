// import React, { useState } from 'react';
// import { plotDraft } from '../../data/plotDraft.js'; 
// import './FeedbackBoard.css';

// // 사용자 이름의 버튼 목록입니다.
// const userNames = ['Alice', 'Bob', 'Charlie'];

// export const FeedbackBoard = () => {
//   // plotDraft.js에서 가져온 초기 데이터로 상태를 설정합니다.
//   const [paragraphs, setParagraphs] = useState(plotDraft);
//   const [activeIndex, setActiveIndex] = useState(null);

//   const [editMode, setEditMode] = useState(Array(paragraphs.length).fill(false));


//   // 사용자 관점을 추가하는 함수입니다.
//   const addUserViewpoint = (index, userName) => {
//     let updatedParagraphs = [...paragraphs];
//     updatedParagraphs[index].text += ` [${userName}'s viewpoint]`;
//     setParagraphs(updatedParagraphs);
//     setActiveIndex(null); // 선택 해제
//   };


//   const handleParagraphChange = (event, index) => {
//     const updatedParagraphs = [...paragraphs];
//     updatedParagraphs[index].text = event.target.value;
//     setParagraphs(updatedParagraphs);
//   };

//   const toggleEditMode = (index) => {
//     let updatedEditMode = [...editMode];
//     updatedEditMode[index] = !updatedEditMode[index];
//     setEditMode(updatedEditMode);
//   };

//   return (
//     <div className="text-editor">
//       {paragraphs.map((paragraph, index) => (
//         <div key={index} className="paragraph-container">
//           {editMode[index] ? (
//             <textarea
//               value={paragraph.text}
//               onChange={(event) => handleParagraphChange(event, index)}
//               onBlur={() => toggleEditMode(index)}
//             />ㅋ
//           ) : (
//             <div onClick={() => toggleEditMode(index)}>
//               {paragraph.text || "클릭하여 편집하세요..."}
//             </div>
//           )}
//           <button onClick={() => setActiveIndex(index)}>+</button>
//           {activeIndex === index && (
//             <div className="user-viewpoint-options">
//               {userNames.map((userName) => (
//                 <button
//                   key={userName}
//                   onClick={() => addUserViewpoint(index, userName)}
//                 >
//                   {userName}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };