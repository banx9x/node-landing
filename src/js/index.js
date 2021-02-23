import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "particles.js";
particlesJS.load(
    "page-header",
    "./resources/assets/particlesjs-config.json",
    () => {
        const particles = document.querySelector(".particles-js-canvas-el");
        particles.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        `;
    }
);

import "./active-menu.js";
import flyText from "./intro-text.js";
flyText(".intro-content .wrapper");

import "../css/index.css";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
// Review
$(document).ready(function () {
    const owl = $(".review-slider");

    owl.owlCarousel({
        nav: false,
        dots: false,
        items: 1,
        center: true,
        stagePadding: 30,
        responsive: {
            0: {
                stagePadding: 30,
            },
            768: {
                stagePadding: 90,
            },
            1200: {
                stagePadding: 180,
            },
        },
    });

    owl.trigger("next.owl.carousel");
});

// Register
document.getElementById("btn-register").addEventListener(
    "click",
    (function (e) {
        const name = document.getElementById("name");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const note = document.getElementById("note");
        const success = document.getElementById("success");
        const error = document.getElementById("error");
        const msg = document.getElementById("message");

        function checkValid() {
            let valid = true;
            if (name.value.trim() == "") {
                name.classList.remove("is-valid");
                name.classList.add("is-invalid");

                valid = false;
            } else {
                name.classList.remove("is-invalid");
                name.classList.add("is-valid");
            }

            if (phone.value.trim() == "") {
                phone.classList.remove("is-valid");
                phone.classList.add("is-invalid");

                valid = false;
            } else {
                phone.classList.remove("is-invalid");
                phone.classList.add("is-valid");
            }

            if (email.value.trim() == "") {
                email.classList.remove("is-valid");
                email.classList.add("is-invalid");

                valid = false;
            } else {
                email.classList.remove("is-invalid");
                email.classList.add("is-valid");
            }

            return valid;
        }

        return function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (checkValid()) {
                const btn = $(this);

                let nameVal = name.value;
                let phoneVal = phone.value;
                let emailVal = email.value;
                let noteVal = note.value;

                let req = {
                    FullName: nameVal,
                    Email: emailVal,
                    Phone: phoneVal,
                    Info: noteVal,
                    Link: window.location.href,
                    ItemId: "g3t",
                    Type: 3,
                };

                let myJSON = JSON.stringify(req);

                $.ajax({
                    url: "/submit-advisory",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: myJSON,
                    dataType: "json",
                    success: function (data) {
                        name.value = phone.value = email.value = note.value =
                            "";
                        name.classList.remove("is-valid");
                        phone.classList.remove("is-valid");
                        email.classList.remove("is-valid");
                        success.style.display = "inline-block";
                        error.style.display = "none";
                    },
                    error: function (result) {
                        success.style.display = "none";
                        error.style.display = "inline-block";
                        msg.innerText = result.responseJSON.message;
                    },
                });

                btn.attr("disabled", false);
            }
        };
    })()
);

import "lazysizes";
import "@fancyapps/fancybox";
import "@fancyapps/fancybox/dist/jquery.fancybox.min.css";

$(document).ready(function () {
    let images = [
        {
            link: "resources/images/hd-13.webp",
            size: "col-lg-3",
        },
        {
            link: "resources/images/hd-10.webp",
            size: "col-lg-3",
        },
        {
            link: "resources/images/hd-11.webp",
            size: "col-lg-3",
        },
        {
            link: "resources/images/hd-12.webp",
            size: "col-lg-3",
        },
        {
            link: "resources/images/hd-13.webp",
            size: "col-lg-3",
        },
    ];
    const NUM_INC = 4;
    const NUM_IMAGE_WEB = 8;
    const TOTAL_IMAGE = NUM_IMAGE_WEB + images.length;
    let countNum = 0;

    function getImage() {
        let totalImageInWeb = $(".photo-item").length;
        return TOTAL_IMAGE - totalImageInWeb;
    }

    let totalImageLoadMore = getImage();
    $(".total__image").text(`(${totalImageLoadMore})`);

    $("#btn-load-image").click(function (e) {
        e.preventDefault();

        let content = "";
        let imageLoad = images.slice(
            countNum * NUM_INC,
            (countNum + 1) * NUM_INC
        );
        countNum += 1;

        for (let i = 0; i < imageLoad.length; i++) {
            let img = imageLoad[i];
            content += `
                            <div class="col-sm-12 col-md-6 ${img.size}" data-aos="fade-up" data-aos-delay="100">
                                <a href="${img.link}" class="d-block photo-item"
                                    data-fancybox="gallery">
                                    <img src="${img.link}" alt="Image"
                                        class="img-fluid">
                                    <div class="photo-text-more">
                                        <span class="icon icon-search"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                    </div>
                                </a>
                            </div>
                        `;
        }
        $(".image--container").append(content);

        let imageEnable = getImage();
        $(".total__image").text(`(${imageEnable})`);

        if (imageEnable <= 0) {
            $("#btn-load-image").remove();
        }
    });
});
