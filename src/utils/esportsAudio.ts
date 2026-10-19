// Web Audio API Engine for 30s Esports Cinematic Announcement Trailer
// Includes Spark Ignition, Fire Boom, Sub-Bass Drones, Lightning Cracks, Pitch Risers, 
// and the explosive 808 Sub-Bass Drop at 20s.

class EsportsAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private activeDroneOsc: OscillatorNode | null = null;
  private activeDroneGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.85, this.ctx.currentTime);
    }
    if (muted) {
      this.stopDrone();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 1. Initial Spark Ignition (0s - 1.5s)
  public playSparkIgnition() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Flint Click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.08);

      // Sizzling fire breath
      this.playFilteredNoise(0.6, 2500, 0.15, now + 0.02);
    } catch {
      // Audio autoplay policy
    }
  }

  // 2. Fire Explosion Slam for "TODAY IS FIRE" & Skull (1.5s)
  public playTitleSlamExplosion() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Sub Boom
      const boom = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boom.type = 'sine';
      boom.frequency.setValueAtTime(150, now);
      boom.frequency.exponentialRampToValueAtTime(38, now + 0.9);

      boomGain.gain.setValueAtTime(0.9, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      boom.connect(boomGain);
      boomGain.connect(this.masterGain);
      boom.start(now);
      boom.stop(now + 1.2);

      // Distorted metallic slam
      const metalOsc = this.ctx.createOscillator();
      const metalGain = this.ctx.createGain();
      metalOsc.type = 'sawtooth';
      metalOsc.frequency.setValueAtTime(80, now);
      metalOsc.frequency.exponentialRampToValueAtTime(25, now + 0.35);

      metalGain.gain.setValueAtTime(0.35, now);
      metalGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      metalOsc.connect(metalGain);
      metalGain.connect(this.masterGain);
      metalOsc.start(now);
      metalOsc.stop(now + 0.4);

      // Fire blast noise
      this.playFilteredNoise(1.2, 800, 0.45, now);
    } catch {
      //
    }
  }

  // 3. Ruined Arena Dark Mood Drone (5s - 12s)
  public startArenaAtmosphere() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      this.stopDrone();

      const now = this.ctx.currentTime;
      this.activeDroneOsc = this.ctx.createOscillator();
      this.activeDroneGain = this.ctx.createGain();

      this.activeDroneOsc.type = 'sawtooth';
      this.activeDroneOsc.frequency.setValueAtTime(55, now); // A1 bass note

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, now);

      this.activeDroneGain.gain.setValueAtTime(0.001, now);
      this.activeDroneGain.gain.linearRampToValueAtTime(0.28, now + 1.0);

      this.activeDroneOsc.connect(filter);
      filter.connect(this.activeDroneGain);
      this.activeDroneGain.connect(this.masterGain);

      this.activeDroneOsc.start(now);
    } catch {
      //
    }
  }

  // 4. Tactical Heartbeat / Stomp
  public playHeartbeat() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.18);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      //
    }
  }

  // 5. Fast Cut Whoosh / Gear Grip Snap (12s - 20s)
  public playFastCutWhoosh() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      this.playFilteredNoise(0.25, 1800, 0.4, now);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.22);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      //
    }
  }

  // 6. Lightning Strike Flash Sound
  public playLightningThunder() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Sharp snap
      const snap = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snap.type = 'sawtooth';
      snap.frequency.setValueAtTime(1400, now);
      snap.frequency.exponentialRampToValueAtTime(200, now + 0.09);
      snapGain.gain.setValueAtTime(0.5, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      snap.connect(snapGain);
      snapGain.connect(this.masterGain);
      snap.start(now);
      snap.stop(now + 0.09);

      // Low rolling thunder
      this.playFilteredNoise(1.5, 450, 0.6, now);
    } catch {
      //
    }
  }

  // 7. Tension Pitch Riser (16s - 20s)
  public playTensionRiser() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const duration = 4.0;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + duration);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.5, now + duration - 0.1);
      gain.gain.linearRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + duration);
    } catch {
      //
    }
  }

  // 8. THE BIG BASS DROP AT 20s! (Sub 808 Hit with heavy decay)
  public playBigBassDrop() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      this.stopDrone();
      const now = this.ctx.currentTime;

      // Massive sub-bass 808
      const sub808 = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub808.type = 'sine';
      sub808.frequency.setValueAtTime(145, now);
      sub808.frequency.exponentialRampToValueAtTime(32, now + 0.85);

      subGain.gain.setValueAtTime(1.0, now);
      subGain.gain.exponentialRampToValueAtTime(0.6, now + 0.3);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      sub808.connect(subGain);
      subGain.connect(this.masterGain);
      sub808.start(now);
      sub808.stop(now + 2.8);

      // Impact crack
      const crack = this.ctx.createOscillator();
      const crackGain = this.ctx.createGain();
      crack.type = 'triangle';
      crack.frequency.setValueAtTime(800, now);
      crack.frequency.exponentialRampToValueAtTime(60, now + 0.12);
      crackGain.gain.setValueAtTime(0.6, now);
      crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      crack.connect(crackGain);
      crackGain.connect(this.masterGain);
      crack.start(now);
      crack.stop(now + 0.15);

      // Noise explosion burst
      this.playFilteredNoise(1.8, 1200, 0.75, now);
    } catch {
      //
    }
  }

  // 9. Countdown Beep (26s - 30s)
  public playCountdownTick(isFinal: boolean = false) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isFinal ? 1760 : 880, now); // A5 or A6
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      //
    }
  }

  public stopDrone() {
    if (this.activeDroneGain && this.ctx) {
      try {
        this.activeDroneGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        setTimeout(() => {
          if (this.activeDroneOsc) {
            this.activeDroneOsc.stop();
            this.activeDroneOsc.disconnect();
            this.activeDroneOsc = null;
          }
        }, 220);
      } catch {
        //
      }
    }
  }

  private playFilteredNoise(duration: number, cutoff: number, volume: number, startTime: number) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, startTime);
    filter.frequency.exponentialRampToValueAtTime(100, startTime + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(startTime);
    noise.stop(startTime + duration);
  }
}

export const esportsAudio = new EsportsAudioEngine();
