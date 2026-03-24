const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const Project = require("./models/Project");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../client")));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const seedProjects = async () => {
  const count = await Project.countDocuments();
  if (count > 0) return;

  await Project.insertMany([
    {
      title: "SyncSpace - Real-Time Chat Application",
      description:
        "Developed a real-time chat application using Firebase Realtime Database and Authentication.",
      techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
      features: ["User login authentication", "Real-time messaging", "Cloud database synchronization"],
    },
    {
      title: "Bakery App",
      description: "A Firebase-based bakery product management application.",
      techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
      features: ["User authentication", "Real-time product updates", "Product listing management"],
    },
    {
      title: "Online Learning Website",
      description: "A responsive multi-page learning platform built using HTML, CSS, and JavaScript.",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: ["Course modules", "Clean UI", "Responsive layout"],
    },
  ]);
};

const startServer = async () => {
  await connectDB();
  await seedProjects();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
