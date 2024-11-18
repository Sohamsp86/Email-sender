import React, { useState } from 'react';
import './PromptSection.css';

const PromptSection = ({ onPromptSubmit }) => {
  const [promptTemplate, setPromptTemplate] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [product, setProduct] = useState('');
  const [location, setLocation] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handlePromptChange = (event) => {
    setPromptTemplate(event.target.value);
  };

  const handleSubmit = async () => {
    if (promptTemplate.trim() === '') {
      alert("Please enter a prompt template.");
      return;
    }

    // Replace placeholders in the prompt template with user inputs
    const filledPrompt = promptTemplate
      .replace('{Email}', email)
      .replace('{Company Name}', companyName)
      .replace('{Product}', product)
      .replace('{Location}', location)
      .replace('{Scheduled Time}', scheduledTime);

    try {
      const response = await fetch("https://api.groq.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`, // Ensure your .env file has the correct API key
        },
        body: JSON.stringify({
          prompt: filledPrompt,
          max_tokens: 150,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Generated Email Content:", data.content);
        onPromptSubmit(data.content); // Pass generated content to the parent component
        alert("Email content generated successfully!");
      } else {
        const error = await response.json();
        console.error("Error generating content:", error.message);
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("API call failed:", err);
      alert("An error occurred while generating content.");
    }
  };

  return (
    <div className="prompt-section-container">
      <h2>Customizable Prompt Box</h2>
      <textarea
        className="prompt-input"
        placeholder="Enter your prompt template here, e.g., 'Hello {Company Name} at {Location}'"
        value={promptTemplate}
        onChange={handlePromptChange}
      />
      <div className="form-fields">
        <input
          type="email"
          placeholder="Email-Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Scheduled Time"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
        />
      </div>
      <button className="prompt-submit-button" onClick={handleSubmit}>
        Generate Email
      </button>
    </div>
  );
};

export default PromptSection;
