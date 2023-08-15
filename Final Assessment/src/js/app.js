/* eslint-disable no-unused-vars */
const reviewData = window.reviewData;

document.addEventListener("DOMContentLoaded", function () {
  renderReviewCards(reviewData);

  const createButton = document.getElementById("create-button");

  // Add event listener to the "Create" button
  createButton.addEventListener("click", createReview);
});

function renderReviewCards(reviews) {
  const reviewCardsContainer = document.getElementById("reviewCards");
  reviewCardsContainer.innerHTML = "";

  reviews.forEach((review) => {
    const reviewCard = createReviewCard(review);
    reviewCardsContainer.appendChild(reviewCard);
  });
}

function createReviewCard(review) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("reviewBox");

  const boxTopDiv = document.createElement("div");
  boxTopDiv.classList.add("box-top");

  const profileDiv = document.createElement("div");
  profileDiv.classList.add("profile");

  const profileImgDiv = document.createElement("div");
  profileImgDiv.classList.add("profile-img");

  const profileImg = document.createElement("img");
  profileImg.src = review.profileImgURL;
  profileImg.alt = "User Profile";
  profileImgDiv.appendChild(profileImg);
  profileDiv.appendChild(profileImgDiv);

  const nameUserDiv = document.createElement("div");
  nameUserDiv.classList.add("name-user");

  const nameHeading = document.createElement("h1");
  nameHeading.textContent = review.name;

  const occupationHeading = document.createElement("h2");
  occupationHeading.textContent = review.occupation;

  const timeElement = document.createElement("time");
  timeElement.textContent = review.time;
  timeElement.setAttribute("datetime", review.time);

  occupationHeading.appendChild(timeElement);
  nameUserDiv.appendChild(nameHeading);
  nameUserDiv.appendChild(occupationHeading);
  profileDiv.appendChild(nameUserDiv);

  boxTopDiv.appendChild(profileDiv);

  const reviewsDiv = document.createElement("div");
  reviewsDiv.classList.add("reviews");

  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icon");
  const starIcon = '<i class="fas fa-star"></i>';
  const emptyStarIcon = '<i class="far fa-star"></i>';
  const starRating = `${starIcon.repeat(review.rating)}${emptyStarIcon.repeat(5 - review.rating)}`;
  iconDiv.innerHTML = starRating;
  reviewsDiv.appendChild(iconDiv);

  const descriptionP = document.createElement("p");
  descriptionP.textContent = review.description;
  reviewsDiv.appendChild(descriptionP);

  boxTopDiv.appendChild(reviewsDiv);
  cardDiv.appendChild(boxTopDiv);

  return cardDiv;
}

function createReview(event) {
  event.preventDefault(); // Prevent form submission

  // Get form input values
  const name = document.getElementById("name").value;
  const occupation = document.getElementById("occupation").value;
  const email = document.getElementById("email").value;
  const datetime = document.getElementById("datetime").value;
  const rating = parseInt(document.getElementById("rating").value);
  const reviewText = document.getElementById("review").value;

  // Get the selected profile image file
  const imageInput = document.getElementById("image");
  const profileImgFile = imageInput.files[0];

  // Create a new FileReader to read the image file
  const reader = new FileReader();
  reader.onload = function () {
    // Create a new review object
    const newReview = {
      profileImgURL: reader.result, // Set the profile image data URL
      name: name,
      occupation: occupation,
      email: email,
      time: datetime,
      rating: rating,
      description: reviewText
    };

    // Add the new review object to the reviewData array
    reviewData.push(newReview);

    // Regenerate review cards
    renderReviewCards(reviewData);
  };

  // Read the selected image file as a data URL
  reader.readAsDataURL(profileImgFile);
}

//Responsive Functions

function toggleMenu() {
  var navMenu = document.getElementsByClassName(".navMenu");
  navMenu.classList.toggle("active");
}
