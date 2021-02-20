(function () {
    const btn = document.querySelector(".navbar-toggler");
    let prev = (current = document.querySelector(".navbar .nav-link.active"));
    const menu = document.querySelector(".navbar-nav");

    menu.addEventListener("click", (e) => {
        const menuItem = e.target.closest(".nav-item");
        if (menuItem) {
            const menuLink = menuItem.firstElementChild;
            prev.classList.remove("active");
            menuLink.classList.add("active");
            prev = menuLink;

            menu.closest("div").classList.contains("show") && btn.click();
        }
    });
})();
