type SoundName =
  | "xp_gain"
  | "word_lookup"
  | "level_up"
  | "quiz_correct"
  | "quiz_wrong"
  | "page_turn"
  | "achievement"
  | "combo"
  | "click";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.15,
  delay = 0,
) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + delay + duration,
  );

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
}

function playNoise(duration: number, volume = 0.05, delay = 0) {
  const ctx = getAudioContext();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
  }

  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  source.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.setValueAtTime(3000, ctx.currentTime + delay);
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(ctx.currentTime + delay);
}

const SOUNDS: Record<SoundName, () => void> = {
  xp_gain: () => {
    playTone(880, 0.12, "sine", 0.12);
    playTone(1320, 0.15, "sine", 0.1, 0.06);
  },

  word_lookup: () => {
    playTone(600, 0.08, "sine", 0.08);
    playTone(800, 0.1, "sine", 0.06, 0.05);
  },

  level_up: () => {
    playTone(523, 0.15, "square", 0.08);
    playTone(659, 0.15, "square", 0.08, 0.12);
    playTone(784, 0.15, "square", 0.08, 0.24);
    playTone(1047, 0.3, "square", 0.1, 0.36);
    playNoise(0.2, 0.04, 0.36);
  },

  quiz_correct: () => {
    playTone(523, 0.1, "sine", 0.1);
    playTone(659, 0.1, "sine", 0.1, 0.08);
    playTone(784, 0.2, "sine", 0.12, 0.16);
  },

  quiz_wrong: () => {
    playTone(300, 0.2, "sine", 0.08);
    playTone(250, 0.3, "sine", 0.06, 0.15);
  },

  page_turn: () => {
    playNoise(0.15, 0.03);
  },

  achievement: () => {
    playTone(660, 0.12, "sine", 0.1);
    playTone(880, 0.12, "sine", 0.1, 0.1);
    playTone(1100, 0.12, "sine", 0.1, 0.2);
    playTone(1320, 0.25, "sine", 0.12, 0.3);
    playNoise(0.15, 0.03, 0.3);
  },

  combo: () => {
    playTone(1000, 0.06, "square", 0.06);
    playTone(1200, 0.06, "square", 0.06, 0.04);
    playTone(1400, 0.1, "square", 0.08, 0.08);
  },

  click: () => {
    playTone(800, 0.04, "sine", 0.05);
  },
};

let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  localStorage.setItem("litxp_sound", enabled ? "on" : "off");
}

export function isSoundEnabled(): boolean {
  const stored = localStorage.getItem("litxp_sound");
  if (stored !== null) {
    soundEnabled = stored === "on";
  }
  return soundEnabled;
}

export function playSound(name: SoundName) {
  if (!isSoundEnabled()) return;

  try {
    SOUNDS[name]();
  } catch {
    // AudioContext may not be available
  }
}
