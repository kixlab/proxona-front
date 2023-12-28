import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Stack,Button } from "@mui/material";
import "./FeedbackDraft.css";

export const FeedbackDraft = ({
    topic,
    draft,
    proxonas,
    goToNext,
    goToPrev
}) => {
    return (
        <div className="feedback-draft-container">
            <>
                <Stack
                    // alignItems={'center'}
                    marginBottom={'20px'}

                >
                    <h2>{`___ 님의 채널 성격에 맞춰 초안을 준비해봤어요.`}</h2> 
                    <p>{`이제 PROXONA의 피드백을 받아 비디오를 구체적으로 플래닝해봐요. `}</p>
                    <Stack
                        sx={{
                            boxShadow: '2px 4px 16px 0px rgba(0, 0, 0, 0.25)'
                        }}
                        p={2}
                    >
                        <h3>{topic}</h3>
                        <p>{draft}</p>
                    </Stack>
                    
                </Stack>
                <button className="button-prev" onClick={goToPrev}>
                    이전
                </button>
                <button className="button-next" onClick={goToNext}>
                    다음
                </button>
            </>
        </div>
    );
};
