import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    if (!url) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://i67u8mzkhj.execute-api.ap-south-1.amazonaws.com/Prod/shorten",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
          }),
        }
      );

      const data = await response.json();

      setShortUrl(
        `https://i67u8mzkhj.execute-api.ap-south-1.amazonaws.com/Prod/${data.short_code}`
      );
    } catch (error) {
      alert("Error creating short URL");
      console.error(error);
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="app">
      <div className="card">

        <h1>AWS Serverless URL Shortener</h1>

       <p className="subtitle">
  Serverless • Scalable • Secure • Cost Optimized
</p>

        <div className="input-group">
         <input
  type="text"
  placeholder="Paste your long URL..."
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      shortenUrl();
    }
  }}
/>

          <button
  onClick={shortenUrl}
  disabled={loading}
>
  {loading ? "Creating..." : "Shorten"}
</button>
        </div>

        {shortUrl && (
          <div className="result-box">
            <h3>✅ URL Created Successfully</h3>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {shortUrl}
            </a>

            <button
              className="copy-btn"
              onClick={copyToClipboard}
            >
              📋 Copy URL
            </button>

            {copied && (
              <p className="success">
                Copied to clipboard!
              </p>
            )}
          </div>
        )}

        <div className="badges">
          <span>AWS Lambda</span>
          <span>API Gateway</span>
          <span>DynamoDB</span>
          <span>SQS</span>
          <span>S3</span>
          <span>CloudWatch</span>
        </div>

        <footer>
          Powered by AWS Serverless Architecture 
        </footer>

      </div>
    </div>
  );
}

export default App;