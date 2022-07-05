const log = function() {
    console.log.apply(console, arguments)
}

const e = function(selector) {
    return document.querySelector(selector)
}

const bindEvent = function (element, event, callback) {
    element.addEventListener(event, callback)
}

const clearactive = function () {
    /*
    移除 active class
    */
    let span = e('.active')
    span.classList.remove('active')
}
