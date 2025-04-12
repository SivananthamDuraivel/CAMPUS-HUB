const { exec } = require("child_process");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const summarizeText = async (req, res) => {
    try {
        console.log("Received file info:", req.file);
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Read the uploaded PDF file
        const filePath = path.join(__dirname, "../uploads", req.file.filename);
        const fileBuffer = fs.readFileSync(filePath);

        // Extract text from the PDF
        const data = await pdfParse(fileBuffer);
        const extractedText = data.text.replace(/\s+/g, ' ').trim();

        // Limit text length to avoid issues
        const textSnippet = extractedText.slice(0, 5000);

        // Write extracted text to a temp file
        const tempFilePath = path.join(__dirname, "../uploads/temp_text.txt");
        fs.writeFileSync(tempFilePath, textSnippet, "utf-8");
        console.log("Text written to:", tempFilePath);

        // Prepare command to execute Python script
        const pythonScriptPath = path.join(__dirname, "../text_summarizer.py");
        const command = process.platform === 'win32'
            ? `python ${pythonScriptPath} "${tempFilePath}"`
            : `python3 ${pythonScriptPath} '${tempFilePath}'`;

        console.log("Command Executed:", command); // Debugging

        // Execute the Python script
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Script Error:", error);
                return res.status(500).json({ error: "Script execution failed" });
            }
            console.log("Script Output:", stdout);
            res.send(stdout);
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Error processing file" });
    }
};

module.exports = { summarizeText };
