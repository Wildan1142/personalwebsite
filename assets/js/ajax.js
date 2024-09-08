function getTestimonialData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onerror = () => {
      reject("Network Error!");
    };

    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };

    xhr.send();
  });
}

async function getAllTestimonials() {
  const testimonials = await getTestimonialData(
    "https://api.npoint.io/6f3c12df353e3150bb6a"
  );

  const testimonialHTML = testimonials.map((testimonial) => {
    return `<div class="ms-3 my-3">
      <div class="card border-3" style="width: 350px; height: 350px; max-width: 350px; max-height: 350px">
        <img src="${testimonial.image}" class="card-img-top" style="width: 100%; height: 200px; object-fit: cover" alt="Project Image" />
        <div class="card-body">
          <h5 class="card-title text-center">${testimonial.author}</h5>
          <p class="card-text">${testimonial.content}</p>
          <p class="card-text">${testimonial.rating}<i class="fa-solid fa-star"></i></p>
        </div>
      </div>
    </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join("");
}

async function getTestimonialsByRating(rating) {
  const testimonials = await getTestimonialData(
    "https://api.npoint.io/6f3c12df353e3150bb6a"
  );

  const filteredTestimonials = testimonials.filter((testimonial) => {
    return testimonial.rating.toString() === rating;
  });

  const testimonialHTML = filteredTestimonials.map((testimonial) => {
    return `<div class="ms-3 mt-3">
      <div class="card border-3" style="width: 350px; height: 350px; max-width: 350px; max-height: 350px">
        <img src="${testimonial.image}" class="card-img-top" style="width: 100%; height: 200px; object-fit: cover" alt="Project Image" />
        <div class="card-body">
          <h5 class="card-title text-center">${testimonial.author}</h5>
          <p class="card-text">${testimonial.content}</p>
          <p class="card-text">${testimonial.rating}<i class="fa-solid fa-star"></i></p>
        </div>
      </div>
    </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join("");
}

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
