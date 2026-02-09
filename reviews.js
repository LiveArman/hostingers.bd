$(document).ready(function () {
    $.getJSON("reviews.json", function (data) {
        let testimonialsHTML = "";
        let dotsHTML = "";
        data.forEach((testimonial, index) => {
            testimonialsHTML += `
                <div class="testimonial-card px-4">
                    <div class="bg-white rounded-lg shadow-lg p-6 text-center">
                        <i class="fas fa-quote-left text-2xl text-blue-500 mb-4"></i>
                        <p class="text-gray-600 mb-4">
                            "${testimonial.review}"
                        </p>
                        <div class="flex items-center justify-center">
                            <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                                ${testimonial.initials}
                            </div>
                            <div>
                                <p class="font-semibold">${testimonial.name}</p>
                                <p class="text-sm text-gray-500">${testimonial.position}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
            dotsHTML += `<span class="dot w-3 h-3 bg-gray-300 rounded-full cursor-pointer" data-index="${index}"></span>`;
        });

        $("#testimonial-container").html(testimonialsHTML);
        $("#dots-container").html(dotsHTML);

        // Carousel Logic
        let currentIndex = 0;
        const $slide = $(".carousel-slide");
        const $cards = $(".testimonial-card");
        const totalSlides = $cards.length;
        const cardsPerView = window.innerWidth >= 768 ? 3 : 1;

        function updateDots() {
            $(".dot").removeClass("bg-blue-500").addClass("bg-gray-300");
            $(".dot").eq(currentIndex).addClass("bg-blue-500").removeClass("bg-gray-300");
        }

        function moveSlide() {
            const cardWidth = $cards.outerWidth(true);
            $slide.css("transform", `translateX(-${currentIndex * cardWidth}px)`);
            updateDots();
        }

        $("#nextBtn").click(function () {
            if (currentIndex < totalSlides - cardsPerView) {
                currentIndex++;
                moveSlide();
            }
        });

        $("#prevBtn").click(function () {
            if (currentIndex > 0) {
                currentIndex--;
                moveSlide();
            }
        });

        $(".dot").click(function () {
            currentIndex = $(this).data("index");
            moveSlide();
        });

        updateDots();

        // Auto-play (optional)
        setInterval(function () {
            if (currentIndex < totalSlides - cardsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            moveSlide();
        }, 5000);
    });
});