const { storage } = require("../config/firebase.config");
const { getDownloadURL, ref, uploadBytes } = require("@firebase/storage");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyAIN_DwYdnX0wwSx_3sFejTq25CgNX9S3o');
const { AssemblyAI } = require('assemblyai');
require("dotenv").config()

const client = new AssemblyAI({apiKey: 'bbf33d7fe36b4181ad411dbbfff8a403',});


module.exports = {
    uploadFile: (async (file) => {
        console.log(file,'file')
        const uniqueFilename = `${file.originalname}-${Date.now()}`;
        const storageRef = ref(storage, `${uniqueFilename}`);
        await uploadBytes(storageRef, file.buffer);
        const result = await getDownloadURL(storageRef);
        let downloadUrl = result;
        return downloadUrl
    }),
    generatePin: () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    },
    gennerateRapLine:async (word)=>{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            ` Analyze the word: ${word}. and generate a rap verse which include that word. make sure only return generated line in reponse
            `
        ]);
        return result.response.text()
    },
    aISuggestion:async (note)=>{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([` Give suggestion on this note : ${note}. make sure the response is in one line`]);
        return result.response.text()
    },
    aISuggestionOnRap:async (note)=>{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([` Give suggestion on this rap line : ${note}. make sure the response is in one line and only give suggestion about the line`]);
        return result.response.text()
    },
    aIPerformanceAnalysis:async (note)=>{
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([`Analyze this rap  : ${note}. and give perforamce analysis in the form of object only return object in response no additional text 
            {
                smoothness:80,
                creativity:10,
                versality10
            }
            `]);
        return result.response.text()
    },
    audioToText:async(file)=>{
        const transcript = await client.transcripts.transcribe({audio_url:file});
        return transcript.text
    }
    
}
