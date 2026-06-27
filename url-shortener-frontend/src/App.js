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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url }),
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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">


      <svg
        className="app-bg-arc"
        viewBox="0 0 900 420"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >

        <path
          d="M 60 380 Q 450 120 840 380"
          fill="none"
          stroke="rgba(255,153,0,0.07)"
          strokeWidth="72"
          strokeLinecap="round"
        />

        <path
          d="M 60 380 Q 450 120 840 380"
          fill="none"
          stroke="rgba(255,153,0,0.1)"
          strokeWidth="36"
          strokeLinecap="round"
        />

        <path
          d="M 60 380 Q 450 120 840 380"
          fill="none"
          stroke="rgba(255,153,0,0.28)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <polygon
          points="820,358 850,375 820,393"
          fill="rgba(255,153,0,0.55)"
        />
      </svg>

      <div className="app-bg-glow" />


      <div className="topbar">
        <div className="topbar-brand">
          <span className="tcs-badge">TCS</span>
          <div className="topbar-divider" />
          <span className="topbar-product">Cloud Engineering</span>
        </div>
        <div className="topbar-right">
          <div className="aws-dot" />
          <span className="topbar-aws-label">AWS ap-south-1</span>
        </div>
      </div>

      <div className="card">

        <div className="hero-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Serverless Infrastructure Tool</span>
        </div>
        <h1>
          AWS Serverless<br />
          <span>URL Shortener</span>
        </h1>
        <p className="subtitle">
          Serverless &nbsp;·&nbsp; Scalable &nbsp;·&nbsp; Secure &nbsp;·&nbsp; Cost Optimized
        </p>


        <div className="input-panel">
          <span className="input-label">Destination URL</span>
          <div className="input-group">
            <input
              type="text"
              placeholder="Paste your long URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") shortenUrl(); }}
            />
            <button
              onClick={shortenUrl}
              disabled={loading}
              className={loading ? "loading" : ""}
            >
              {loading ? "Creating..." : "Shorten"}
            </button>
          </div>
        </div>


        {shortUrl && (
          <div className="result-box">
            <div className="result-header">
              <div className="result-icon">
                <svg viewBox="0 0 12 12">
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              </div>
              <h3>URL Created Successfully</h3>
            </div>
            <div className="result-url-row">
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
              <button
                className={`copy-btn${copied ? " copied" : ""}`}
                onClick={copyToClipboard}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            {copied && <p className="success">Copied to clipboard</p>}
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

        <footer>Powered by AWS Serverless Architecture</footer>
      </div>
    </div>
  );
}

export default App;