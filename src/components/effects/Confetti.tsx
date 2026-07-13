import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";

let engineReady = false;

async function ensureEngine() {
  if (engineReady) return;
  await loadSlim(tsParticles);
  engineReady = true;
}

interface ConfettiProps {
  trigger: boolean;
  duration?: number;
}

export function Confetti({ trigger, duration = 3000 }: ConfettiProps) {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(engineReady);

  useEffect(() => {
    ensureEngine().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (trigger && ready) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, ready, duration]);

  if (!show || !ready) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <Particles
        id="confetti"
        options={{
          fullScreen: false,
          fpsLimit: 60,
          particles: {
            number: { value: 80 },
            color: {
              value: ["#7C3AED", "#FCD34D", "#34D399", "#F472B6", "#60A5FA", "#FB923C"],
            },
            shape: {
              type: ["circle", "square"],
            },
            opacity: {
              value: { min: 0.6, max: 1 },
              animation: {
                enable: true,
                speed: 1,
                startValue: "max",
                destroy: "min",
              },
            },
            size: {
              value: { min: 3, max: 8 },
            },
            move: {
              enable: true,
              speed: { min: 10, max: 25 },
              direction: "top",
              gravity: {
                enable: true,
                acceleration: 15,
              },
              outModes: { default: "destroy" },
              straight: false,
            },
            rotate: {
              value: { min: 0, max: 360 },
              animation: { enable: true, speed: 30 },
            },
            tilt: {
              enable: true,
              value: { min: 0, max: 360 },
              animation: { enable: true, speed: 30 },
            },
            life: {
              duration: { value: 3 },
              count: 1,
            },
          },
          emitters: {
            position: { x: 50, y: 60 },
            rate: { quantity: 20, delay: 0.1 },
            life: { count: 1, duration: 0.5 },
            size: { width: 80, height: 0 },
          },
        }}
      />
    </div>
  );
}
