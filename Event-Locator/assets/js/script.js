const events = [
    {
        id: 1,
        name: "Summer Music Festival",
        category: "music",
        date: "2024-07-15",
        time: "18:00",
        location: "Central Park",
        city: "New York",
        description: "A fantastic outdoor music festival featuring top artists and local bands.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        price: "$50",
        organizer: "NYC Events"
    },
    {
        id: 2,
        name: "Tech Conference 2024",
        category: "technology",
        date: "2024-08-20",
        time: "09:00",
        location: "Convention Center",
        city: "San Francisco",
        description: "Annual technology conference showcasing the latest innovations and trends.",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
        price: "$200",
        organizer: "TechEvents Co"
    },
    {
        id: 3,
        name: "Food & Wine Festival",
        category: "food",
        date: "2024-09-10",
        time: "12:00",
        location: "Downtown Plaza",
        city: "Los Angeles",
        description: "Taste the best gourmet food and wine from top chefs and wineries.",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
        price: "$30",
        organizer: "LA Foodies"
    },
    {
        id: 4,
        name: "Marathon 2024",
        category: "sports",
        date: "2024-10-05",
        time: "06:00",
        location: "City Stadium",
        city: "Chicago",
        description: "Join the biggest marathon event in the city and challenge yourself.",
        image: "https://runnerstribe.com/wp-content/uploads/2023/04/London-Marathon-scaled-1.jpg",
        price: "Free",
        organizer: "Chicago Sports Club"
    },
    {
        id: 5,
        name: "Art Exhibition - Modern Visions",
        category: "art",
        date: "2024-11-15",
        time: "14:00",
        location: "National Art Gallery",
        city: "Miami",
        description: "Explore stunning modern art pieces from renowned and emerging artists.",
        image: "https://www.kichakatours.com/wp-content/uploads/2020/07/Nairobi-National-Museum-2-1140x530.jpg",
        price: "$15",
        organizer: "Miami Arts Association"
    }
];


// Handle search form submission
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const city = document.getElementById('searchCity').value;
            const date = document.getElementById('searchDate').value;
            const category = document.getElementById('searchCategory').value;
            
            // Store search parameters in localStorage
            localStorage.setItem('searchCity', city);
            localStorage.setItem('searchDate', date);
            localStorage.setItem('searchCategory', category);
            
            // Redirect to events page
            window.location.href = 'events.html';
        });
    }

    // Handle events list page
    const eventsList = document.getElementById('eventsList');
    if (eventsList) {
        const city = localStorage.getItem('searchCity');
        const date = localStorage.getItem('searchDate');
        const category = localStorage.getItem('searchCategory');

        // Update city name in header
        const cityNameElement = document.getElementById('cityName');
        if (cityNameElement) {
            cityNameElement.textContent = city || 'All Cities';
        }

        // Filter and display events
        displayEvents(filterEvents(city, date, category));

        // Add filter event listeners
        const filterCategory = document.getElementById('filterCategory');
        const filterDate = document.getElementById('filterDate');

        if (filterCategory) {
            filterCategory.value = category || '';
            filterCategory.addEventListener('change', updateFilters);
        }

        if (filterDate) {
            filterDate.value = date || '';
            filterDate.addEventListener('change', updateFilters);
        }
    }

    // Handle event details page
    const eventDetails = document.getElementById('eventDetails');
    if (eventDetails && window.location.pathname.includes('event-details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = parseInt(urlParams.get('id'));
        displayEventDetails(eventId);
    }
});

function filterEvents(city, date, category) {
    return events.filter(event => {
        const cityMatch = !city || event.city.toLowerCase().includes(city.toLowerCase());
        const dateMatch = !date || event.date === date;
        const categoryMatch = !category || event.category === category;
        return cityMatch && dateMatch && categoryMatch;
    });
}

function displayEvents(filteredEvents) {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    if (filteredEvents.length === 0) {
        eventsList.innerHTML = '<div class="col"><p class="text-center">No events found.</p></div>';
        return;
    }

    filteredEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'col-md-4 mb-4';
        eventCard.innerHTML = `
            <div class="card event-card" onclick="window.location.href='event-details.html?id=${event.id}'">
                <img src="${event.image}" class="card-img-top" alt="${event.name}">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.date} | ${event.location}</p>
                    <span class="badge bg-primary">${event.category}</span>
                </div>
            </div>
        `;
        eventsList.appendChild(eventCard);
    });
}

function updateFilters() {
    const city = localStorage.getItem('searchCity');
    const date = document.getElementById('filterDate').value;
    const category = document.getElementById('filterCategory').value;

    localStorage.setItem('searchDate', date);
    localStorage.setItem('searchCategory', category);

    displayEvents(filterEvents(city, date, category));
}

function displayEventDetails(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${event.name} - Event Locator`;

    const eventDetails = document.getElementById('eventDetails');
    eventDetails.innerHTML = `
        <img src="${event.image}" alt="${event.name}" class="img-fluid">
        <h1>${event.name}</h1>
        <p class="lead">${event.description}</p>
    `;

    const eventInfo = document.getElementById('eventInfo');
    eventInfo.innerHTML = `
        <li class="event-info-item">
            <strong>Date:</strong> ${event.date}
        </li>
        <li class="event-info-item">
            <strong>Time:</strong> ${event.time}
        </li>
        <li class="event-info-item">
            <strong>Location:</strong> ${event.location}, ${event.city}
        </li>
        <li class="event-info-item">
            <strong>Category:</strong> ${event.category}
        </li>
        <li class="event-info-item">
            <strong>Price:</strong> ${event.price}
        </li>
        <li class="event-info-item">
            <strong>Organizer:</strong> ${event.organizer}
        </li>
    `;
}