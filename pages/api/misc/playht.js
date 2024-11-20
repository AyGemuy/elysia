import axios from "axios";
async function fetchTTS(text, voice) {
  const data = {
    text: text,
    voice: voice,
  };
  const config = {
    headers: {
      AUTHORIZATION: "Bearer 7ede35d38e9445abb7e8da1a1c279c17",
      "X-USER-ID": "0Ftau1WTqcdWyezEukIRh7cWOJs2",
      accept: "text/event-stream",
      "content-type": "application/json",
    },
  };
  try {
    const response = await axios.post("https://play.ht/api/v2/tts", data, config);
    return findCompletedEventData(response.data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

const findCompletedEventData = (data) => {
  const events = data.split("event: ");
  for (let event of events)
    if (event.includes("complete")) {
      return JSON.parse(event.split("data: ")[1]);
    }
  return null;
};

async function listVoice() {
  const options = {
    method: "GET",
    url: "https://api.play.ht/api/v2/voices",
    headers: {
      accept: "application/json",
      AUTHORIZATION: "Bearer 7ede35d38e9445abb7e8da1a1c279c17",
      "X-USER-ID": "0Ftau1WTqcdWyezEukIRh7cWOJs2",
    },
  };
  try {
    return (await axios.request(options)).data;
  } catch (error) {
    throw error;
  }
}

export default async function handler(req, res) {
  const { type, text, voice } = req.query;

  if (!type || !["list", "generate"].includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Parameter 'type' harus diisi dengan 'list' atau 'generate'.",
    });
  }

  try {
    if (type === "list") {
      const voices = await listVoice();
      return res.status(200).json({ success: true, data: voices });
    } else if (type === "generate") {
      if (!text || !voice) {
        return res.status(400).json({
          success: false,
          message: "Parameter 'text' dan 'voice' wajib diisi untuk 'generate'.",
        });
      }
      const audioData = await fetchTTS(text, voice);
      if (!audioData) {
        throw new Error("Gagal menghasilkan suara.");
      }
      return res.status(200).json({ success: true, audio: audioData });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}