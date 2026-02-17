function Slidezy(selector, options = {}) {
    this.container = document.querySelector(selector);

    if (!this.container) {
        console.error(`Slidezy: Container "${selector}" not found!`);
        return;
    }

    this.opt = Object.assign({}, options);
    this.slides = Array.from(this.container.children);
    this.currentIndex = 0;

    this._init();
}

Slidezy.prototype._init = function () {
    this.container.classList.add("slidezy-wrapper");

    this._createTrack();
    this._createNavigation();
};

Slidezy.prototype._createTrack = function () {
    this.track = document.createElement("div");
    this.track.className = "slidezy-track";

    this.slides.forEach((slide) => {
        slide.classList.add("slidezy-slide");
        this.track.appendChild(slide);
    });

    this.container.append(this.track);
};

Slidezy.prototype._createNavigation = function () {
    this.btnPrev = document.createElement("button");
    this.btnNext = document.createElement("button");

    this.btnPrev.className = "slidezy-prev";
    this.btnNext.className = "slidezy-next";

    this.btnPrev.innerText = "<";
    this.btnNext.innerText = ">";

    this.container.append(this.btnPrev, this.btnNext);

    this.btnPrev.onclick = () => this.moveSlide(-1);
    this.btnNext.onclick = () => this.moveSlide(1);
};

Slidezy.prototype.moveSlide = function (step) {
    this.currentIndex = Math.min(
        Math.max(this.currentIndex + step, 0),
        this.slides.length - 3,
    );
    this.offset = -(this.currentIndex * (100 / 3));
    this.track.style.transform = `translateX(${this.offset}%)`;
};
