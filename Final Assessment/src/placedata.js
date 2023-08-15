const placeCardsData = [
  {
    title: "Inani Beach Point",
    imageSrc: "Media/Inani 2.jpg",
    description:
      "The Inani Beach is particularly spectacular for its silent nature and eccentric environment."
  },
  {
    title: "Himchori",
    imageSrc: "Media/himchori.jpg",
    description:
      "Himchori Waterfall is the only cold water waterfall in Bangladesh, which is situated in Cox's Bazar."
  },
  {
    title: "Laboni Beach Point",
    imageSrc: "Media/Laboni point.jpg",
    description: "The oldest beach area in Cox's Bazar and undoubtedly the most popular one."
  },
  {
    title: "Saint Martin Island",
    imageSrc: "Media/St. martin.jpg",
    description: "Discover the enchanting allure of Saint Martin's, Bangladesh's only coral island."
  },
  {
    title: "Dulahazra Safari Park",
    imageSrc: "Media/Dulahazra.jpeg",
    description:
      "Dulahazra Safari Park is a natural reserve forest at Dulahazra in Cox's Bazar district."
  },
  {
    title: "Ukhia- Typical Site",
    imageSrc: "Media/Ukhia.jpg",
    description:
      "Enjoy the typical site of southern Bangladesh, where you can find the one of the biggest refugee camp in the world."
  },
  {
    title: "Ramu- Old Buddha Temple",
    imageSrc: "Media/ramu.jpg",
    description:
      "Ramu is known for monasteries, temples, and various Buddhist statues and images. The Rangkut Bonasram Buddha Bihar is the oldest temple in the area and is said to have been set up in 338 BC."
  },
  {
    title: "Sonadia Island",
    imageSrc: "Media/sonadia.jpg",
    description:
      "Sonadia Island, a small island of Cox’s Bazaar, is a sanctuary for migratory birds such as petrels, snipes, ducks and other waterfowls."
  },
  {
    title: "Radiant Fish World",
    imageSrc: "Media/fish.png",
    description:
      "Radiant Fish World is one of the biggest underwater aquariums of Bangladesh. 150 to 200 species of fish are preserved here."
  },
  {
    title: "Sugandha Point",
    imageSrc: "Media/Sugandha.jpg",
    description:
      "This is the most popular point, so everyone crowds here. Here is the popular Burmese market."
  },
  {
    title: "Dorianogor Sea Beach",
    imageSrc: "Media/Parasailing-coxs-bazar-1024x623.jpg",
    description:
      "If you go 4 km along Marine Drive, you will find this beach. There are parasailing points here."
  },
  {
    title: "Marine Drive",
    imageSrc: "Media/Marine+drive+road.jpg",
    description:
      "The biggest attraction of Cox’s Bazar is Marine Drive. One side of which is the sea and the other side is the mountain."
  }
];

function generatePlaceCards() {
  const placeCardsContainer = document.querySelector(".place-cards");

  placeCardsData.forEach((place) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML = `
      <div class="card-image">
        <img src="${place.imageSrc}" alt="${place.title}" />
        <div class="card-content">
          <h2>${place.title}</h2>
          <p>${place.description}</p>
          <div class="More">
            <a href="#" class="read-more">Explore<span> More</span></a>
            <div class="icon-links">
              <i class="fas fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    `;

    placeCardsContainer.appendChild(cardElement);
  });
}

// Call the function to generate place cards
generatePlaceCards();
