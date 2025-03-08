function handleLazyVideoLoad(iframes) {
  for (let i = 0; i < iframes.length; i++) {
    console.log(iframes[i]); 
    console.log(iframes[i].dataset.src);
    console.log(iframes[i].src);
    const storeSRC = iframes[i].dataset.src;
    iframes[i].addEventListener('lazyloaded', () => {
      iframes[i].src = iframes[i].dataset.src;
      delete iframes[i].dataset.src;
      initVimeoPlayer(iframes[i], i);
    });
  }
}

function initVimeoPlayer(iframe, i) {
  players[i] = new Vimeo.Player(iframe);
  players[i].ready().then(function () {
  console.log('player is ready!');

    // These events are not attaching? Why?
    players[i].on('play', function () {
      console.log('played the video!');
    });

    players[i].on('ended', function () {
      console.log('the video has ended');
    });

  });
}
let players = [];
let videos = document.querySelectorAll('.lazy-video');
console.log(videos);
handleLazyVideoLoad(videos); 
console.log('lazy-video V 0.0.4');