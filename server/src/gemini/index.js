import { GoogleGenAI, Type } from "@google/genai";
import "dotenv/config";
// const API_KEY = process.env.GEMINI_API_KEY;

const aiEmailClassifier = async (req, res) => {
  try {
    const emailData = req.body.emailListData;
    const API_KEY = req.body.gemini_api_key;
    let data = null;
    console.log("emailData: ", emailData);
    console.log("API_KEY: ", API_KEY);

    const emailDataFromClient = JSON.stringify(emailData);
    const ai = new GoogleGenAI({ apiKey: `${API_KEY}` });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:
          `You are an expert AI email classification engine. Your task is to analyze the provided email data and assign **one** of the six defined categories.` +
          `**Classification Categories & Definitions:**

1.  **Important:**
    * **Is:** Personal emails (from friends, family, colleagues), work-related messages, urgent alerts (e.g., password resets, 2FA), travel/order confirmations, invoices, and any email requiring a direct reply or personal action.
    * **Is Not:** Automated newsletters or bulk mail.

2.  **Promotions:**
    * **Is:** Emails with a primary goal of driving a *direct sale*. The content is focused on coupons, discounts ("% off"), "Flash Sales," "Limited Time Offers," or a direct "Shop Now" call to action.
    * **Is Not:** General newsletters or company announcements.

3.  **Social:**
    * **Is:** *Only* automated notifications from social media platforms (e.g., Facebook, LinkedIn, Twitter, Instagram) about new messages, friend requests, comments, or post activity.
    * **Is Not:** Personal emails *from* a friend (that is "Important").

4.  **Marketing:**
    * **Is:** Emails designed for *brand engagement, information, or lead nurturing*, but *not* a direct sale. This includes newsletters, blog updates, company announcements, new feature showcases, or content with a "Read More" call to action.
    * **Is Not:** A direct coupon or sales offer (that is "Promotions").

5.  **Spam:**
    * **Is:** Unsolicited, unwanted, deceptive, or malicious email. This includes phishing scams, "get rich quick" schemes, and other obvious junk mail.

6.  **General:**
    * **Is:** The "catch-all" category for low-priority emails that do not fit the other five categories. This includes things like simple receipts, miscellaneous system notifications, or mailing list posts.` +
          `**Email Data to Classify:**

{
  "id": "{UNIQUE_ID}",
  "from": "{SENDER}",
  "subject": "{SUBJECT}",
  "snippet": "{BODY}"
}` +
          `${emailDataFromClient}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: {
                  type: Type.STRING,
                },
                label: {
                  type: Type.STRING,
                  enum: [
                    "Important",
                    "Promotions",
                    "Social",
                    "Marketing",
                    "Spam",
                    "General",
                  ],
                },
              },
              propertyOrdering: ["id", "label"],
            },
          },
        },
      });

      console.log(response.text);
      data = JSON.parse(response.text);
    }

    await main();
    console.log(data);

    const originalData = new Map(emailData.map((data) => [data.id, data]));

    const freshAIEmailData = data.map((item) => {
      const matchingItem = originalData.get(item.id);

      if (matchingItem) {
        return {
          id: matchingItem.id,
          from: matchingItem.from,
          subject: matchingItem.subject,
          snippet: matchingItem.snippet,
          label: item.label,
        };
      }
    });

    console.log("freAIEMAILData: ");
    console.log(freshAIEmailData);

    res.status(200).send({
      success: true,
      message: "AI Classified your Emails Successfully!",
      filteredMessageArray:freshAIEmailData,
    });
  } catch (error) {
    console.error(`Error in aiEmailClassifier: `, error);

    res.send({
      success: false,
      message: `${error.message}`,
    });
  }
};

export default aiEmailClassifier;
