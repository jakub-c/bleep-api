(function generateCall() {
  fetch("https://jakub-c-bleep-midi-dev.deno.dev/1/E2/");
  const intervalTime = Math.floor(Math.random() * 4 + 1) * 80;
  setTimeout(generateCall, intervalTime);
})();

(function generateCall2() {
  fetch("https://jakub-c-bleep-midi-dev.deno.dev/2/G2/");
  const intervalTime = Math.floor(Math.random() * 5 + 1) * 60;
  setTimeout(generateCall2, intervalTime);
})();
