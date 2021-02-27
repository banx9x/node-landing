(function () {
    const btn = document.querySelector(".navbar-toggler");
    let prev = (current = document.querySelector(".navbar .nav-link.active"));
    const menu = document.querySelector(".navbar-nav");
    const nav = document.getElementById("nav");

    btn.addEventListener("click", () => {
        nav.classList.toggle("show");
    });

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

    const homeNav = document.querySelector(".nav-link[href='/']");
    const trackNav = document.querySelector(".nav-link[href='#track']");
    const teacherNav = document.querySelector(".nav-link[href='#teacher']");
    const productNav = document.querySelector(".nav-link[href='#product']");
    const registerNav = document.querySelector(
        ".navbar-nav a[href='#register']"
    );

    function setActiveLink(link) {
        prev.classList.remove("active");
        link.classList.add("active");
        prev = link;
    }

    const track = document.getElementById("track").offsetTop;
    const teacher = document.getElementById("teacher").offsetTop;
    const product = document.getElementById("product").offsetTop;
    const register = document.getElementById("register").offsetTop;

    let pos = "home";

    window.addEventListener("scroll", function () {
        let offset = window.pageYOffset;
        if (offset > register) {
            pos != "register" &&
                (pos = "register") &&
                setActiveLink(registerNav);
        } else if (offset > product && offset <= register) {
            pos != "product" && (pos = "product") && setActiveLink(productNav);
        } else if (offset > teacher && offset <= product) {
            pos != "teacher" && (pos = "teacher") && setActiveLink(teacherNav);
        } else if (offset > track && offset <= teacher) {
            pos != "track" && (pos = "track") && setActiveLink(trackNav);
        } else {
            pos != "home" && (pos = "home") && setActiveLink(homeNav);
        }
    });
})();
