const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./prismaClient");

const app = express();

app.use(cors());
app.use(express.json());

// GET - View all students
app.get("/api/students", async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve students." });
    }
});

// POST - Add student
app.post("/api/students", async (req, res) => {
    try {
        const { name, email, course } = req.body;

        if (!name || !email || !course) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const student = await prisma.student.create({
            data: { name, email, course }
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: "Failed to add student." });
    }
});

// PUT - Update student
app.put("/api/students/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, course } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: "Invalid student ID." });
        }

        const student = await prisma.student.update({
            where: { id },
            data: { name, email, course }
        });

        res.json(student);
    } catch (error) {
        res.status(400).json({ error: "Failed to update student." });
    }
});

// DELETE - Delete student
app.delete("/api/students/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: "Invalid student ID." });
        }

        await prisma.student.delete({
            where: { id }
        });

        res.json({ message: "Student deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete student." });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});