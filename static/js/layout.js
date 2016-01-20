$(document).ready(function() {

    // Global var for first page load
    var aptNum = 1;
    var imageList = [];
    var currentImage = null;
    var animationInProgress = false;

    // Get first image urls from DB
    // getImages();
    getImages2();

    function getImages2() {
        // If startIndex specified add as parameter in url
        var url = '/images/';
        if (typeof startIndex !== 'undefined') {
            url += startIndex;
        } else {
            url += 0;
        }
        $.ajax({
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            url: url,
            success: getImageSuccessCallback2,
            //dataType: 'json'
        });
    }

    function getImageSuccessCallback2(data) {
        // data.data list of image urls
        imageList = data.data;
        // console.log(images);

        // Add divs with images
        var imageDiv = '';
        // console.log(imageList[0]);
        
        imageDiv = '<div class="image"><img src="' + imageList[0] + '"></div>';
        $(".top-pic").append(imageDiv);
        currentImage = 0;

        // Populate filmstrip
        for (var i=0; i < imageList.length; i++) {
            var borderStr = '';
            if (i === 0) {
                borderStr = " border";
            }
            imageDiv = '<div id=index-' + i + ' class="thumb' + borderStr + '"><img src="' + imageList[i] + '"></div>';
            $("#filmstrip").append(imageDiv);
        }

        // Thumb click
        $('.thumb').click(function() {
            if (animationInProgress) {
                return false;
            }
            // Get index of image clicked
            $(".thumb").removeClass("border");
            $(this).addClass("border");
            var thumbID = this.getAttribute("id");
            thumbID = thumbID.replace('index-', '');
            thumbID = parseInt(thumbID, 10);
            if (thumbID === currentImage) {
                return false;
            }
            currentImage = thumbID;
            replaceTopImage(thumbID);
        });

    }

    // Left arrow click
    $('.fa-arrow-circle-left').click(function() {
        if (animationInProgress) {
            return false;
        }
        if (currentImage === 0) {
            currentImage = imageList.length - 1;
        } else {
            currentImage -= 1;
        }
        replaceTopImage(currentImage, false);
    });

    // Right arrow click
    $('.fa-arrow-circle-right').click(function() {
        if (animationInProgress) {
            return false;
        }
        if (currentImage === (imageList.length - 1)) {
            currentImage = 0;
        } else {
            currentImage += 1;
        }
        replaceTopImage(currentImage, true);
    });

    function replaceTopImage(imageIndex, slideDir) {
        // slideDir boolean false left, true right
        animationInProgress = true;
        if (slideDir === true) {
            var slideLeftStr = "-480px";
            //var slideRightStr = null;
            var offscreenClass = "right";
        } else {
            var slideLeftStr = "480px";
            //var slideRightStr = "480px";
            var offscreenClass = "left";
        }

        imageDiv = '<div class="image ' + offscreenClass + ' "><img src="' + imageList[imageIndex] + '"></div>'; 
        $(".top-pic").append(imageDiv);

        var firstImgDiv = $(".image").first();
        firstImgDiv.animate({
            // opacity: 0.25,
            left: slideLeftStr
        }, 500, function() {
            firstImgDiv.remove();
            animationInProgress = false;
        });

        var lastImgDiv = $(".image").last();
        lastImgDiv.animate({
            // opacity: 0.25,
            left: "0px"
            //right: slideRightStr
        }, 500, function() {
            lastImgDiv.removeClass("left");
            lastImgDiv.removeClass("right");
            $(".thumb").removeClass("border");
            // Add border to selected thumb
            var thumbID = "#index-" + currentImage;
            $(thumbID).addClass("border");
        });
    }

    function getImages(startIndex) {
        // If startIndex specified add as parameter in url
        var url = '/images/';
        if (typeof startIndex !== 'undefined') {
            url += startIndex;
        } else {
            url += 0;
        }
        $.ajax({
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            url: url,
            success: getImageSuccessCallback,
            //dataType: 'json'
        });
    }

    function getImageSuccessCallback(data) {
        // data.data list of image urls
        var images = data.data;
        // console.log(images);

        // Add divs with images
        var imageDiv = '';
        for (var i=0; i < images.length; i++) {
            imageDiv = '<div class="image"><img src="' + images[i] + '"></div>';
            $(".image-carousel").append(imageDiv);
        }
        // Initialize carousl
        $('.image-carousel').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            //centerMode: true,
            //centerPadding: '60px',
        });

        $(".apt-carousel-text").removeClass("hide");
        $("#apt-num").html(aptNum);
    }

    // Get picture for another apartment
    $('#retrieve-pics').click(function() {
        // Make sure we have a valid value
        aptNum = $("input[name=apt-num]").val();
        // TODO add validation to not accept decimals
        if ($.isNumeric(aptNum) && aptNum > 0 && aptNum <= 1000) {
            $(".apt-carousel-text").addClass("hide");
            $(".image-carousel").slick('unslick');
            $("#image-carousel").empty();
            var startIndex = (aptNum - 1) * 10;
            getImages(startIndex);
        } else {
            console.log("Enter a number between 1 and 1000.");
        }
    });

});
