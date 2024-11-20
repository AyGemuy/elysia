import fetch from "node-fetch";

async function quotlyChat(name, text, avatar, replyName, replyText, media) {
  try {
    return await new Promise(async (resolve, reject) => {
      if (!name) return reject("sender message not found!");

      let payload = {
        type: "quote",
        format: "png",
        backgroundColor: "#FFFFFF",
        width: 512,
        height: 768,
        scale: 2,
        messages: [{
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: name,
            photo: {
              url: avatar || "https://telegra.ph/file/1e22e45892774893eb1b9.jpg"
            }
          },
          text: text || "",
          replyMessage: replyName ? {
            name: replyName,
            text: replyText || "",
            chatId: Math.floor(Math.random() * 9999999)
          } : undefined,
          media: media ? {
            url: media
          } : undefined
        }]
      };

      try {
        const response = await fetch("https://bot.lyo.su/quote/generate", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!data.ok) return reject("failed creating quotly chat!");

        data.result.image = Buffer.from(data.result.image, "base64");

        resolve({
          status: true,
          data: data.result
        });

      } catch (error) {
        reject(error);
      }
    });
  } catch (e) {
    return { status: false, message: e };
  }
}

export default async function handler(req, res) {
  const { method, query } = req;

  if (method === "GET") {
    const { name, text, avatar, replyName, replyText, media } = query;

    if (!name || !text) {
      return res.status(400).json({
        status: false,
        message: "name and text are required"
      });
    }

    try {
      const result = await quotlyChat(name, text, avatar, replyName, replyText, media);

      if (result.status) {
        return res.status(200).json({
          status: true,
          image: result.data.image.toString('base64'),
          message: "Chat created successfully"
        });
      } else {
        return res.status(500).json({
          status: false,
          message: result.message || "Failed to create quotly chat"
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error"
      });
    }
  } else {
    res.status(405).json({
      status: false,
      message: "Method Not Allowed"
    });
  }
}
