import { Client, middleware, WebhookEvent } from "@line/bot-sdk";
import express from "express";
import { config } from "./config";

const client = new Client(config);

const app = express();

app.use(middleware(config));

app.get("/", (_, res) => {
    res.send({ status: "成功", message: "連接成功！" });
});

// 此路由用於 Webhook。
app.post("/webhook", async (req, res) => {
    const events = req.body.events as WebhookEvent[];
    const array = events.map(async (event) => {
        if (event.type !== "message" || event.message.type !== "text") {
            return;
        }
        try {
            await client.replyMessage(event.replyToken, { type: "text", text: event.message.text });
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err);
            }
            return res.status(500).json({ status: "error" });
        }
    });
    await Promise.all(array);
    return res.send({ status: "成功" });
});

app.listen(process.env.PORT, () => console.log(`伺服器啟動中`));
