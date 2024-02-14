const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const dotenv = require("dotenv");
dotenv.config();

// // if (typeof window !== 'undefined') {
// // document.querySelector('.btn').addEventListener('click', run);
// // }

// //  async function run() {
// //   if (typeof window !== 'undefined') {
// //   let userInput = document.querySelector('.user-input').value;
// //   let userMessageDiv = document.createElement("div");

// // userMessageDiv.className = "msg-container";

// // userMessageDiv.textContent = 'User: ${userInput}';

// // document.querySelector('.chat-box').appendChild(userMessageDiv);
// // const result = await model.generateContent(prompt);
// // const response = await result.response;
// // const text = response.text();

// // const prompt = userInput;
// // let botMessageDiv = document.createElement("div");

// //  botMessageDiv.className = "incoming-chat";

// //  botMessageDiv.textContent = 'bot: ${text}';

// // document.querySelector('.chat-box').appendChild(botMessageDiv);
// //   }
// // }

// // run();


function submit() {
  console.log("Hello");
  let text = document.getElementById("msg-container").value;
//   const readline = require("readline");

// const userInterface = readline.createInterface({
//   input: text,
//   output: process.stdout,
// });

//   userInterface.prompt();

//   userInterface.on("line", async (input) => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Start by greeting the user, You are a music recommender and has to analysis the user's prompts and recommend music. If not mentioned in the prompt, ask the user what kind of music they want to hear. You can also ask them what genre of music they want to hear and then recommend 3 songs on basis of their prompts, your response should be in a JSON format and should add a value to each of these parameters: mood, genre, name of song, artist",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: '{\n"mood": "energetic",\n"genre": "rock",\n"recommended_songs": [\n{\n"name": "Eye of the Tiger",\n"artist": "Survivor"\n},\n{\n"name": "Livin\' on a Prayer",\n"artist": "Bon Jovi"\n},\n{\n"name": "We Will Rock You",\n"artist": "Queen"\n}\n]\n}',
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "hi" }],
        },
        {
          role: "model",
          parts: [{ text: "Hey, What music you want to hear?" }],
        },
        {
          role: "user",
          parts: [{ text: "hi" }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hey there! What kind of music are you in the mood for today?",
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "lol" }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Alright, let's try something upbeat and cheerful. How does that sound?",
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "nope" }],
        },
        {
          role: "model",
          parts: [
            {
              text: "No problem. How about something more mellow and relaxing?",
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "ok but bollywood" }],
        },
        {
          role: "model",
          parts: [
            {
              text: 'Excellent choice! Here are three Bollywood songs that you might enjoy:\n\n{\n"mood": "mellow",\n"genre": "bollywood",\n"recommended_songs": [\n{\n"name": "Kesariya",\n"artist": "Arijit Singh"\n},\n{\n"name": "Tum Hi Ho",\n"artist": "Arijit Singh"\n},\n{\n"name": "Main Rang Sharbaton Ka",\n"artist": "Arijit Singh"\n}\n]\n}',
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "party songs" }],
        },
        {
          role: "model",
          parts: [
            {
              text: 'Great! Here are some party songs that will get you moving:\n\n{\n"mood": "upbeat",\n"genre": "party",\n"recommended_songs": [\n{\n"name": "Naach Meri Rani",\n"artist": "Guru Randhawa, Dhvani Bhanushali"\n},\n{\n"name": "Kala Chashma",\n"artist": "Badshah, Neha Kakkar"\n},\n{\n"name": "Genda Phool",\n"artist": "Badshah, Jacqueline Fernandez"\n}\n]\n}',
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: "happy" }],
        },
        {
          role: "model",
          parts: [
            {
              text: 'Fantastic! Here are some happy songs to brighten your day:\n\n{\n"mood": "happy",\n"genre": "pop",\n"recommended_songs": [\n{\n"name": "Happy",\n"artist": "Pharrell Williams"\n},\n{\n"name": "Don\'t Stop Me Now",\n"artist": "Queen"\n},\n{\n"name": "Good Life",\n"artist": "OneRepublic"\n}\n]\n}',
            },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(text);
    const response = result.response;
    console.log(response.text());
    x = document.getElementsByClassName("incoming-chat");
    for (var i = 0; i < x.length; i++) {
      x[i].innerText = response.text(); // Change the content
    }
  });
}
