const listings = [
  {
    title: "2019 Honda Civic Sport",
    price: "$18,900",
    category: "Vehicles",
    location: "Toronto",
    time: "12 min ago",
    image: "https://images.unsplash.com/photo-1550355191-aa8a80b41353?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Modern 2-bedroom apartment",
    price: "$2,450 /mo",
    category: "Real Estate",
    location: "Etobicoke",
    time: "26 min ago",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Apple MacBook Air M2",
    price: "$850",
    category: "Electronics",
    location: "North York",
    time: "34 min ago",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Solid oak dining table",
    price: "$420",
    category: "Furniture",
    location: "Scarborough",
    time: "1 hr ago",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Scandinavian lounge chair",
    price: "$275",
    category: "Furniture",
    location: "The Annex",
    time: "2 hrs ago",
    image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Mountain bike, 21 speed",
    price: "$310",
    category: "Vehicles",
    location: "Mississauga",
    time: "2 hrs ago",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Sony noise-cancelling headphones",
    price: "$180",
    category: "Electronics",
    location: "Downtown",
    time: "3 hrs ago",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Customer service representative",
    price: "$24 /hr",
    category: "Jobs",
    location: "Toronto",
    time: "3 hrs ago",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
  }
];

let activeListings = [...listings];

const listingGrid = document.getElementById("listingGrid");
const listingTitle = document.getElementById("listingTitle");
const postDialog = document.getElementById("postDialog");

function renderListings(items) {
  listingGrid.innerHTML = items.map((listing) => `
    <article class="listing-card">
      <img class="listing-image" src="${listing.image}" alt="${listing.title}">
      <button class="favorite" type="button" aria-label="Save ${listing.title}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>
      </button>
      <div class="listing-info">
        <p class="listing-price">${listing.price}</p>
        <h3 class="listing-title">${listing.title}</h3>
        <div class="listing-meta">
          <span>${listing.location}</span>
          <span>${listing.time}</span>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".favorite").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
    });
  });
}

function filterListings(category, query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  activeListings = listings.filter((listing) => {
    const matchesCategory = !category || listing.category === category;
    const searchable = `${listing.title} ${listing.category} ${listing.location}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
  });
  listingTitle.textContent = category
    ? `${category} listings`
    : query
      ? `Results for "${query}"`
      : "Featured listings";
  renderListings(activeListings);
}

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    filterListings(card.dataset.category);
    document.getElementById("listingTitle").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  filterListings("", document.getElementById("searchInput").value);
  document.getElementById("listingTitle").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("postButton").addEventListener("click", () => postDialog.showModal());
document.getElementById("closeDialog").addEventListener("click", () => postDialog.close());

document.getElementById("postForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const price = Number(formData.get("price"));
  listings.unshift({
    title: formData.get("title"),
    price: price ? `$${price.toLocaleString("en-CA")}` : "Free",
    category: formData.get("category"),
    location: formData.get("location"),
    time: "Just now",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=80"
  });
  event.currentTarget.reset();
  postDialog.close();
  filterListings("");
});

document.querySelector(".icon-button").addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("saved");
});

renderListings(activeListings);
