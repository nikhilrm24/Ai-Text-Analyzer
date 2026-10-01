import { useState } from "react";
function getSentimentStyle(sentiment) {
    switch (sentiment) {
        case "positive":
            return "bg-green-100 text-green-700";

        case "negative":
            return "bg-red-100 text-red-700";

        case "mixed":
            return "bg-yellow-100 text-yellow-700";

        case "neutral":
            return "bg-gray-100 text-gray-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
}
function getUrgencyStyle(urgency) {
    switch (urgency) {
        case "low":
            return "bg-green-100 text-green-700";

        case "medium":
            return "bg-yellow-100 text-yellow-700";

        case "high":
            return "bg-red-100 text-red-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
}
function App() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    async function analyzeText() {
    try {
        setLoading(true);
        setResult(null);

        const response = await fetch("http://localhost:8000/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text
            })
        });

        if (!response.ok) {
            throw new Error("Analysis failed");
        }

        const data = await response.json();

        setResult(data);

    } catch (error) {
        console.error(error);

    } finally {
        setLoading(false);
    }
}
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-12">

            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-2xl">

                <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight text-slate-900">
                    AI Text Analyzer
                </h1>

                <p className="mb-8 text-center text-slate-500">
                    Analyze sentiment, category, keywords and urgency
                </p>

                <div className="rounded-xl bg-white p-6 shadow-md">

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter a review or text..."
                        className="mt-6 h-44 w-full resize-none rounded-xl border border-slate-300 p-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                   <button
                  onClick={analyzeText}
                  disabled={loading}
                  className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                  {loading ? "Analyzing..." : "Analyze Text"}
              </button>
                </div>

              {result && (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-md">

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Analysis Result
        </h2>

   
        <div className="grid gap-4 sm:grid-cols-3">

            <div className="rounded-lg bg-gray-100 p-4">
                <p className="text-sm text-gray-500">
                    Sentiment
                </p>

                      <p
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xl font-bold capitalize ${getSentimentStyle(result.sentiment)}`}
        >
            {result.sentiment}
        </p>
            </div>


            <div className="rounded-lg bg-gray-100 p-4">
                <p className="text-sm text-gray-500">
                    Category
                </p>

                <p className="mt-1 text-xl font-bold capitalize">
                    {result.category}
                </p>
            </div>


            <div className="rounded-lg bg-gray-100 p-4">
               <p className="text-sm text-gray-500">
                    urgency
                </p>
                          <p
              className={`mt-1 inline-block rounded-full px-3 py-1 text-xl font-bold capitalize ${getUrgencyStyle(result.urgency)}`}
          >
              {result.urgency}
          </p>

               
            </div>

        </div>


        <div className="mt-6">

            <h3 className="text-lg font-semibold text-gray-900">
                Summary
            </h3>

            <p className="mt-2 rounded-lg bg-gray-100 p-4 text-gray-700">
                {result.summary}
            </p>

        </div>


        
        <div className="mt-6">

            <h3 className="text-lg font-semibold text-gray-900">
                Keywords
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">

                {result.keywords.map((keyword, index) => (
                    <span
                        key={index}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                        {keyword}
                    </span>
                ))}

            </div>

        </div>

    </div>
)}

            </div>

        </div>
    );
}

export default App;