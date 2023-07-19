# Vonage Messages and Voice with Chat-GPT

This Repository is designed as a Workshop for integrating Chat-GPT into Vonage Messages and Voice API. You can follow the steps below to learn how the application was built. The code-steps are inside the directory Steps.

## Workshop Guide

**Requirements:**

 Environment with Node JS (18 and above preferably) 
- Ngrok Or Localtunnel Library (might show them localtunnel library)
- Vonage Account (freetier okay)
- Open AI account (freetier okay)

**Workshop  Script:**

**A. Create a Vonage account**

**B. Create a Vonage Application (helpful if they have one)**
 - https://ui.idp.vonage.com/ui/auth/registration
 
**C. Link a Facebook Page (create a page if none) to Vonage's external account** 
   - Helpful if they have one already

**D. Install Dependencies**
- `npm install dotenv express chatgpt @vonage/server-sdk unfetch`
 - only if nodeJS < 18 and >=14: `npm install node-fetch`

**E. Do Code Step 1: Add Express and Endpoints**
- Use Localtunnel (or ngrok) to get publicly accessible endpoints
- Add the messages endpoints to Vonage
- Generate a private key and save it as private.key in their environment

**F. Do Code Step 2: Receive a Messenger Message**
 - Show logs where we receive the message

**G. Get OpenAI Key**
- Signup here: https://platform.openai.com/signup?launch
- Again Helpful if they have something

**H. Create and Populate .env** 
- There is a sample file called `.env.samp`, you can create a copy from that and name it `.env`
- Populate the required values

**I. Do Code Step 3: Initialize Dotenv, ChatGPT and Vonage**

**J. Do code Step 4: Query Chat GPT**
 - show logs where chat gpt responds

**K. Do code Step 5: Reply with the Chat gpt response**
- Show demo where we receive the message back in Messenger

**L. Do code Step 6: Make Chat GPT Context Aware**
- Show demo where we show that Chat gpt is not context aware
- Chat GPT can keep track of conversation is we pass the previous's chat_gpt replies ID in the next Chat GPT Query
- To do this, we create an object where we store the messenger_from as the key and the chat_response ID as the key
- Whenever we receive a message from a user, we check if the message_from is already stored in our dictionary,
- If it is, we get the response ID stored in it to create a new query.
- We then update or create the message_from key and then store the response ID as the value
- Show a demo where we ask "What are we talking about?"

**M. Add a simple error catching**
- Show error where we hit the limit
- Show what happens when we add the Catch

**N. Split the messages**
- Show error where a long GPT reply will break the code because of the 640 Character Limit
- Algorithm to Split  Messages longer than 640 Chars (messenger Limit)
	- we split the replies into a word array and store it into sequence var
	- we create an empty string buffer
	- we loop trough the sequence array
	 - In Loop:
	   - if we add the next word in the array and the resulting buffer length is more than 640 characters
	     - then send the message
	     - then empty the string buffer
	    - add the next word to the buffer
	  - When Loop ends: send whatever is left in the buffer once we are done looping through the array

**Bonus** (if we have time, or just show quickly to show the power of Voice API)
1. Create A Voice callback endpoint
2. Add answer NCCO using speech as Input
3. Add call endpoint
4. Query Chat GPT using the speech from input
5. Use NCCO to reply with the chat gpt answer

