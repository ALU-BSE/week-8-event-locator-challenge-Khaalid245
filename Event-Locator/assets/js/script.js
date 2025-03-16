function loadEvents(category) {
    fetch("data/events.json")
        .then(response => response.json())
        .then(events => {
            const eventList = document.getElementById("event-list");
            eventList.innerHTML = "";

            const filteredEvents = events.filter(event => event.category === category);

            filteredEvents.forEach(event => {
                const eventCard = document.createElement("div");
                eventCard.classList.add("col-md-4");
                eventCard.innerHTML = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                            <p class="card-text"><strong>Location:</strong> ${event.location}</p>
                            <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                `;
                eventList.appendChild(eventCard);
            });
        });
}
