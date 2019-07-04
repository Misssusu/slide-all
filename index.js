let $btnWrapper = $('.btns');
let $btns = $('.btns > div')
let $window = $('.window');
let $imagesBox = $('.images');
let current = 0;
let $images = $imagesBox.children('img')
makeFakeSlides()
//自动播放
let timer = setInterval(() => {
    goToSlide(current+1)
},2000)
$window.on('mouseenter',function() {
    window.clearInterval(timer)
})
.on('mouseleave',function() {
    timer = setInterval(() => {
        goToSlide(current+1)
    },2000)
})
$btnWrapper.on('click', 'div', function(e) {
    //current是当前的元素下标
    //index是将要去的元素的下标
    let $btn = $(e.currentTarget);
    let index = $btn.index();
    goToSlide(index)
})
function goToSlide(index) {
    if(index > $btns.length-1) {
        index = 0;
    }
    $btns.eq(index).addClass('active')
    .siblings('.active')
    .removeClass('active')
    if(current === $btns.length-1 && index === 0) {
        console.log('从最后一张回到第一张')
        $imagesBox.css('transform', `translateX(${- ($btns.length+1) * 700}px)`)
             .one('transitionend', function () {
                 $imagesBox.hide()
                     .offset()
                 $imagesBox.css('transform', `translateX(${- (index+1) * 700}px)`)
                     .show()
             })
    }else if(current === 0 && index === $btns.length-1) {
        console.log('从第一张回到最后一张')
        $imagesBox.css('transform', 'translateX(0px)')
             .one('transitionend', function () {
                 $imagesBox.hide()
                     .offset()
                 $imagesBox.css('transform', `translateX(${- (index+1) * 700}px)`)
                     .show()
             })
    }else {
        $imagesBox.css('transform', `translateX(${- (index+1) * 700}px)`)
    }
    current = index;
}

function makeFakeSlides() {
    //复制第一张和最后一张
    let firstCopy = $images.eq(0).clone(true);
    let lastCopy = $images.eq($images.length - 1).clone(true);
    $imagesBox.append(firstCopy);
    $imagesBox.prepend(lastCopy);
}