(function(){
  const canvas = document.getElementById('binaryCanvas');
  if(!canvas) return console.error('No se encontró canvas');
  const ctx = canvas.getContext('2d');

  const binaryChars = '01';
  let fontSize = 16;
  let columns = 0;
  let drops = [];

  function setup() {
    // tamaño real del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ajuste dinámico de fontSize para que se vea bien en móviles/pc
    fontSize = Math.max(12, Math.floor(window.innerWidth / 80));
    columns = Math.floor(canvas.width / fontSize) || 1;
    drops = new Array(columns).fill(1);
  }

  function draw() {
    // rastro
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = '#AF1A13';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  // inicializa y dibuja
  setup();
  const interval = setInterval(draw, 40);

  // reconfigura al cambiar tamaño de ventana
  window.addEventListener('resize', () => {
    setup();
  });

  // asegurarnos por JS que el mensaje quede por encima si CSS falla
  const mensaje = document.querySelector('.mensaje');
  if (mensaje) {
    mensaje.style.zIndex = 9999;
    mensaje.style.position = 'fixed';
    mensaje.style.pointerEvents = 'none';
  }
})();
