/* eslint-disable no-undef */
import express from "express";
import axios from "axios";
import cors from "cors"; // Import the cors middleware
import dotenv from "dotenv";
const app = express();
dotenv.config();

// Use the cors middleware
app.use(cors());

app.get("/api/user", async (req, res) => {
	try {
		const { data } = await axios.get(
			"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
			{
				params: {
					key: process.env.STEAM_API_KEY,
					steamids: req.query.steamid,
				},
			}
		);
		res.send(data);
	} catch (error) {
		console.error(error);
		res.status(500).send("Failed to fetch user data");
	}
});

app.get("/api/recentGames", async (req, res) => {
	try {
		const { data } = await axios.get(
			"https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/",
			{
				params: {
					key: process.env.STEAM_API_KEY,
					steamid: req.query.steamid,
				},
			}
		);
		res.send(data);
	} catch (error) {
		console.error(error);
		res.status(500).send("Failed to fetch user data");
	}
});

app.get("/api/allGames", async (req, res) => {
	try {
		const { data } = await axios.get(
			"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/",
			{
				params: {
					key: process.env.STEAM_API_KEY,
					steamid: req.query.steamid,
				},
			}
		);
		res.send(data);
	} catch (error) {
		console.error(error);
		res.status(500).send("Failed to fetch user data");
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
