const testimonials = [
  {
    image:
      "https://cdn.pixabay.com/photo/2023/07/27/13/52/ai-generated-8153440_1280.jpg",
    content: "Bekerja Keras",
    author: "Superman",
    rating: 5,
  },
  {
    image:
      "https://hardrockfm.com/wp-content/uploads/2022/03/Batman-DC-League-of-Super-Pets-Keanu-Reeves.webp",
    content: "Pintar",
    author: "Batman",
    rating: 4,
  },
  {
    image:
      "https://i.pinimg.com/736x/19/49/a8/1949a8246477898d20340d9c312ffc51.jpg",
    content: "Beban",
    author: "Deadpool",
    rating: 3,
  },
  {
    image:
      "https://w7.pngwing.com/pngs/639/514/png-transparent-iron-man-s-armor-drawing-chibi-cartoon-iron-man-thumbnail.png",
    content: "Tidak Tepat Waktu",
    author: "Ironman",
    rating: 2,
  },
];

// Function to display all testimonials
function getAllTestimonials() {
  const testimonialHTML = testimonials.map((testimonial) => {
    return `<div class="testimonial">
      <img src="${testimonial.image}" class="profile-testimonial" />
      <p class="quote">"${testimonial.content}"</p>
      <p class="author">- ${testimonial.author}</p>
      <p class="author">${testimonial.rating} <i class="fa-solid fa-star"></i></p>
    </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join("");
}

// Function to filter testimonials by rating
// Function to filter testimonials by rating
function getTestimonialsByRating(rating) {
  const filteredTestimonials = testimonials.filter((testimonial) => {
    return testimonial.rating.toString() === rating;
  });

  const testimonialHTML = filteredTestimonials.map((testimonial) => {
    return `<div class="testimonial">
      <img src="${testimonial.image}" class="profile-testimonial" />
      <p class="quote">"${testimonial.content}"</p>
      <p class="author">-${testimonial.author}</p>
      <p class="author">${testimonial.rating} <i class="fa-solid fa-star"></i></p>
    </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join("");
}

// Function to handle the filter change
function filterTestimonials() {
  const selectedRating = document.getElementById("filter").value;

  if (selectedRating === "all") {
    getAllTestimonials();
  } else {
    getTestimonialsByRating(selectedRating);
  }
}

// Display all testimonials on page load
getAllTestimonials();
