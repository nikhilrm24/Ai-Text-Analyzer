require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
const responseSchema={
    type:"object",
    properties:{
        sentiment:{
            type:"string",
            enum:[
                "positive",
                "negative",
                "neutral",
                "mixed"
            ]
        },
        category:{
            type:"string",
            enum:[
                "product",
                "delivary",
                "service",
                "payment",
                "other"
            ]
        },
        summary:{
            type:"string"
        },
        keyword:{
            type:"array",
            items:{
                type:"string"
            }
        },
        urgency:{
            type:"string",
            enum:[
                "low",
                "medium",
                "high"
            ]
        }
    },
    required:[
        "sentiment",
        "category",
        "summary",
        "keyword",
        "urgency"
    ]
}

app.post("/api/analyze",async (req,res)=>{
    try{
        const text=req.body.text;

        const response=await ai.models.generateContent({
            model:"gemini-3.6-flash",
            contents:`analyze this text;${text}`,
            config:{
                responseMimeType:"application/json",
                responseSchema:responseSchema
            }
        })
        res.json(JSON.parse(response.text));
    }catch(error){
    console.error(error);
    res.status(500).json({message:"Something went wrong"})
    }
})

app.listen(8000,()=>{
    console.log("server running on 8000");
})