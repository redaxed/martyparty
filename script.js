// Early 2000s Website JavaScript

// Function to initialize audio with autoplay
function initAudio() {
    // Define playlist of songs
    const allSongs = [
        { src: 'images/birthday-bear1.mp3', title: 'Birthday Bear' },
        { src: 'images/birthday-bear-edm.mp3', title: 'BB EDM' },
        { src: 'images/birthday-bear-canjun.mp3', title: 'BB Cajun' },
        { src: 'images/birthday-bear-jazz.mp3', title: 'BB Jazz' },
        { src: 'images/birthday-bear-country.mp3', title: 'BB Country' }
        { src: 'images/birthday-bear-country.mp3', title: 'BB Rap' }
    ];
    
    // Create randomized playlist with first song always the same
    const playlist = [allSongs[0]];
    
    // Fisher-Yates shuffle algorithm for the remaining songs
    const remainingSongs = allSongs.slice(1);
    for (let i = remainingSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingSongs[i], remainingSongs[j]] = [remainingSongs[j], remainingSongs[i]];
    }
    
    // Add the shuffled songs to the playlist
    playlist.push(...remainingSongs);
    
    let currentSongIndex = 0;
    
    // Create audio element programmatically
    const audioElement = document.createElement('audio');
    audioElement.id = 'bgMusic';
    audioElement.loop = false; // Set to false since we'll handle looping manually
    
    const sourceElement = document.createElement('source');
    sourceElement.src = playlist[currentSongIndex].src;
    sourceElement.type = 'audio/mp3';
    
    audioElement.appendChild(sourceElement);
    document.body.insertBefore(audioElement, document.body.firstChild);
    
    // Create music controls
    const musicControls = document.createElement('div');
    musicControls.className = 'music-controls';
    
    // Create song title display
    const songTitle = document.createElement('div');
    songTitle.className = 'song-title';
    songTitle.textContent = playlist[currentSongIndex].title;
    musicControls.appendChild(songTitle);
    
    // Create control buttons container
    const controlButtons = document.createElement('div');
    controlButtons.className = 'control-buttons';
    
    // Previous song button
    const prevButton = document.createElement('button');
    prevButton.id = 'prevSong';
    prevButton.className = 'music-button';
    prevButton.innerHTML = '⏮️';
    prevButton.title = 'Previous Song';
    controlButtons.appendChild(prevButton);
    
    // Play/Pause button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggleMusic';
    toggleButton.className = 'music-button';
    toggleButton.innerHTML = '🔊';
    toggleButton.title = 'Play/Pause';
    controlButtons.appendChild(toggleButton);
    
    // Next song button
    const nextButton = document.createElement('button');
    nextButton.id = 'nextSong';
    nextButton.className = 'music-button';
    nextButton.innerHTML = '⏭️';
    nextButton.title = 'Next Song';
    controlButtons.appendChild(nextButton);
    
    musicControls.appendChild(controlButtons);
    document.body.insertBefore(musicControls, document.body.firstChild);
    
    // Get references to the audio element and buttons
    const bgMusic = document.getElementById('bgMusic');
    const toggleMusic = document.getElementById('toggleMusic');
    const prevSong = document.getElementById('prevSong');
    const nextSong = document.getElementById('nextSong');
    
    // Update the marquee text with current song
    function updateMarqueeWithSong() {
        const songName = playlist[currentSongIndex].title;
        const marqueeContent = document.querySelector('.marquee-content');
        
        // Check if we already have a song span
        let songSpan = document.getElementById('current-song-span');
        if (!songSpan) {
            // Create a new span for the song
            songSpan = document.createElement('span');
            songSpan.id = 'current-song-span';
            marqueeContent.appendChild(songSpan);
        }
        
        // Update the song span text
        songSpan.textContent = `Now Playing: ${songName}`;
        
        // Update the song title in controls
        songTitle.textContent = songName;
    }
    
    // Function to change song
    function changeSong(direction) {
        if (direction === 'next') {
            currentSongIndex = (currentSongIndex + 1) % playlist.length;
        } else {
            currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        }
        
        // Update source and reload
        bgMusic.src = playlist[currentSongIndex].src;
        
        // Update song title in marquee
        updateMarqueeWithSong();
        
        // Play the new song
        bgMusic.play().catch(error => {
            console.log('Autoplay prevented by browser:', error);
        });
    }
    
    // Function to play music with user interaction
    function playMusic() {
        bgMusic.play().catch(error => {
            console.log('Autoplay prevented by browser:', error);
        });
    }
    
    // Handle song ending - play next song
    bgMusic.addEventListener('ended', function() {
        changeSong('next');
    });
    
    // Try to play music on page load
    window.addEventListener('load', () => {
        // Update marquee with initial song
        updateMarqueeWithSong();
        
        // Try to play automatically
        playMusic();
        
        // Also play on first user interaction
        const playOnInteraction = () => {
            playMusic();
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
        };
        
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('keydown', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
    });
    
    // Toggle music on button click
    toggleMusic.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent this click from triggering the playOnInteraction
        
        if (bgMusic.paused) {
            bgMusic.play();
            toggleMusic.innerHTML = '🔊';
            toggleMusic.classList.remove('muted');
        } else {
            bgMusic.pause();
            toggleMusic.innerHTML = '🔇';
            toggleMusic.classList.add('muted');
        }
    });
    
    // Previous song button
    prevSong.addEventListener('click', function(e) {
        e.stopPropagation();
        changeSong('prev');
    });
    
    // Next song button
    nextSong.addEventListener('click', function(e) {
        e.stopPropagation();
        changeSong('next');
    });
}

// Custom cursor and sparkle effect
document.addEventListener('DOMContentLoaded', function() {
    // Create custom cursor element
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Make all links and buttons show the pointer cursor
    const clickableElements = document.querySelectorAll('a, button, input[type="submit"], input[type="button"]');
    clickableElements.forEach(element => {
        element.style.cursor = 'none';
    });
    
    // Create sparkles container
    const sparklesContainer = document.querySelector('.sparkles-container');
    const maxSparkles = 30; // Increased from 15 to 30 for more sparkles
    const sparkles = [];
    
    // Cat sparkle GIF URL - only using the one that works
    const catSparkleUrl = 'https://media.giphy.com/media/l2JJDdD7cv4xdGGis/giphy.gif'; // Glitter cat
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update custom cursor position
        customCursor.style.left = mouseX + 'px';
        customCursor.style.top = mouseY + 'px';
        
        // Add a new sparkle at the cursor position
        createSparkle(mouseX, mouseY);
    });
    
    // Function to create a sparkle
    function createSparkle(x, y) {
        // Increased probability of creating sparkles (from 0.3 to 0.5)
        if (Math.random() > 0.5) return;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Use the glitter cat GIF
        sparkle.style.backgroundImage = `url('${catSparkleUrl}')`;
        
        // Position slightly behind the cursor with some randomness
        const offsetX = Math.random() * 20 - 10; // Increased range for more spread
        const offsetY = Math.random() * 20 - 10;
        
        sparkle.style.left = (x - 10 + offsetX) + 'px';
        sparkle.style.top = (y - 10 + offsetY) + 'px';
        
        // Add some random animation
        const scale = 0.3 + Math.random() * 0.7; // Varied sizes
        sparkle.style.transform = `scale(${scale})`;
        sparkle.style.opacity = 0.5 + Math.random() * 0.5;
        
        sparklesContainer.appendChild(sparkle);
        sparkles.push(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.style.opacity = '0';
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
                const index = sparkles.indexOf(sparkle);
                if (index > -1) {
                    sparkles.splice(index, 1);
                }
            }, 300);
        }, 500 + Math.random() * 500);
        
        // Remove excess sparkles
        if (sparkles.length > maxSparkles) {
            const oldSparkle = sparkles.shift();
            if (oldSparkle.parentNode) {
                oldSparkle.parentNode.removeChild(oldSparkle);
            }
        }
    }
    
    // Countdown timer
    const countdownDate = new Date('May 22, 2025 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-timer').innerHTML = '<h3>The Birthday Trip Has Started!</h3>';
        }
    }
    
    // Update countdown every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
});

// Guestbook functionality
function addGuestbookEntry() {
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name === '' || message === '') {
        alert('Please fill out both name and message fields!');
        return;
    }
    
    const entriesContainer = document.getElementById('guestbook-entries');
    const newEntry = document.createElement('div');
    newEntry.className = 'guestbook-entry';
    
    // Get current date
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Create random colors for name (early 2000s style)
    const colors = ['#ff66cc', '#33ccff', '#ffcc00', '#66ff66', '#ff6666'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    newEntry.innerHTML = `
        <h4 style="color: ${randomColor};">${name}</h4>
        <p>${message}</p>
        <small>Posted on: ${dateString}</small>
    `;
    
    // Add at the beginning
    entriesContainer.insertBefore(newEntry, entriesContainer.firstChild);
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
    
    // Add random emoji (very 2000s)
    const emojis = ['💖', '✨', '🌟', '💫', '💕', '🎂', '🎉', '🎊'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const emojiElement = document.createElement('div');
    emojiElement.textContent = randomEmoji;
    emojiElement.className = 'rotate';
    emojiElement.style.position = 'absolute';
    emojiElement.style.fontSize = '2rem';
    emojiElement.style.left = Math.random() * window.innerWidth + 'px';
    emojiElement.style.top = Math.random() * window.innerHeight + 'px';
    emojiElement.style.zIndex = '1000';
    document.body.appendChild(emojiElement);
    
    // Remove emoji after animation
    setTimeout(() => {
        emojiElement.remove();
    }, 3000);
}

// Add some random elements occasionally (blinking text, etc.)
document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('h3');
    
    headings.forEach(heading => {
        // 30% chance to make a heading blink
        if (Math.random() < 0.3) {
            heading.classList.add('blink');
        }
    });
    
    // Set random visitor counter
    setRandomVisitorCounter();
    
    // Setup image hover effects
    setupImageHoverEffects();
});

// Function to set a random visitor counter
function setRandomVisitorCounter() {
    // Generate a random number between 10000 and 99999
    const visitorCount = Math.floor(Math.random() * 90000) + 10000;
    
    // Convert to string and split into digits
    const digits = visitorCount.toString().split('');
    
    // Get all counter spans
    const counterSpans = document.querySelectorAll('.counter span');
    
    // Update the counter spans with random digits
    for (let i = 0; i < counterSpans.length; i++) {
        // If we have more spans than digits, pad with zeros at the beginning
        if (i < counterSpans.length - digits.length) {
            counterSpans[i].textContent = '0';
        } else {
            // Otherwise use the digits from our random number
            const digitIndex = i - (counterSpans.length - digits.length);
            counterSpans[i].textContent = digits[digitIndex];
        }
    }
}

// Function to set up image hover effects
function setupImageHoverEffects() {
    const laurenImages = document.querySelectorAll('.lauren-image');
    
    laurenImages.forEach(image => {
        const originalSrc = image.src;
        const hoverSrc = image.getAttribute('data-hover-image');
        let hoverTimeoutId = null;
        
        // Create and preload the hover image
        if (hoverSrc) {
            const preloadImage = new Image();
            preloadImage.src = hoverSrc;
        }
        
        // Add mouse enter event to change to hover image
        image.addEventListener('mouseenter', function() {
            if (hoverSrc) {
                // Clear any existing timeout
                if (hoverTimeoutId) {
                    clearTimeout(hoverTimeoutId);
                    hoverTimeoutId = null;
                }
                this.src = hoverSrc;
            }
        });
        
        // Add mouse leave event to change back to original image after 2 seconds
        image.addEventListener('mouseleave', function() {
            if (hoverTimeoutId) {
                clearTimeout(hoverTimeoutId);
            }
            
            // Set a timeout to revert the image after 2 seconds
            hoverTimeoutId = setTimeout(() => {
                this.src = originalSrc;
                hoverTimeoutId = null;
            }, 2000); // 2000 milliseconds = 2 seconds
        });
    });
}

// Initialize all functions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupCountdown();
    setupSparkles();
    setupImageHoverEffects();
    initAudio();
});

// Function to setup countdown
function setupCountdown() {
    const countdownDate = new Date('May 22, 2025 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-timer').innerHTML = '<h3>The Birthday Trip Has Started!</h3>';
        }
    }
    
    // Update countdown every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Function to setup sparkles
function setupSparkles() {
    const sparklesContainer = document.querySelector('.sparkles-container');
    const maxSparkles = 30; // Increased from 15 to 30 for more sparkles
    const sparkles = [];
    
    // Cat sparkle GIF URL - only using the one that works
    const catSparkleUrl = 'https://media.giphy.com/media/l2JJDdD7cv4xdGGis/giphy.gif'; // Glitter cat
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update custom cursor position
        const customCursor = document.querySelector('.custom-cursor');
        customCursor.style.left = mouseX + 'px';
        customCursor.style.top = mouseY + 'px';
        
        // Add a new sparkle at the cursor position
        createSparkle(mouseX, mouseY);
    });
    
    // Function to create a sparkle
    function createSparkle(x, y) {
        // Increased probability of creating sparkles (from 0.3 to 0.5)
        if (Math.random() > 0.5) return;
        
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Use the glitter cat GIF
        sparkle.style.backgroundImage = `url('${catSparkleUrl}')`;
        
        // Position slightly behind the cursor with some randomness
        const offsetX = Math.random() * 20 - 10; // Increased range for more spread
        const offsetY = Math.random() * 20 - 10;
        
        sparkle.style.left = (x - 10 + offsetX) + 'px';
        sparkle.style.top = (y - 10 + offsetY) + 'px';
        
        // Add some random animation
        const scale = 0.3 + Math.random() * 0.7; // Varied sizes
        sparkle.style.transform = `scale(${scale})`;
        sparkle.style.opacity = 0.5 + Math.random() * 0.5;
        
        sparklesContainer.appendChild(sparkle);
        sparkles.push(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.style.opacity = '0';
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
                const index = sparkles.indexOf(sparkle);
                if (index > -1) {
                    sparkles.splice(index, 1);
                }
            }, 300);
        }, 500 + Math.random() * 500);
        
        // Remove excess sparkles
        if (sparkles.length > maxSparkles) {
            const oldSparkle = sparkles.shift();
            if (oldSparkle.parentNode) {
                oldSparkle.parentNode.removeChild(oldSparkle);
            }
        }
    }
}
