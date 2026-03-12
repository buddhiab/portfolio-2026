import { useState, useEffect } from 'react';

// The pool of random characters to cycle through
const CHARACTERS = '!<>-_\\/[]{}—=+*^?#________';

export function useTextScramble(text, duration = 30) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let iteration = 0;
        let interval = null;

        // Reset and start the interval
        clearInterval(interval);

        interval = setInterval(() => {
            setDisplayText(() =>
                text
                    .split('')
                    .map((letter, index) => {
                        // If the letter has "resolved", show the actual letter
                        if (index < iteration) {
                            return text[index];
                        }
                        // Otherwise, show a random character
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                    })
                    .join('')
            );

            // Stop the interval once all letters are resolved
            if (iteration >= text.length) {
                clearInterval(interval);
            }

            // The smaller the fraction, the slower the text reveals itself
            iteration += 1 / 3;
        }, duration);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [text, duration]);

    return displayText;
}