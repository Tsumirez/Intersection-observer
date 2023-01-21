const cards = document.querySelectorAll(".card");
const cardContainer = document.getElementsByClassName("card-container")[0];

//pop in/out animation for all cards
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting)
            // prevention of animation once a card already popped on page
            // if(entry.isIntersecting) observer.unobserve(entry.target);
        })
    },
    {
        root: cardContainer,
        threshold: 1,
        rootMargin: "-0px"
    }
)
//assigning cards to the observer
cards.forEach(card => {
    observer.observe(card);
})

// lazy loading for last card
const lastCardObserver = new IntersectionObserver(
    entries => {
        const lastCard = entries[0];
        if (!lastCard.isIntersecting) return
        loadNewCards()
        lastCardObserver.unobserve(lastCard.target)
        lastCardObserver.observe(document.querySelector(".card:last-child"));
    }, {
        rootMargin: "100px"
    }
)

lastCardObserver.observe(document.querySelector(".card:last-child"));

function loadNewCards() {
    for (let i = 0; i < 10; i++) {
        const card = document.createElement("div")
        card.textContent = "Lazy loaded Card"
        card.classList.add("card");
        observer.observe(card)
        cardContainer.append(card)
    }
}