import axios from "axios";

export const emailMessagesController = async (req, res) => {
  try {
    const { maxResults } = req.query;
    const { emailId, accessToken } = req.result;

    const reqEmailList = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/${emailId}/messages?maxResults=${maxResults}&includeSpamTrash=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("reqEmailList.data.messages");
    console.log(reqEmailList.data.messages);

    const messageList = reqEmailList.data.messages;

    const messageDataArray = await Promise.all(
      messageList.map(async (messageId) => {
        const messageData = await axios.get(
          `https://gmail.googleapis.com/gmail/v1/users/${emailId}/messages/${messageId.id}?format=metadata`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return messageData.data;
      })
    );

    const filteredMessageArray = messageDataArray.map((data) => {
      const message = {
        id: data.id,
        from: data.payload.headers.find((obj) => obj.name == "From").value,
        // to: data.payload.headers.find((obj) => obj.name == "To").value,
        subject: data.payload.headers.find((obj) => obj.name == "Subject")
          .value,
        snippet: data.snippet,
      };
      return message;
    });

    res.status(200).send({
      succcess: true,
      message: "Fetched all Lists",
      //   reqEmailList: reqEmailList.data,
      //   messageDataArray,
      filteredMessageArray,
    });
  } catch (error) {
    console.error(`Error in emailMessageController: `, error);
    res.send({
      error,
    });
  }
};
