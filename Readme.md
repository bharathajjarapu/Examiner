# Answer Comparator 📚

This project compares text answers. It takes input through text or an image (using Tesseract.js) and compares it with a reference answer.

## Features 🚀
- Text or image upload
- Tesseract.js for OCR
- Cosine Similarity for answer comparison

## Cosine Similarity 🤔
Cosine Similarity measures the angle between two vectors. For two texts, each is turned into a vector based on word counts or embeddings. The formula is:

$$\cos(\theta) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$

Result is a value between 0 and 1. Closer to 1 means more similar.

## How It Works 🛠
1. Select input type (text or image).
2. If image, use Tesseract to extract text.
3. Convert both inputs into numerical vectors.
4. Calculate cosine similarity to gauge likeness.

## Tech Stack 🍀
- HTML, CSS, Bootstrap
- JavaScript, Tesseract.js (for Image to Text)
- Mathematical operations for vector comparisons

## Setup & Usage 🏁
1. Clone or download the repository.
2. Open `index.html` in your browser.
3. Select input type, enter/upload your answers.
4. View the similarity result.

## Why This Matters 💡
Cosine Similarity is quick and effective for measuring textual overlap. It’s common in machine learning, natural language processing, and search engines.

Happy Coding! 🎉