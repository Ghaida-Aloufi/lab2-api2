

let input = document.getElementById("input")
let btn = document.getElementById("btn")
let btn2 = document.getElementById("btn2")
let img = document.getElementById("img")
let Container = document.getElementById("container");

btn.addEventListener("click", () => {
  fetch("https://66e7e69bb17821a9d9da6eab.mockapi.io/login", {
    method: 'POST',
    body: JSON.stringify({
      name: input.value,
      img: img.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

    .then((response) => response.json())
    .then((data) => {

      let div = document.createElement("div");
      let image = document.createElement("img");
      let name = document.createElement("p");

      image.src = data.img;
      image.alt = data.name;
      name.textContent = data.name;

      Container.appendChild(name);
      Container.appendChild(image);
      imageContainer.appendChild(div);
    })

});

