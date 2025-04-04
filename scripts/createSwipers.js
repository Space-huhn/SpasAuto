const swiper = new Swiper(".ads-line", {
    loop: true, // Infinite loop
    autoplay: {
        delay: 1, // 3 seconds per slide
        disableOnInteraction: false, // Keeps autoplay after interaction
    },
    speed: 6000,
    slidesPerView: "auto", // Number of visible slides
    spaceBetween: 1, // Space between slides
    freeMode: true, // Allows continuous movement
    freeModeMomentum: false,
});

// const swiperPartners = new Swiper(".footer-partners-list", {
//     loop: true, // Infinite loop
//     autoplay: {
//         delay: 1, // 3 seconds per slide
//         disableOnInteraction: false, // Keeps autoplay after interaction
//     },
//     speed: 300,
//     slidesPerView: 3, // Number of visible slides
//     spaceBetween: 1, // Space between slides
//     freeMode: true, // Allows continuous movement
//     freeModeMomentum: false,
// });

const chooseUsSwiper = new Swiper(".choose-us", {
    autoplay: {
        delay: 2000, // Auto-slide every 3 seconds
        disableOnInteraction: false,
    },
    slidesPerView: 4, // Show 1 slide at a time
    spaceBetween: 70, // Space between slides
    // autoHeight: true,
    // navigation: {
    //     nextEl: null,
    //     prevEl: null,
    // },
    breakpoints: {
        992: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 3,
        },
        576: {
            slidesPerView: 2,
        },
        320: {
            slidesPerView: 1,
        },
    },
});