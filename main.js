
if (typeof annyang !== 'undefined') {
  const commands = {
    'hello': () => alert('Hello World!'),
    'change the color to *color': (color) => document.body.style.backgroundColor = color,
    'navigate to *page': (page) => {
      const path = `${page.toLowerCase()}.html`;
      window.location.href = path;
    },
    'load dog breed *breed': (breedName) => {
      const match = window.allBreeds?.find(b => b.name.toLowerCase() === breedName.toLowerCase());
      if (match) displayBreedInfo(match);
      else alert(`Breed "${breedName}" not found`);
    }
  };


  annyang.addCommands(commands);
  annyang.start();


  window.startAudio = () => annyang.start();
  window.stopAudio = () => annyang.abort();
}


function toggleAudio(on) {
  if (annyang) {
    on ? annyang.start() : annyang.abort();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('turn-on')?.addEventListener('click', () => toggleAudio(true));
  document.getElementById('turn-off')?.addEventListener('click', () => toggleAudio(false));
});
