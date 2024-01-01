export const dummy = [
	{
		index: 1,
		username: "Bob",
		summary: "실용적이고 신중한 구매자",
		generated: false,
		tags: {
			성격: "신중한",
			구매성향: "가격 대비 가치 중시",
			현재상태: "구매 고려 중",
			말투: "비판 중",
		},
	},
	{
		index: 1,
		username: "Bob",
		summary: "실용적이고 신중한 구매자",
		generated: true,
		tags: {
			성격: "신중한",
			구매성향: "가격 대비 가치 중시",
			현재상태: "구매 고려 중",
			말투: "비판 중",
		},
	},

	{
		index: 3,
		username: "Haram",
		summary: "디자인과 성능에 중점을 두는 비판적 사용자",
		generated: false,
		tags: {
			성격: "신중한",
			구매성향: "가격 대비 가치 중시",
			현재상태: "구매 고려 중",
			말투: "비판 중",
		},
	},

	{
		index: 2,
		username: "Katie",
		summary: "디자인과 성능에 중점을 두는 비판적 사용자",
		generated: false,
		tags: {
			성격: "신중한",
			구매성향: "가격 대비 가치 중시",
			현재상태: "구매 고려 중",
			말투: "비판 중",
		},
	},
];

export const textMessage = [
	{
		who: "bot",
		text:
			"<p>" +
			"Bootstrap’s grid includes five tiers of predefined classes for building complex responsive layouts." +
			"Customize the size of your " +
			'<span style="background-color: yellow; font-weight: bold;">columns</span> on ' +
			'<span style="background-color: yellow; font-weight: bold;">extra small</span>, ' +
			'<span style="background-color: yellow; font-weight: bold;">small</span>, ' +
			'<span style="background-color: yellow; font-weight: bold;">medium</span>, ' +
			'<span style="background-color: yellow; font-weight: bold;">large</span>, or ' +
			'<span style="background-color: yellow; font-weight: bold;">extra large</span> devices however you see fit.' +
			"</p>",
	},
];

export const features = {
	성격특성: ["비판적", "긍정적", "호기심 많은", "유머러스한"],
	구매성향: ["가격 중시", "성능 중시", "디자인 중시", "브랜드 중시"],
	구매경로: ["오프라인", "온라인", "SNS", "지인 추천"],
	구매시기: ["매일", "매주", "매월", "계절마다"],
};
