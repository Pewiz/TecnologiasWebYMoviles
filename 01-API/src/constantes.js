import confetti from "canvas-confetti";

export const ejecutarConfetti = (event) => {
    const { clientX: x, clientY: y } = event;
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: x / window.innerWidth,  // Normaliza la coordenada X o sea obtiene valores entre 0 y 1 para que los confettis no se salga de la ventana
        y: y / window.innerHeight, // Normaliza la coordenada Y o sea obtiene valores entre 0 y 1 para que los confettis no se salga de la ventana
      }
    });
  };

export function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b})`;
    }
