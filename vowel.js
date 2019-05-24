class Vowel {
  constructor(target_id) {
    this.id = target_id;
    this.ctx = this.id.getContext("2d");
    this.rect = this.id.getBoundingClientRect();
    console.log(this.rect);
    this.audioCtx = new AudioContext();


//    this.id.addEventListener('mousemove', (e) => {

//    })
  }
}

window.addEventListener("load", () => {
  var vowel = null;
  document.querySelector("#start").addEventListener("click", () => {
    vowel = new Vowel(document.querySelector("#can"));
    can_init();
  });

  var can, ctx;
  var mouse_condition = false;
  var data = new Array();
  var drag_color = 0;

  function can_init() {
    can = document.getElementById("can");
    ctx = can.getContext("2d");
    can.addEventListener("mousemove", function(e) {
      
      if (mouse_condition) {
        var rect = e.target.getBoundingClientRect();
        var mex = e.clientX - rect.left;
        var mey = e.clientY - rect.top;

        let freq1 = mex * 2.0 + 200.0;
        let freq2 = ( 640 - mey ) * 6.0 + 600.0;
        vowel.osc1.frequency.value = freq1;
        vowel.osc2.frequency.value = freq2;
        console.log( freq2 );
        ctx.beginPath();
        if (drag_color < 255) drag_color += 1;
        ctx.fillStyle =
          "rgb(" + drag_color + "," + drag_color + drag_color + ")";
        ctx.arc(mex, mey, 5, 0, Math.PI * 2, false);
        ctx.fill();
        data.push([mex, mey]);
      }
    });
    can.addEventListener("mousedown", function(e) {
        vowel.osc1 = vowel.audioCtx.createOscillator();
        vowel.osc2 = vowel.audioCtx.createOscillator();
        let amp = vowel.audioCtx.createGain();
        amp.gain.value = 0.5;
        vowel.osc1.type = "sine";
        vowel.osc2.type = "sine";
        vowel.osc1.connect(vowel.audioCtx.destination);
        //vowel.osc2.connect(vowel.audioCtx.destination);
        vowel.osc2.connect(amp);
        amp.connect(vowel.audioCtx.destination);
        var rect = e.target.getBoundingClientRect();
        var mex = e.clientX - rect.left;
        var mey = e.clientY - rect.top;

        let freq1 = mex * 2.0 + 200.0;
        let freq2 = ( 640 - mey ) * 6.0 + 600.0;
        vowel.osc1.frequency.value = freq1;
        vowel.osc2.frequency.value = freq2;
console.log( freq2 );

        vowel.osc1.start();
        vowel.osc2.start();
      mouse_condition = true;
      drag_color = 0;
      data.length = 0;
    });
    can.addEventListener("mouseup", function(e) {
        vowel.osc1.stop();
        vowel.osc2.stop();
      mouse_condition = false;
      console.log(">>>" + JSON.stringify(data)); // 後々，通信部分を追加する予定
      // (あくまで予定)
      data.length = 0;
    });
  }
});
