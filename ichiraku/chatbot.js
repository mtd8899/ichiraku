
const API_KEY = "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";
const MODEL = "text-davinci-002";

/**-------------------------------------------------------------- */



const bot = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const greetingMessage = `<i class="fa-light fa-message-bot" style="font-size: 24px;"></i> &nbsp; " Hello there! Welcome to our website. How can I help you today?"`;
bot.innerHTML += `<div class="chatbot-message">${greetingMessage}</div> <hr>`;
chatbotInput.focus();

/**------------Data to help user navigate our website-------------------data-set----------------------------------- */
const responses = {
  "hello": "Hello there! How are you doing?",
  "how are you": "I'm just a computer program, so I don't have feelings. But I'm here to help you however I can.",
  "what's your name": "My name is WD29 G7 BOT.",
  "what is your name?": "My name is G7 BOT",
  "Who created you?": "Created by a Group of Developer in KODEGO"
};


/**-------------------------------data-set-----corrector------------------------------ */

const dictionary = [
  "hello",
  "how",
  "are",
  "you",
  "what's",
  "your",
  "name",
  "who",
  "created",
  "by",
  "a",
  "group",
  "of",
  "developer",
  "in",
  "kodego"
];
/**-------------------------------data-set-----corrector------------------------------ */
const spellingCorrector = (input, dictionary) => {
  const words = input.split(" ");
  const correctedWords = [];
  for (const word of words) {
    if (dictionary.includes(word)) {
      correctedWords.push(word);
    } else {
      let closestMatch = "";
      let closestDistance = Infinity;
      for (const dictWord of dictionary) {
        const distance = levenshteinDistance(word, dictWord);
        if (distance < closestDistance) {
          closestMatch = dictWord;
          closestDistance = distance;
        }
      }
      correctedWords.push(closestMatch);
    }
  }

  return correctedWords.join(" ");
};

const levenshteinDistance = (a, b) => {
  const distance = [];
  for (let i = 0; i <= b.length; i++) {
    distance[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    distance[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        distance[i][j] = distance[i - 1][j - 1];
      } else {
        distance[i][j] = Math.min(
          distance[i - 1][j - 1] + 1,
          distance[i][j - 1] + 1,
          distance[i - 1][j] + 1
        );
      }
    }
  }

  return distance[b.length][a.length];
};




/**------------Data to help user navigate our website-------------------data-set----------------------------------- */
async function generateResponse(message) {
  const correctedInput = spellingCorrector(message, dictionary);
  const response = responses[correctedInput];
  if (response) {
    return response;
  }
  const prompt = `User: ${message}\nWD29 G7 BOT:`;
  const url = `https://api.openai.com/v1/completions`;
  const params = {
    prompt,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.5
  };

  const apiResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      ...params
    })
  });
  const data = await apiResponse.json();

  return data.choices[0].text;
}

/**----------------------------------------------------------------------------- */

function getTimestamp() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

document.getElementById("chatbot-form").addEventListener("submit", async event => {
  event.preventDefault();
  const input = document.getElementById("chatbot-input").value;

  document.getElementById("chatbot-messages").innerHTML += `
    <span class="badge text-bg-primary">${getTimestamp()}</span>
    <div>
      <i class="fa-solid fa-user-large" style="font-size: 32px;"></i>Me: ${input}
    </div>
    
      <hr>
      `;

  const response = await generateResponse(input);

  if (response) {
    document.getElementById("chatbot-messages").innerHTML += `
           <div id="badge110"><span class="badge text-bg-primary">${getTimestamp()}</span></div>
          <div>
          <i class="fa-light fa-message-bot" style="font-size: 24px;"></i> &nbsp;
              WD29-BOT-G7: ${response}
             <hr>
          </div>
        `;
  } else {
    document.getElementById("chatbot-messages").innerHTML += `
          <div>
          <i class="fa-light fa-message-bot" style="font-size: 50px;"></i>
            BOTG7: Sorry, I couldn't understand your input. Could you please rephrase your question or statement?
          </div>
        `;
  }

  document.getElementById("chatbot-input").value = "";
});

/*------------drag the whole container--------------*/

const chatbotContainer = document.getElementById('chatbot-container');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

chatbotContainer.addEventListener('mousedown', dragStart);
chatbotContainer.addEventListener('mouseup', dragEnd);
chatbotContainer.addEventListener('mousemove', drag);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  if (e.target === chatbotContainer) {
    isDragging = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, chatbotContainer);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
}



