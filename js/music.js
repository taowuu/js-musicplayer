const playMusic = function () {
    clearactive()
    let pause = e('#id-button-pause')
    pause.classList.add('active')
    let a = e('#id-audio')
    a.play()
}

const pauseMusic = function () {
    clearactive()
    let play = e('#id-button-play')
    play.classList.add('active')
    let a = e('#id-audio')
    a.pause()
}

const changeVolumeColor = function (persent) {
    let style = e('#id-style-volume')
    log(style)
    style.remove()
    let t = `
        <style id="id-style-volume">
            #id-input-volume.gradient::-webkit-slider-runnable-track{
                background:linear-gradient(to right, #1ba1e2 0%, #1ba1e2 ${persent},#eee ${persent}, #eee);
            }
        </style>
    `
    let head = e('head')
    head.insertAdjacentHTML('beforeend', t)
}

const changeVolume = function () {
    let a = e('#id-audio')
    let v = e('#id-input-volume')
    a.volume = v.value / 100
    let percent = a.volume * 100 + '%'
    // log(percent)
    changeVolumeColor(percent)
}

const bindEventVolume = function () {
    let v = e('#id-input-volume')
    bindEvent(v, 'click', changeVolume)
    bindEvent(v, 'mousemove', changeVolume)
}

const changeProcessColor = function (persent) {
    let style = e('#id-style-process')
    style.remove()
    let t = `
        <style id="id-style-process">
            #id-input-process.gradient::-webkit-slider-runnable-track{
                background:linear-gradient(to right, #1ba1e2 0%, #1ba1e2 ${persent},#eee ${persent}, #eee);
            }
        </style>
    `
    let head = e('head')
    head.insertAdjacentHTML('beforeend', t)
}

const updateProcess = function () {
    let a = e('#id-audio')
    let p = e('#id-input-process')
    let value = a.currentTime / a.duration * 100
    if (!isNaN(value)) {
        p.value = value
        let percent = value + 1 + '%'
        changeProcessColor(percent)
    }
}

const updatePlayTime = function () {
    let a = e('#id-audio')
    let p = e('#id-input-process')
    let value = p.value / 100 * a.duration
    // 防止换歌时 value 为 NaN 导致进度条出错
    if (!isNaN(value)) {
        a.currentTime = value
        a.play()
    }
}

const bindEventProcess = function () {
    let p = e('#id-input-process')
    let a = e('#id-audio')
    bindEvent(p, 'click', updatePlayTime)
    bindEvent(a, 'timeupdate', updateProcess)
    // 以下两个操作用于防止进度条鬼畜
    bindEvent(p, 'mousedown', function () {
        a.removeEventListener('timeupdate', updateProcess)
    })
    bindEvent(p, 'mouseup', function () {
        a.addEventListener('timeupdate', updateProcess)
    })
}

const playList = function () {
    let pl = [
        {
            name: 'トリカゴ',
            author: 'XXme',
            id: 1,
            src: 'mp3/トリカゴ - XXme.mp3',
            img: 'img/トリカゴ - XXme.png',
        },
        {
            name: '光るなら',
            author: 'Goose house',
            id: 2,
            src: 'mp3/光るなら - Goose house.mp3',
            img: 'img/光るなら - Goose house.png',
        },
        {
            name: '前前前世',
            author: 'RADWIMPS',
            id: 3,
            src: 'mp3/前前前世 - RADWIMPS.mp3',
            img: 'img/前前前世 - RADWIMPS.png',
        }
    ]
    return pl
}

const changeInfo = function (song) {
    let n = e('#id-span-name')
    let author = e('#id-span-author')
    let a = e('#id-audio')
    n.innerHTML = song.name
    author.innerHTML = song.author
    a.dataset.id = song.id
    let img = e('#id-img')
    img.src = song.img
}

const preSong = function (id) {
    let pl = playList()
    let pre = (id - 1 + pl.length) % pl.length
    let preSong = pl[pre]
    return preSong
}

const pre = function() {
    let a = e('#id-audio')
    let id = a.dataset.id
    let ps = preSong(id)
    a.src = ps.src
    a.play()
    changeInfo(ps)
}

const nextSong = function (id) {
    let pl = playList()
    let next = (id + pl.length) % pl.length
    let nextSong = pl[next]
    return nextSong
}

const next = function() {
    let a = e('#id-audio')
    let id = a.dataset.id
    let ns = nextSong(id)
    log('ns', ns)
    a.src = ns.src
    a.play()
    changeInfo(ns)
}

const bindEvents = function() {
    let n = e('#id-button-next')
    bindEvent(n, 'click', next)
    let p = e('#id-button-pre')
    bindEvent(p, 'click', pre)
    bindEventProcess()
    bindEventVolume()
    let pause = e('#id-button-pause')
    bindEvent(pause, 'click', pauseMusic)
    let play = e('#id-button-play')
    bindEvent(play, 'click', playMusic)
}

const initPlayer = function () {
    let pl = playList()
    let a = e('#id-audio')
    a.src = pl[0].src
    a.volume = 0.1
    a.dataset.id = 1
    changeInfo(pl[0])
}

const __main = function () {
    bindEvents()
    initPlayer()
}

__main()
