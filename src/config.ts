import dotenv from "dotenv";

dotenv.config();

export const config: any = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};
