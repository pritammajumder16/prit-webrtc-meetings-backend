import { CallbackData } from "../../types/interface";

export const callback = ({ eventType, data, ws }: CallbackData) => {
  ws.send(
    JSON.stringify({
      type: eventType,
      data,
    })
  );
};
