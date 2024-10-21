const compareButton = document.getElementById("compareButton");
const resultDiv = document.getElementById("result");

const cosineSimilarity = (a, b) => {
    const termsA = a.split(' ');
    const termsB = b.split(' ');
    const set = new Set([...termsA, ...termsB]);

    let vecA = [], vecB = [];

    set.forEach(term => {
        vecA.push(termsA.filter(word => word === term).length);
        vecB.push(termsB.filter(word => word === term).length);
    });

    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));

    return dotProduct / (magnitudeA * magnitudeB);
}

const extractText = (file, progressBar) => {
    return Tesseract.recognize(
        file,
        'eng',
        {
            logger: (m) => {
                if (m.status === 'recognizing text') {
                    progressBar.style.width = `${m.progress * 100}%`;
                    progressBar.innerHTML = `${Math.round(m.progress * 100)}%`;
                }
            }
        }
    ).then(({ data: { text } }) => text);
}

compareButton.addEventListener("click", async () => {
    const modelAnswerFile = document.getElementById('modelAnswer').files[0];
    const studentAnswerFile = document.getElementById('studentAnswer').files[0];
    const modelProgressBar = document.getElementById('modelProgress');
    const studentProgressBar = document.getElementById('studentProgress');

    modelProgressBar.style.width = '0%';
    studentProgressBar.style.width = '0%';

    if (!modelAnswerFile || !studentAnswerFile) {
        resultDiv.innerHTML = "Please upload both images!";
        return;
    }

    // Extract texts in parallel
    const [modelAnswerText, studentAnswerText] = await Promise.all([
        extractText(modelAnswerFile, modelProgressBar),
        extractText(studentAnswerFile, studentProgressBar)
    ]);

    const similarity = cosineSimilarity(modelAnswerText, studentAnswerText);
    const similarityPercentage = (similarity * 100).toFixed(2);

    resultDiv.innerHTML = `Similarity: ${similarityPercentage}%`;
});
