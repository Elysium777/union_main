const OpenAI = require("openai");
const openai = new OpenAI({
  organization: "org-Do6wpVcergWrvbWIky6KtC5L",
  project: "proj_sMUWmbugP0mLEJZigU7FP4ei",
});

const getSummary = async (title, description) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Write a summary for this DAO proposal; Title: ${title} ; Description: ${description}; under 400 characters`,
      },
    ],
  });

  const summary = completion.choices[0].message.content;

  return summary;
};

module.exports = { getSummary };
