const events = [
  {
    id: 1,
    title: "Diving Trip in Aseer Coast",
    image: "Aseer_diving.png",
    date: "Available by Reservation",
    location: "Aseer Coast, Abha",
    description: "Discover underwater wonders with a guided diving trip along the stunning Aseer coastline. Perfect for adventure lovers seeking a unique experience in Saudi Arabia.",
    booking: "https://webook.com/en/experiences/diving-trip-in-aseer-coast"
  },
  {
    id: 2,
    title: "Navigation Land – Jeddah Season 2025",
    image: "Navigation_Land.png",
    date: "April 29 – June 14, 2025",
    location: "City Walk, Jeddah",
    description: "Join the excitement at City Walk, Jeddah! Try out air rifle shooting in a safe, guided environment.",
    booking: "https://webook.com/en/events/navigation-land-jeddah-season-2025"
  },
  {
    id: 3,
    title: "Comedy Night Show – Comedy Pod",
    image: "Comedy_Pod.png",
    date: "Every Thursday & Friday",
    location: "Comedy Pod",
    description: "Enjoy hilarious stand-up comedy every Thursday and Friday with some of the region's best comedians.",
    booking: "https://webook.com/en/events/comedy-night-show-697812"
  },
  {
    id: 4,
    title: "Crustacean Restaurant – Jeddah",
    image: "Crustacean.png",
    date: "Available by Reservation",
    location: "Jeddah Yacht Club, Jeddah",
    description: "Dine in elegance at Crustacean Jeddah, serving Asian-European fusion dishes with a seaside view.",
    booking: "https://webook.com/en/restaurants/crustacean-res"
  },
  {
    id: 5,
    title: "Wadi Disah Adventure – Explore Stunning Desert Landscapes",
    image: "Wadi_Disah.png",
    date: "Available by Reservation",
    location: "Wadi Disah, Tabuk Region",
    description: "Experience the breathtaking beauty of Wadi Disah in Tabuk. Explore vast desert landscapes and enjoy adventure tours with expert guides.",
    booking: "https://webook.com/en/experiences/wadi-disah-adventure-explore-stunning-desert-landscapes-in-tabuk"
  },
  {
    id: 6,
    title: "Al-Awwal Park Stadium Tour – Riyadh",
    image: "AlAwwal_Park_Tours.png",
    date: "Available All Year",
    location: "Al-Awwal Park, Riyadh",
    description: "Discover exclusive access to player tunnels, locker rooms, and media zones at Al-Nassr FC's stadium.",
    booking: "https://webook.com/en/events/al-awwal-tour-stadium-tickets-843728"
  }
];

const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get("id"));
const event = events.find(e => e.id === eventId);

if (event) {
  document.getElementById("eventTitle").textContent = event.title;
  document.getElementById("eventImage").src = event.image;
  document.getElementById("eventImage").alt = event.title;
  document.getElementById("eventDate").textContent = event.date;
  document.getElementById("eventLocation").textContent = event.location;
  document.getElementById("eventDescription").textContent = event.description;

  if (event.booking) {
    const bookBtn = document.getElementById("bookingLink");
    bookBtn.href = event.booking;
    bookBtn.style.display = "inline-block";
  }
} else {
  document.querySelector(".container").innerHTML = "<h2>❌ Event not found</h2><a href='view_events.html' class='btn'>← Back</a>";
}

// Review Section Logic
const reviewForm = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");
const noReviewsMessage = document.getElementById("noReviewsMessage");

// Load reviews from local storage
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem(`reviews_${eventId}`)) || [];
  if (reviews.length === 0) {
    noReviewsMessage.style.display = "block";
  } else {
    noReviewsMessage.style.display = "none";
  }
  displayReviews(reviews);
}

// Display reviews in the page
function displayReviews(reviews) {
  reviewsContainer.innerHTML = "";
  reviews.forEach(r => {
    const div = document.createElement('div');
    div.classList.add('review-item');
    let starsHTML = '';
    for (let i = 0; i < r.rating; i++) {
      starsHTML += '★';
    }
    for (let i = r.rating; i < 5; i++) {
      starsHTML += '☆';
    }
    div.innerHTML = `
      <div class="review-stars">${starsHTML}</div>
      <div class="review-text">${r.comment}</div>
    `;
    reviewsContainer.appendChild(div);
  });
}

// Handle review form submission
reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const rating = parseInt(document.querySelector('input[name="rating"]:checked')?.value);
  const comment = document.getElementById("reviewText").value.trim();

  if (!rating) {
    alert("Please provide a rating.");
    return;
  }

  const newReview = { rating, comment };
  const existingReviews = JSON.parse(localStorage.getItem(`reviews_${eventId}`)) || [];
  existingReviews.push(newReview);
  localStorage.setItem(`reviews_${eventId}`, JSON.stringify(existingReviews));

  reviewForm.reset();
  loadReviews();
});

loadReviews();
