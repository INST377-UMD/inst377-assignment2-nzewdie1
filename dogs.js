async function loadRandomDogs() {
  const url = 'https://dog.ceo/api/breeds/image/random/10';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const images = data.message;

    const carousel = document.getElementById('dog-carousel');
    carousel.innerHTML = ''; 

   
    images.forEach((imgUrl) => {
      const slide = document.createElement('div'); 
      const img = document.createElement('img');
      img.src = imgUrl;
      img.alt = "Dog";
      img.style.width = "100%";
      img.style.height = "400px";
      img.style.objectFit = "cover";
      slide.appendChild(img);
      carousel.appendChild(slide);
    });

    
    new SimpleSlider(carousel, {
      transition: 'slide',
      interval: 0 
    });

  } catch (error) {
    console.error('Error fetching dog images:', error);
  }
}




async function loadBreedButtons() {
  try {
    const res = await fetch('https://api.thedogapi.com/v1/breeds');
    const breeds = await res.json();
    const container = document.getElementById('breed-buttons');
    container.innerHTML = '';

    breeds.slice(0, 10).forEach(breed => {
      const btn = document.createElement('button');
      btn.textContent = breed.name;
      btn.classList.add('custom-btn');
      btn.addEventListener('click', () => showBreedInfo(breed));
      container.appendChild(btn);
    });
  } catch (err) {
    console.error('Dog breed load error:', err);
  }
}

function showBreedInfo(breed) {
  document.getElementById('breed-name').textContent = breed.name;
  document.getElementById('breed-description').textContent = breed.temperament || 'N/A';
  document.getElementById('breed-lifespan').textContent = breed.life_span || 'N/A';
  document.getElementById('breed-info').style.display = 'block';
}


function startAudio() {
  if (annyang) {
    const commands = {
      'hello': () => alert('Hello World'),
      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color;
      },
      'navigate to *page': (page) => {
        window.location.href = `${page.toLowerCase()}.html`;
      },
      'load dog breed *breed': (breedName) => {
        fetch('https://api.thedogapi.com/v1/breeds')
          .then(res => res.json())
          .then(breeds => {
            const match = breeds.find(b => b.name.toLowerCase() === breedName.toLowerCase());
            if (match) showBreedInfo(match);
            else alert('Breed not found');
          });
      }
    };
    annyang.addCommands(commands);
    annyang.start();
  }
}

function stopAudio() {
  if (annyang) annyang.abort();
}


document.addEventListener('DOMContentLoaded', () => {
  loadRandomDogs();
  loadBreedButtons();
});
