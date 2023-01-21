const cards = document.querySelectorAll(".card");
const cardContainer = document.getElementsByClassName("card-container")[0];


const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting)
            // if(entry.isIntersecting) observer.unobserve(entry.target);
        })
    }, 
    {
        root: cardContainer,
        threshold: 1,
        rootMargin: "-0px"
    }
)

cards.forEach(card => {
    observer.observe(card);
})