# Hackathon Cognition São Paulo [2026-04-25]

Competição intensa de desenvolvimento com imersão prática em ferramentas de IA para código (Windsurf e Devin), organizada pela Cognition em São Paulo. Engenheiros de software e times de produto competem construindo projetos com agentes de IA autônomos em 4 horas. Agora é sponsor oficial com trilha dedicada a soluções com ConvoAI.



## 🎯 **Theme**

This hackathon is open-ended! We encourage you to explore any area that interests you, as long as it incorporates Agora's real-time communication technologies in an innovative way.


---

## 🔧 **Project Requirements & Constraints**

### Required Technologies
All submissions **must** integrate the following:

| Technology | Description | Documentation |
|------------|-------------|---------------|


### Rules


### Bonus Point Opportunities
Go above and beyond for extra credit:


---

## 📚 **Resources & Starter Code**

Get up and running quickly with these official repositories:

### Start from here
> 🛠️ [AGORA_QUICKSTART.md](./AGORA_QUICKSTART.md) for skills, CLI and examples.
### Starter Repositories

| Repository | Description |
|------------|-------------|
| [**Agora agent-ui-kit (React components para ConvoAI)**](https://github.com/AgoraIO/agent-ui-kit) | {{repo.description}} |
| [**Agora Python ConvoAI SDK**](https://github.com/AgoraIO/agora-realtime-ai-api) | {{repo.description}} |


### Documentation
- [Agora Conversational AI (ConvoAI)](https://docs.agora.io/en/conversational-ai/overview/product-overview)
- [Agora RTC Web SDK Quickstart](https://docs.agora.io/en/video-calling/get-started/get-started-sdk)
- [Agora Console (trial signup)](https://console.agora.io)
- [Windsurf (Cognition)](https://windsurf.com)
- [Devin (Cognition)](https://devin.ai)
- [Oracle Cloud Infrastructure](https://cloud.oracle.com)


---

Follow the steps below to **fork, develop, and submit** your project.

---

## 📌 **Submission Guidelines**

### **1. Fork this Repository**

To submit your project to the Cognition Hack São Paulo:

1. **Fork this repository** to your own GitHub account.
2. **Create your team's submission folder** under `submissions/` using your team name (e.g., `submissions/team-awesome/`).
3. **Add your project files**:
   - `README.md` — team name, members, project description, tools used (Windsurf/Devin + any optional tracks), setup instructions, and external dependencies.
   - `src/` — source code.
   - `demo.mp4` (optional but recommended) — short video demo.
   - `docs/` — supporting documentation.
4. **Commit and push** your changes to your fork.
5. **Open a Pull Request** from your fork to this repository's `main` branch before the submission deadline (**2026-04-25, 15:00 BRT**).
6. **Declare any optional tracks** your project qualifies for (e.g., Agora ConvoAI, Oracle OCI) directly in your submission README so judges know where to evaluate.

**Only in-person participants whose Pull Requests are opened by 15:00 BRT are eligible for prizes.**
### **2. Clone Your Forked Repository**

Alternatively, if you just want a local copy of the repository to explore the resources, thought starters, and evaluation rubric:

1. **Clone the repository** directly:
```bash
   git clone https://github.com/AgoraIO-Community/cognition-hack-sp-2026.git
   cd cognition-hack-sp-2026
```
2. **Install the Agora toolkit** (optional, recommended for teams using Agora):
```bash
   npm install -g agoraio-cli
   npx skills add https://github.com/agoraio/skills --skill agora
```
3. **Review the key documents**:
   - `README.md` — event overview, judges, rules, prizes.
   - `AGORA_QUICKSTART.md` — Agora tools for voice/video (Agora track eligibility).
   - `Thought_Starters.md` — project ideas and inspiration.
   - `hackathon-rating-rubric.md` — how your submission will be judged.

> **Note:** Cloning gives you read-only access. To submit a project, you still need to **fork** the repository and open a Pull Request (see the Fork Instructions above).

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/cognition-hack-sp-2026.git
cd cognition-hack-sp-2026
```

### **3. Create Your Team Folder**

Inside the `submissions/` directory, create a new folder using your team name.  
Example:

Each team must organize its submission under a single folder inside `submissions/`, named after the team (lowercase, hyphen-separated, no spaces). Example:

~~~
submissions/
└── team-awesome/
    ├── README.md          # required — team info, project description, setup
    ├── src/               # required — all source code for your project
    ├── demo.mp4           # optional but strongly recommended — short video demo
    └── docs/              # optional — architecture notes, diagrams, screenshots
~~~

**Folder requirements:**

- **One folder per team.** Do not create multiple folders or submit to the repository root.
- **Use a unique team name.** If another team has already claimed a folder name, pick a different one.
- **Keep paths relative.** Your code should run from inside your team folder without depending on the parent repo structure.

**`README.md` inside your team folder must include:**

- Team name and full list of members (name + GitHub handle).
- Short project description (2–3 paragraphs).
- Tools used — explicitly state whether you built with **Windsurf**, **Devin**, or both.
- Optional tracks you are competing in — **Agora ConvoAI**, **Oracle OCI**, or none.
- Setup and run instructions (dependencies, environment variables, commands).
- Any known limitations, trade-offs, or future work.

**Do not commit secrets** (API keys, tokens, credentials) — use a `.env.example` file instead and reference it in your README.

### **4. Work on Your Project**

- Develop your project inside your team folder.
- Include a `README.md` file explaining your project, its setup, and usage. Include any special instructions to run it.
- Include a short demo video or screenshots in the `docs/` folder.

### **5. Commit and Push Changes**

```bash
git add .
git commit -m "Submission commit - Team [Your Team Name]"
git push
```

### **6. Submit via Pull Request**

1. Go to your forked repo on GitHub.
2. Click the **"New Pull Request"** button.
3. Set the base repository to `AgoraIO-Community/cognition-hack-sp-2026` and compare it with your forked branch.
4. In the PR description, include:
   - Team Name
   - Project Name
   - A brief summary of the project
   - Any special instructions of features to focus on or to avoid because they may not be finished. (If applicable)
5. Click **"Create Pull Request"** to submit your project.

---

## 🏆 **Judging Criteria**

Projects will be evaluated based on:

✅ **Project Technical Quality** (33.33%) – Implementation soundness, correct tool usage, functional and bug-free code
✅ **Project Visual Presentation** (33.33%) – Interface polish, user experience, visual clarity of the demo
✅ **Impact and Originality of Idea** (33.34%) – Originality of proposal, potential for real-world impact, solution creativity

### Judging Panel
- **Guilherme Duarte de Barros** – Coordenador das Engenharias & TI e Computação, Universidade Anhembi Morumbi
- **Filipe Cezar dos Santos** – Community Manager, Oracle
- **Matheus Pagani** – Founder e CEO, Venture Miner
- **Edquel B. Prado Farias** – Professor, Universidade Anhembi Morumbi
- **Vera Forbeck** – Professora, Universidade Anhembi Morumbi
- **Gustavo Sant'ana** – Artificial Intelligence Engineer, Oracle
- **Yannick (Yan) Belot** – Head of Sales and Partnerships, Agora
- **Luiz Real** – Lead Software Engineer, Fundunesp


📋 See the full [Judging Rubric](./hackathon-rating-rubric.md) for detailed scoring criteria and evaluation process.

---

## ❓ **Need Help?**

For any questions, reach out to [**{{contact.name}}**](mailto:{{contact.email}}) or join our {{contact.communication.platform}} channel: {{contact.communication.channel}}.



**Happy hacking and good luck!** 🚀
