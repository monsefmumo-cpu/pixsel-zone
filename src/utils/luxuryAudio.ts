// Web Audio API engine for Minimalist Piano, Paper Rustle, and Luxury Ambiance

class LuxuryAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentScene: number = 1;
  private pianoLoopTimer: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ctx) {
      this.stopPianoSequence();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Plays a rich, resonant minimalist piano chord
  public playPianoNote(freq: number, duration: number = 3.5, velocity: number = 0.3) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(velocity, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Low pass filter for warm Steinway-like muted acoustic tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(350, now + duration);

      // Fundamental oscillator
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      // Warm octave/harmonic
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Sub harmonic for presence
      const osc3 = this.ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 0.5, now);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.18, now);

      const harmGain = this.ctx.createGain();
      harmGain.gain.setValueAtTime(0.25, now);

      osc1.connect(filter);
      osc2.connect(harmGain);
      harmGain.connect(filter);
      osc3.connect(subGain);
      subGain.connect(filter);

      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      osc3.stop(now + duration);
    } catch {
      // Audio autoplay restrictions gracefully handled
    }
  }

  // Generates subtle high-grade paper rustle sound (Bandpass filtered texture)
  public playPaperRustle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const duration = 0.8;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink/granular noise for paper fibers
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.07;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Audio catch
    }
  }

  // Play minimalist piano motif corresponding to commercial scene
  public playSceneMotif(sceneNumber: number) {
    if (this.isMuted) return;
    this.currentScene = sceneNumber;

    // Frequencies: C4=261.63, Eb4=311.13, G4=392.00, Bb4=466.16, D5=587.33
    // Ab3=207.65, C5=523.25
    if (sceneNumber === 1) {
      // Scene 1: Mystery & Elegance - Slow ethereal Eb major / C minor 9
      this.playPianoNote(207.65, 4.0, 0.22); // Ab3
      setTimeout(() => this.playPianoNote(261.63, 3.5, 0.25), 400); // C4
      setTimeout(() => this.playPianoNote(311.13, 3.2, 0.2), 900); // Eb4
      setTimeout(() => this.playPianoNote(466.16, 4.0, 0.28), 1600); // Bb4
    } else if (sceneNumber === 2) {
      // Scene 2: Detail Focus - Paper rustle + warm ascending harmonic resolution
      this.playPaperRustle();
      setTimeout(() => {
        this.playPianoNote(261.63, 4.5, 0.25); // C4
        setTimeout(() => this.playPianoNote(392.00, 3.8, 0.22), 500); // G4
        setTimeout(() => this.playPianoNote(523.25, 4.0, 0.24), 1100); // C5
        setTimeout(() => this.playPianoNote(587.33, 4.5, 0.2), 1700); // D5
      }, 300);
    } else if (sceneNumber === 3) {
      // Scene 3: Finale - Deep resonant baseline + sparkling celestial high chords
      this.playPianoNote(130.81, 5.0, 0.3); // C3 fundamental
      setTimeout(() => this.playPianoNote(261.63, 4.5, 0.25), 300); // C4
      setTimeout(() => this.playPianoNote(392.00, 4.5, 0.22), 650); // G4
      setTimeout(() => this.playPianoNote(466.16, 4.8, 0.24), 1000); // Bb4
      setTimeout(() => this.playPianoNote(622.25, 5.2, 0.26), 1400); // Eb5
    }
  }

  public stopPianoSequence() {
    if (this.pianoLoopTimer) {
      clearInterval(this.pianoLoopTimer);
      this.pianoLoopTimer = null;
    }
  }
}

export const luxuryAudio = new LuxuryAudioEngine();

// Arabic Voiceover playback assistant using Web Speech API with fallback
export function speakArabicVoiceover(text: string, onStart?: () => void, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.85; // deliberate, calm, luxurious pacing
  utterance.pitch = 0.95; // slightly deeper, warm tone

  // Try to find natural Arabic voice if present
  const voices = window.speechSynthesis.getVoices();
  const arabicVoice = voices.find(v => v.lang.startsWith('ar') || v.name.includes('Arabic'));
  if (arabicVoice) {
    utterance.voice = arabicVoice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;

  window.speechSynthesis.speak(utterance);
}

export function stopArabicVoiceover() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
