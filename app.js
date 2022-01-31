const audioPlayer = document.querySelector('audio');

audioPlayer.addEventListener('play', () => {

    const contextAudio = new AudioContext();
    const src = contextAudio.createMediaElementSource(audioPlayer);
    const analyzor = contextAudio.createAnalyser();

    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    src.connect(analyzor);
    analyzor.connect(contextAudio.destination);

    analyzor.fftSize = 1024;

    const audioFrequencies = analyzor.frequencyBinCount;
    console.log(audioFrequencies);

    const tabFrequencies = new Uint8Array(audioFrequencies);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const barWidth = (WIDTH / tabFrequencies.length) + 2;
    let barHeight;
    let x;

    function barReturn() {

        requestAnimationFrame(barReturn);

        x = 0;

        analyzor.getByteFrequencyData(tabFrequencies);

        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,WIDTH,HEIGHT);

        for(let i = 0; i < audioFrequencies; i++){

            barHeight = tabFrequencies[i];

            let r = 250;
            let g = 50;
            let b = i;

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, HEIGHT, barWidth, -barHeight)

            x += barWidth + 1;

        }

    }
    barReturn();

})