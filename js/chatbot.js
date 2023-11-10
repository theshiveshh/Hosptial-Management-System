class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        };

        this.state = false;
        this.messages = [];

        // Intents for basic matching
        this.intents = [
            {
                tag: "greeting",
                patterns: ["hi", "hey", "hello", "good day"],
                responses: ["Hey!", "Hello!", "Hi there!", "Good day!"]
            },
            {
                tag: "help",
                patterns: ["who are you?"],
                responses: ["I am MedBot"]
            },
            {
                tag: "help",
                patterns: ["i have cold","i have cough","i am having throat pain"],
                responses: ["It seems you are suffering from common cold"]
            },
            {
                tag: "help",
                patterns: ["how can i book appointment?"],
                responses: ["Create a patient profile , Go to dasboard ,Select the doctor and you can book the appointment"]
            },
            {
                tag: "help",
                patterns: ["who created you?"],
                responses: ["Shivesh and Tezash created me for healthcare support."]
            },
            {
                tag: "help",
                patterns: ["i have sore throat"],
                responses: ["I think you have cold.Can you provide more details for assistance?"]
            },
            {
                tag: "help",
                patterns: ["i have stuffy nose and muscle ache"],
                responses: ["It seems like you have COLD with FEVER"]
            },
            {
                tag: "help",
                patterns: ["prevention techniques for fever"],
                responses: ["medicines you can consume : Dextromethorphan,Decongestant,Diphenhydramine,Crocin Cold & Flu Max, preventions that you must follow :Wash your hands,Avoid touching your face,Clean frequently used surfaces,Use hand sanitizers,SUGGESTED FOODS ARE:Garlic,Vitamin C–containing fruits,Leafy greens,Broccoli,Oatmeal,Spices,Chicken Soup"]
            },

            // Add more intents as needed
        ];
        
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value.toLowerCase(); // Convert input to lowercase for matching
        if (text1 === "") return;

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        // Get bot's response based on user input
        let botResponse = this.getBotResponse(text1);
        let msg2 = { name: "Sam", message: botResponse };
        this.messages.push(msg2);

        this.updateChatText(chatbox);
        textField.value = '';
    }

    getBotResponse(inputText) {
        for (let intent of this.intents) {
            if (intent.patterns.includes(inputText)) {
                return intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        }
        return "Sorry, I don't understand."; // Default response if no match found
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(item => {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
