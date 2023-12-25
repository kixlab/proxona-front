import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Stack,Button } from "@mui/material";

export const FeedbackDraft = ({
    topic,
    draft,
    proxonas,
    goToNext,
    goToPrev
}) => {
    return (
        <>
            <Stack
                alignItems={'center'}
            >
                <p>{`___ 님의 채널 성격에 맞게 초안을 준비해봤어요. 
이제 시청자의 피드백을 받아 비디오를 구체적으로 플래닝해봐요. `}</p>
                
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
            <Button variant="contained" onClick={goToPrev}>
                이전
            </Button>
            <Button variant="contained" onClick={goToNext}>
                다음
            </Button>
        </>

    );
};
