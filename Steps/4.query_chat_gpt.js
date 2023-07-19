import express from 'express'
//3 Add Dotenv ChatGPT and Vonage
import dotenv from 'dotenv'
import {ChatGPTAPI} from 'chatgpt'
import {Vonage} from '@vonage/server-sdk'
//only if nodeJS < 18 and >=14
//import './fetch-polyfill.js'
//3. Initialize Dotenv
dotenv.config()

//3initialize the Vonage Server SDK
const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  applicationId: process.env.APPLICATION_ID,
  privateKey: process.env.PRIVATE_KEY
})

//3. Initialize the ChatGPT Library
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
})

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json(200);
});

app.post('/webhooks/inbound-messaging', async (req, res) => {
  //2. Receive Meta Messenger Message
  res.json(200); //we can set a status right away since there is no frontend to generate
  const messenger_to =  req.body.to
  const messenger_from = req.body.from
  const received_text = req.body.text
  console.log("Received message: ", received_text, "from: ", messenger_from)

  //4. Query Chat GPT
  const chat_gpt_opts = {} //4. options that we will populate later
  api.sendMessage(received_text, chat_gpt_opts).then( async (chat_response) => {
    console.log("Chat GPT Response:", chat_response.text)
  })
});

app.listen(port, async () => {
  console.log(`Starting server at port: ${port}`)
});


// If tunneling: npm install localtunnel
import localtunnel from 'localtunnel'
(async () => {
  const tunnel = await localtunnel({
    subdomain: "bjtestvonage01",
    port: port
  });
  console.log(`App available at: ${tunnel.url}`);
})();