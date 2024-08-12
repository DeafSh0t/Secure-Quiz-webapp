document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const resultModal = document.getElementById('result-modal');
    const resultText = document.getElementById('result');
    const closeModal = document.getElementById('close-modal');

    // Sample questions
    const questions = [
        {
            question: 'Which of the following is a common method used to perform a Man-in-the-Middle (MitM) attack?',
            options: ['Phishing', 'ARP Spoofing', 'SQL Injection', 'Denial Of Service(DOS)'],
            answer: 'ARP Spoofing'
        },
        {
            question: 'What is the primary purpose of a firewall in network security?',
            options: ['To scan and remove viruses from the network',
                'To encrypt data transmitted over the network',
                'To monitor and control incoming and outgoing network traffic based on predetermined security rules',
                'To manage user authentication and authorization'],
            answer: 'To monitor and control incoming and outgoing network traffic based on predetermined security rules'
        },
        {
            question: 'What does the acronym "DDoS" stand for?',
            options: ['Distributed Denial of Service', 'Distributed Data Overload System', 'Direct Denial of Service', 'Dynamic Data Overload System'],
            answer: 'Distributed Denial of Service'
        },
        {
            question: 'Which of the following is a type of malware that encrypts a victim\'s files and demands payment for decryption?',
            options: ['Trojan', 'Worm', 'Ransomware', 'Spyware'],
            answer: 'Ransomware'
        },
        {
            question: 'What is a common method of securing a wireless network?',
            options: ['Using WPA2 encryption', 'Disabling the SSID broadcast', 'Changing the default router password', 'All of the above'],
            answer: 'All of the above'
        },
        {
            question: 'Which protocol is used to securely transfer files over the internet?',
            options: ['FTP', 'HTTP', 'SFTP', 'SMTP'],
            answer: 'SFTP'
        },
        {
            question: 'What is a zero-day vulnerability?',
            options: ['A vulnerability that has been patched but not yet discovered', 'A known vulnerability with a fix available', 'A vulnerability discovered and exploited before a patch is available', 'A vulnerability that affects zero systems'],
            answer: 'A vulnerability discovered and exploited before a patch is available'
        },
        {
            question: 'Which of the following is NOT a common type of social engineering attack?',
            options: ['Phishing', 'Pretexting', 'Spamming', 'Baiting'],
            answer: 'Spamming'
        },
        {
            question: 'What does "HTTPS" stand for?',
            options: ['Hypertext Transfer Protocol Secure', 'Hypertext Transfer Protocol Service', 'Hypertext Transport Protocol Secure', 'Hypertext Transport Protocol Service'],
            answer: 'Hypertext Transfer Protocol Secure'
        },
        {
            question: 'What is the primary function of an Intrusion Detection System (IDS)?',
            options: ['To prevent unauthorized access', 'To monitor and report suspicious activities', 'To manage network traffic', 'To encrypt data'],
            answer: 'To monitor and report suspicious activities'
        },
        {
            question: 'What type of attack involves an attacker intercepting and altering communication between two parties?',
            options: ['Man-in-the-Middle Attack', 'Phishing Attack', 'SQL Injection Attack', 'Denial of Service Attack'],
            answer: 'Man-in-the-Middle Attack'
        },
        {
            question: 'Which of the following is a secure method for storing passwords?',
            options: ['Plain text', 'MD5 hashing', 'SHA-256 hashing', 'Base64 encoding'],
            answer: 'SHA-256 hashing'
        },
        {
            question: 'What is a common method to protect against SQL Injection attacks?',
            options: ['Input validation', 'Encryption', 'Regular backups', 'Firewall rules'],
            answer: 'Input validation'
        },
        {
            question: 'Which security concept involves ensuring that data is not altered in an unauthorized manner?',
            options: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'],
            answer: 'Integrity'
        },
        {
            question: 'What is the main purpose of a Virtual Private Network (VPN)?',
            options: ['To speed up internet connection', 'To securely connect to a remote network over the internet', 'To block ads on websites', 'To manage passwords and user authentication'],
            answer: 'To securely connect to a remote network over the internet'
        }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = {};

    function loadQuestion(index) {
        const q = questions[index];
        quizForm.innerHTML = `
            <div class="question">
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((opt, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${opt}" ${userAnswers[index] === opt ? 'checked' : ''}>
                        ${opt}
                    </label>
                `).join('')}
            </div>
        `;

        prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
    }

    function saveAnswer(index) {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            userAnswers[index] = selectedOption.value;
        }
    }

    function getResults() {
        let score = 0;
        questions.forEach((q, index) => {
            if (userAnswers[index] === q.answer) {
                score++;
            }
        });
        return score;
    }

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const score = getResults();
        resultText.textContent = `Your score is ${score} out of ${questions.length}.`;
        resultModal.style.display = 'block'; // Show the modal
    });

    nextBtn.addEventListener('click', function() {
        saveAnswer(currentQuestionIndex);
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            currentQuestionIndex = questions.length - 1;
        }
        loadQuestion(currentQuestionIndex);
    });

    prevBtn.addEventListener('click', function() {
        saveAnswer(currentQuestionIndex);
        currentQuestionIndex--;
        if (currentQuestionIndex < 0) {
            currentQuestionIndex = 0;
        }
        loadQuestion(currentQuestionIndex);
    });

    resetBtn.addEventListener('click', function() {
        // Clear user answers
        for (let i = 0; i < questions.length; i++) {
            delete userAnswers[i];
        }

        // Clear all radio button selections
        const radioButtons = quizForm.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => radio.checked = false);

        // Reset quiz state
        currentQuestionIndex = 0;
        loadQuestion(currentQuestionIndex);

        // Hide result modal and update button visibility
        resultModal.style.display = 'none';
        nextBtn.style.display = 'inline-block';
        prevBtn.style.display = 'none';
    });

    closeModal.addEventListener('click', function() {
        resultModal.style.display = 'none'; // Hide the modal when the close button is clicked
    });

    window.addEventListener('click', function(event) {
        if (event.target === resultModal) {
            resultModal.style.display = 'none'; // Hide the modal when clicking outside the modal
        }
    });

    loadQuestion(currentQuestionIndex);
});
