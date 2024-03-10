import { configureStore } from "@reduxjs/toolkit";
import personaList from "./personaList";
import attributeList from "./attributeList";
import plotHistory from "./plotHistory";
import channelInfo from "./channelInfo";
import loginInfo from "./loginInfo";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, loginInfo);

export const store = configureStore({
	reducer: {
		personaList: personaList,
		attributeList: attributeList,
		plotHistory: plotHistory,
		channelInfo: channelInfo,
		loginInfo: persistedReducer,
	},
});
export const persistor = persistStore(store);

//reference: https://www.freecodecamp.org/news/redux-and-redux-toolkit-for-beginners/#:~:text=To%20use%20Redux%20Toolkit%20in,store%20to%20your%20React%20components.
