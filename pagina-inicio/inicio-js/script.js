document.addEventListener("DOMContentLoaded", function() {
    const communityItems = document.querySelectorAll(".community-item");
    const heading = document.querySelector(".community-heading h2");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.5 });
  
    observer.observe(heading);
    communityItems.forEach(item => observer.observe(item));
  });

  