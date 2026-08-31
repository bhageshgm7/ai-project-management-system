import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "./AIAssistant.css";

function AIAssistant() {
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function askAI(questionToAsk) {
if (!questionToAsk.trim()) {
return;
}


setLoading(true);
setError("");
setAnswer("");

try {
  const response = await api.post("ai/ask/", {
    question: questionToAsk.trim(),
  });

  setAnswer(response.data.answer);
} catch (err) {
  console.error("AI Assistant error:", err);

  setError(
    err.response?.data?.detail ||
    err.response?.data?.error ||
    "Unable to get a response from the AI Assistant."
  );
} finally {
  setLoading(false);
}


}

async function handleAsk(event) {
event.preventDefault();
await askAI(question);
}

function handleQuickAction(actionQuestion) {
setQuestion(actionQuestion);
askAI(actionQuestion);
}

return ( <div className="ai-page"> <nav className="ai-nav"> <Link to="/dashboard">Dashboard</Link> <Link to="/projects">Projects</Link> <Link to="/tasks">Tasks</Link> <Link to="/ai-assistant">AI Assistant</Link> </nav>


  <main className="ai-content">
    <div className="ai-header">
      <span className="ai-badge">AI POWERED</span>

      <h1>AI Project Assistant</h1>

      <p>
        Ask questions about your projects, tasks, planning,
        development, and productivity.
      </p>
    </div>

    <section className="ai-insights">
      <h2>Quick AI Insights</h2>

      <div className="ai-quick-actions">
        <button
          type="button"
          onClick={() =>
            handleQuickAction(
              "Give me a summary of all my current projects and tasks."
            )
          }
          disabled={loading}
        >
          📊 Summarize Projects
        </button>

        <button
          type="button"
          onClick={() =>
            handleQuickAction(
              "Show me all HIGH and URGENT priority tasks and explain what I should focus on first."
            )
          }
          disabled={loading}
        >
          🔥 High Priority Tasks
        </button>

        <button
          type="button"
          onClick={() =>
            handleQuickAction(
              "Check my tasks and identify any overdue tasks. Explain what action I should take."
            )
          }
          disabled={loading}
        >
          ⚠️ Overdue Tasks
        </button>

        <button
          type="button"
          onClick={() =>
            handleQuickAction(
              "Based on my current projects and tasks, what should I work on first and why?"
            )
          }
          disabled={loading}
        >
          🎯 What Should I Work On?
        </button>

        <button
          type="button"
          onClick={() =>
            handleQuickAction(
              "Create a practical two-week plan for completing my current project tasks."
            )
          }
          disabled={loading}
        >
          📅 Create 2-Week Plan
        </button>
      </div>
    </section>

    <section className="ai-card">
      <form onSubmit={handleAsk}>
        <label htmlFor="ai-question">Your question</label>

        <textarea
          id="ai-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Example: Give me a plan to complete my project in two weeks."
          rows="6"
        />

        <button
          type="submit"
          disabled={loading || !question.trim()}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {error && <div className="ai-error">{error}</div>}

      {answer && (
        <div className="ai-response">
          <h2>AI Response</h2>
          <p>{answer}</p>
        </div>
      )}
    </section>
  </main>
</div>


);
}

export default AIAssistant;
