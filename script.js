const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const dotenv = require("dotenv");
dotenv.config();

const btn = document.getElementById("btn")

btn.addEventListener('click', submit)

async function submit() {                  
  var inputText = document.getElementById("msg-container").value           
  const parentDiv = document.getElementById("chat-box") 

  if(inputText === '') { return }

  const question = document.createElement('div')
  question.innerHTML = inputText
  question.classList.add("box")
  parentDiv.appendChild(question)
  document.getElementById("msg-container").value = ''
  // The remaining code goes inside this function
}

chatbox.animate({
  scrollTop: 20000000
}, "slow");
sendButton.val("SUBMIT");
sendButton.prop("disabled", false);
