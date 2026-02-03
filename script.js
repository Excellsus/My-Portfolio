
    (function() {
        const words = ["Web Developer", "Game Developer", "Media Editor", "Photographer"];
        const typingElement = document.querySelector('.typing-text span');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 80;      // Speed of typing (ms per character)
        const deleteSpeed = 40;    // Speed of deleting (faster, like holding backspace)
        const pauseAfterWord = 2000; // Pause after typing complete word
        const pauseBeforeType = 500; // Pause before typing new word
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Deleting characters
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(type, pauseBeforeType);
                } else {
                    setTimeout(type, deleteSpeed);
                }
            } else {
                // Typing characters
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, pauseAfterWord);
                } else {
                    setTimeout(type, typeSpeed);
                }
            }
        }
        
        // Start typing animation
        setTimeout(type, 1000);
    })();

