const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const numberOfParticles = 1000;
let hue = 0; // For dynamic background

const colors = ["rgba(255, 99, 71, 0.8)", "rgba(30, 144, 255, 0.8)", "rgba(144, 238, 144, 0.8)", "rgba(255, 215, 0, 0.8)"];
const shapes = ["circle", "square", "triangle"];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 5;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 1.5 + 0.5;
    this.orbitRadius = Math.random() * 30 + 10;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
  }

  update() {
    this.angle += 0.02;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (this.x - this.size < 0 || this.x + this.size > canvas.width) this.speed *= -1;
    if (this.y - this.size < 0 || this.y + this.size > canvas.height) this.speed *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();

    if (this.shape === "circle") {
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    } else if (this.shape === "square") {
      ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else if (this.shape === "triangle") {
      ctx.moveTo(this.x, this.y - this.size);
      ctx.lineTo(this.x - this.size, this.y + this.size);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.closePath();
    }
    ctx.fill();
  }
}

function createParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

let textX = Math.random() * window.innerWidth;
let textY = Math.random() * window.innerHeight;
let textSpeedX = 8;
let textSpeedY = 8;
const words =["Madan Belbase", "Creative Coder", "Innovative Thinker"];
let wordIndex = 0;
let textOpacity = 1;

canvas.addEventListener("mousemove", (event) => {
  particlesArray.forEach(particle => {
    let dx = event.clientX - particle.x;
    let dy = event.clientY - particle.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      particle.x -= dx * 0.02;
      particle.y -= dy * 0.02;
    }
  });
});

function animateParticles() {
  hue += 0.5;
  ctx.fillStyle = `hsl(${hue}, 50%, 10%)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  textX += textSpeedX;
  textY += textSpeedY;

  if (textX - 100 < 0 || textX + 100 > canvas.width) textSpeedX *= -1;
  if (textY - 40 < 0 || textY + 40 > canvas.height) textSpeedY *= -1;

  ctx.globalAlpha = textOpacity;
  ctx.font = "bold 50px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(words[wordIndex], textX, textY);
  ctx.globalAlpha = 1;

  if (Math.random() < 0.005) {
    wordIndex = (wordIndex + 1) % words.length;
    textOpacity = 0;
  }
  textOpacity = Math.min(textOpacity + 0.02, 1);

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
animateParticles();
