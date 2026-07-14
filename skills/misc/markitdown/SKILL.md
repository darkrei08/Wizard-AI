---
name: markitdown
description: "Use to convert any file (PDF, DOCX, XLSX, PPTX, HTML, images, audio, ZIP, EPUB, XML, CSV, JSON) into clean Markdown suitable for LLM ingestion or RAG. Use when the user wants to analyze a non-text file, when a document needs to be added to context, or before running Graphify on a mixed-format corpus."
---

# /markitdown

MarkItDown converts virtually any file format to Markdown for LLM and RAG pipelines.
Installed at `~/.local/bin/markitdown`.

## CLI Usage

```bash
# Convert a single file to stdout
markitdown document.pdf
markitdown report.docx
markitdown spreadsheet.xlsx
markitdown presentation.pptx
markitdown webpage.html
markitdown image.png           # extracts text via OCR/alt text
markitdown audio.mp3           # transcribes speech to text
markitdown archive.zip         # extracts and converts all files inside

# Save to file
markitdown document.pdf > document.md
markitdown report.docx -o report.md

# Convert from URL
markitdown https://example.com/article

# Process stdin (pipe)
cat file.html | markitdown

# With Azure Document Intelligence (better OCR for PDFs)
markitdown --use-docintel document.pdf
```

## Python Usage

```python
from markitdown import MarkItDown

md = MarkItDown()
result = md.convert("document.pdf")
print(result.text_content)

# Convert URL
result = md.convert("https://example.com/page")

# Convert multiple files
for path in Path("docs/").glob("*.pdf"):
    result = md.convert(str(path))
    Path(path.stem + ".md").write_text(result.text_content)
```

## Supported Formats

| Category | Formats |
|----------|---------|
| Documents | PDF, DOCX, PPTX, XLSX, ODT |
| Web | HTML, HTM, URLs |
| Text | TXT, CSV, JSON, XML, YAML |
| Images | PNG, JPG, GIF, BMP, TIFF (via OCR) |
| Audio | MP3, WAV, M4A (via Whisper transcription) |
| Archives | ZIP (recursive conversion) |
| E-books | EPUB |

## When to Use

- User wants to analyze a PDF, Word doc, or spreadsheet with an LLM
- Preparing documents for Graphify or RAG ingestion
- User asks "can you read this file" for a non-text format
- Converting a corpus of mixed-format documents to Markdown before indexing
- User wants to extract text from images or audio files
