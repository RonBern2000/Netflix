import { rabbit } from "../config/rabbit";

// TODO: also put in npm lib
export const paymentConsumer = async () => {
  await rabbit.comsumeMessage("user.pay", async (data) => {
    console.log("📨 Received user signup event", data);
  });
};
