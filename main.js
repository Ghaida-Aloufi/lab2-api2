document.addEventListener('DOMContentLoaded', () => {
  let input = document.getElementById("input");
  let imgInput = document.getElementById("img");
  let submitBtn = document.getElementById("btn");
  let container = document.getElementById("container");

  let addImage = (id, url, name) => {
    let div = document.createElement("div");
    div.classList.add("image-item");

    div.innerHTML = `
      <img src="${url}" alt="${name}" class="image">
      <p class="image-name">${name}</p>
      <button class="delete-btn" data-id="${id}">Delete</button>
    `;

    div.querySelector('.delete-btn').addEventListener('click', (event) => {
      let button = event.target;
      let imageId = button.getAttribute('data-id');
      deleteImage(imageId, div);
    });

    container.appendChild(div);
  };

  let deleteImage = (id, element) => {
    fetch(`https://66e7e69bb17821a9d9da6eab.mockapi.io/login/${id}`, { 
      method: 'DELETE' })
      .then(response => response.json())
      .then(() => element.remove())
      .catch(console.error);
  };

  let loadImages = () => {
    fetch("https://66e7e69bb17821a9d9da6eab.mockapi.io/login")
      .then(response => response.json())
      .then(data => {
        data.forEach(imageData => {
          addImage(imageData.id, imageData.img, imageData.name);
        });
      })
      .catch(console.error);
  };

  submitBtn.addEventListener("click", () => {
    fetch("https://66e7e69bb17821a9d9da6eab.mockapi.io/login", {
      method: 'POST',
      body: JSON.stringify({
        name: input.value,
        img: imgInput.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => response.json())
    .then(data => {
      addImage(data.id, data.img, data.name); 
      input.value = ''; 
      imgInput.value = '';
    })
    .catch(console.error);
  });

  loadImages();
});
