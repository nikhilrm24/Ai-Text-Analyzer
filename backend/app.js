require("dotenv").config();
const {z}=require("zod");
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
const requestSchema=z.object({
    text:z.string().min(1)
})
const textAnalysisSchema=z.object({
    sentiment:z.enum([
        "positive",
                "negative",
                "neutral",
                "mixed"
    ]),
    category:z.enum([
        "product",
                "delivery",
                "service",
                "payment",
                "other"
    ]),
    summary:z.string(),
    keywords:z.array(z.string()),
    urgency:z.enum([
                "low",
                "medium",
                "high"
    ])
})
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
                "delivery",
                "service",
                "payment",
                "other"
            ]
        },
        summary:{
            type:"string"
        },
        keywords:{
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
        "keywords",
        "urgency"
    ]
}

app.post("/api/analyze",async (req,res)=>{
    try{
        const input=requestSchema.safeParse(req.body);
        if(!input.success){
            return res.status(404).json({
                message: "Please provide valid text"
            })
        }
        const text=input.data.text;

        const response=await ai.models.generateContent({
            model:"gemini-3.6-flash",
            contents:`analyze this text;${text}`,
            config:{
                responseMimeType:"application/json",
                responseSchema:responseSchema
            }
        })
        const data = JSON.parse(response.text);
        const result=textAnalysisSchema.safeParse(data);
        if (!result.success) {
            console.error(result.error);

            return res.status(500).json({
                message: "AI returned invalid data"
            });
}
        res.json(result.data);
    }catch(error){
    console.error(error);
    res.status(500).json({message:"Something went wrong"})
    }
})

app.listen(8000,()=>{
    console.log("server running on 8000");
})