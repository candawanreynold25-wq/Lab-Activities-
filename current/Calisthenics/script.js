// script.js
// Smooth Scroll for Learn More Button
document.getElementById('learn-more-btn')?.addEventListener('click', function() {
    document.querySelector('.benefits').scrollIntoView({
        behavior: 'smooth'
    });
});

// Quiz Interactivity
const quizButtons = document.querySelectorAll('.quiz-btn');
const feedback = document.getElementById('quiz-feedback');

quizButtons.forEach(button => {
    button.addEventListener('click', function() {
        quizButtons.forEach(btn => btn.disabled = true);
        if (this.dataset.answer === 'correct') {
            feedback.textContent = 'Correct! Calisthenics is all about bodyweight mastery.';
            feedback.style.color = '#00ff00';
        } else {
            feedback.textContent = 'Not quite. Try again!';
            feedback.style.color = '#ff0000';
            setTimeout(() => {
                quizButtons.forEach(btn => btn.disabled = false);
                feedback.textContent = '';
            }, 2000);
        }
    });
});

// Parallax effect and hide Learn More button
window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (heroContent) {
        const scrollPosition = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
    // Hide Learn More button when scrolling down
    if (learnMoreBtn) {
        if (window.pageYOffset > 100) {
            learnMoreBtn.style.display = 'none';
        } else {
            learnMoreBtn.style.display = 'block';
        }
    }
});

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('form-feedback').textContent = 'Message sent successfully!';
        document.getElementById('form-feedback').style.color = '#00ff00';
        setTimeout(() => {
            contactForm.reset();
            document.getElementById('form-feedback').textContent = '';
        }, 3000);
    });
}

// Store Add to Cart (placeholder)
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        alert('Added to cart!');
    });
});

// Live Chat
const chatButton = document.getElementById('chat-button');
const chatModal = document.getElementById('chat-modal');
const closeChat = document.getElementById('close-chat');
const sendChat = document.getElementById('send-chat');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatButton.addEventListener('click', function() {
    chatModal.style.display = 'block';
});

closeChat.addEventListener('click', function() {
    chatModal.style.display = 'none';
});

sendChat.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage('You: ' + message, 'user');
        chatInput.value = '';
        // Simulate response
        setTimeout(() => {
            addMessage('Bro: Great question! Keep pushing those reps!', 'bot');
        }, 1000);
    }
}

function addMessage(text, className) {
    const msg = document.createElement('p');
    msg.textContent = text;
    msg.classList.add(className);
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}