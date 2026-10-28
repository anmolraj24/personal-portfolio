module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const message = (body.message || '').trim().toLowerCase();

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let reply = "I'm Anmol's AI portfolio assistant! You can ask me about Anmol's background, projects, skills, education, or contact details.";

    if (/^(hi|hello|hey|greetings|hola)/i.test(message)) {
      reply = "Hello! 👋 I'm Anmol Raj's AI Assistant. How can I assist you with exploring his portfolio today?";
    } else if (message.includes('who') || message.includes('about') || message.includes('name')) {
      reply = "Anmol Raj is a passionate 2nd-year B.Tech Computer Science and Engineering student at JECRC University, Jaipur. He focuses on full-stack web development and software engineering.";
    } else if (message.includes('skill') || message.includes('tech') || message.includes('language') || message.includes('stack')) {
      reply = "Anmol's technical skills include Python, HTML5, CSS3, JavaScript (ES6+), C++, C, Git, GitHub, Cursor AI, and responsive web design.";
    } else if (message.includes('project') || message.includes('work') || message.includes('built')) {
      reply = "Anmol has built several projects: 1) Python Programs Collection, 2) Messy Python Code Improvement using AI, 3) Bug Fixing with Cursor AI, 4) Interactive Quiz Application, and 5) Book Reading List Application.";
    } else if (message.includes('college') || message.includes('university') || message.includes('study') || message.includes('degree') || message.includes('education') || message.includes('cgpa')) {
      reply = "Anmol is pursuing B.Tech in CSE at JECRC University, Jaipur (currently in second year, expected 2029) with an academic CGPA of 8.0.";
    } else if (message.includes('contact') || message.includes('email') || message.includes('mail') || message.includes('hire') || message.includes('reach')) {
      reply = "You can reach Anmol directly via email at sumo172005@gmail.com, or check out his code on GitHub at https://github.com/anmolraj24/personal-portfolio.";
    } else if (message.includes('github') || message.includes('repo')) {
      reply = "Anmol's GitHub profile and portfolio repository can be found at: https://github.com/anmolraj24/personal-portfolio";
    }

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process message' });
  }
};
