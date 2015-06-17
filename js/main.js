modal = {
    target: "",
    modalBtn: document.querySelectorAll('.modal-trigger'),
    closeBtn: document.querySelectorAll('.close-trigger'),
    modalTrigger: function() {
        modalBtn = modal.modalBtn;
        closeBtn = modal.closeBtn;

        for (var i = 0; i < modalBtn.length; i++) {
            modalBtn[i].addEventListener("click", function(e) {
                modal.modalOpen(this);
            }, false);
        }


        for (var i = 0; i < closeBtn.length; i++) {
            closeBtn[i].addEventListener("click", function(e) {
            	modal.modalClose(modal.target);
            }, false);
        }
    },
    modalOpen: function(target) {
    	console.log(target);
        href = target.getAttribute("href");
        href = href.replace('#', '');
        targetID = document.getElementById(href);
        targetID.classList.toggle('active');
        modal.target = targetID;

    },
    modalClose: function(targetID) {
        targetID.classList.toggle('active');
    }
}


slider = {
    current: 0,
    sliderWidth: 0,
    sliderPosts: document.getElementsByClassName("slide-post"),
    sliderContainer: document.getElementById("main-slider"),
    sliderWrapper: document.getElementById("slide"),
    sliderMove: function(direction) {
        if (direction == "prev" && slider.current > 0) {
            slider.current--;
        } else if (direction == "next" && slider.current < slider.sliderPosts.length - 1) {
            slider.current++;
        }
        for (var i = 0; i < slider.sliderPosts.length; i++) {
            var widthVal;
            if (i == slider.current) {
                widthVal = slider.sliderWidth * i;
            }
            slider.sliderContainer.style.left = -(widthVal) + "px";
            slider.sliderContainer.widthVal = widthVal;
        }
    },
    init: function(sliderWidth) {
        slider.sliderWidth = sliderWidth;
        slider.sliderPosts[0].style.left = "0";
        slider.sliderPosts[0].widthVal = 0;
        slider.sliderContainer.style.width = (sliderWidth * slider.sliderPosts.length) + "px";
        for (var i = 0; i < slider.sliderPosts.length; i++) {
            var widthVal;
            if (i == slider.current) {
                widthVal = slider.sliderWidth * i;
            }
            slider.sliderContainer.style.left = -(widthVal) + "px";
        }
    },
    trigger: function() {
        var sliderPrev = document.getElementById("control-prev");
        var sliderNext = document.getElementById("control-next");

        sliderPrev.addEventListener("click", function(e) {
            slider.sliderMove("prev");
        }, false);

        sliderNext.addEventListener("click", function(e) {
            slider.sliderMove("next");
        }, false);
    }
}


document.addEventListener("DOMContentLoaded", function(event) {

    slider.init(slider.sliderWrapper.offsetWidth);
    slider.trigger();
    modal.modalTrigger();

    var timeOut = null;

    window.onresize = function() {
        if (timeOut != null)
            clearTimeout(timeOut);

        timeOut = setTimeout(function() {
            slider.init(slider.sliderWrapper.offsetWidth);
        }, 500);
    };
});