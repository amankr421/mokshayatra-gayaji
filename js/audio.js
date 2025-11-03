// Background audio functionality
function initAudio() {
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = audioToggle.querySelector('i');
    let audio = null;
    let isPlaying = false;
    
    // Create audio element
    audio = new Audio('assets/audio/mantra.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    
    // Toggle audio playback
    audioToggle.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            audioIcon.className = 'fas fa-volume-mute';
            isPlaying = false;
        } else {
            audio.play().catch(e => {
                console.log('Audio play failed:', e);
                showToast('Audio playback requires user interaction first.', 'error');
            });
            audioIcon.className = 'fas fa-volume-up';
            isPlaying = true;
        }
        audioToggle.classList.toggle('playing');
    });
    
    // Handle audio errors
    audio.addEventListener('error', function() {
        console.error('Error loading audio file');
        showToast('Could not load audio file.', 'error');
    });
}