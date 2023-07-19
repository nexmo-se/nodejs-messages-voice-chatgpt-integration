import express from 'express'

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