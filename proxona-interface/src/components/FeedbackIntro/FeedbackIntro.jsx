import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Stack,Button } from "@mui/material";

export const FeedbackIntro = ({
    topic,
    setTopic,
    goToNext,
    isLoading
}) => {
    return (
        <>
            <Stack
                alignItems={'stretch'}
            >
                <h2>어떤 주제에 대한 비디오를 기획해볼까요?</h2>
                <p>비디오 주제를 입력하면 채널 성격에 맞는 초안을 준비해드릴게요.</p>
                <TextField
                    id="outlined-controlled"
                    label="비디오 주제"
                    value={topic}
                    multiline
                    disabled={isLoading}
                    onChange={(event) => {
                        setTopic(event.target.value);
                    }}
                />
            </Stack>
            <Button variant="contained" onClick={goToNext} disabled={isLoading}>
                {isLoading ? `초안을 작성중입니다...` : `다음`}
            </Button>
        </>

    );
};
