// when the page is loaded, get the movie duration from the cookie if it exists
window.onload = function() {
    var video = document.getElementById("movie_html5_api")
    video.addEventListener("timeupdate", function() {
        actualDuration = video.currentTime
        var path = window.location.pathname
        var cookie = `movieDuration=${actualDuration}; path=${path}`
        document.cookie = cookie

    })
    var path = window.location.pathname

    var allCookies = document.cookie
    var cookies = allCookies.split(";")
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i]
        var cookieName = cookie.split("=")[0]
        if (cookieName == "movieDuration") {
            theMovieCookie = cookie
            var theCookieDuration = theMovieCookie.split("=")[1]
            if (theCookieDuration != "0") {
                var popup = document.getElementById("popup")
                popup.style.display = "block"

                buttonYes = document.getElementById("buttonYes")
                buttonYes.addEventListener("click", function() {
                    popup.style.display = "none"
                    document.body.style.overflow = "auto"
                    video = document.getElementById("movie_html5_api")
                    video.play()
                    video.currentTime = theCookieDuration
                })

                buttonNo = document.getElementById("buttonNo")
                buttonNo.addEventListener("click", function() {
                    popup.style.display = "none"
                    document.body.style.overflow = "auto"
                    document.cookie = `movieDuration=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`
                })
            }
        }
    }

    var path = window.location.pathname
    var slug = path.split("/")
    slug = slug[2]

    fetch(`/generateAudio/${slug}`).catch(function(response) {
        return response.json()
    }).then(function(data) {
        listOfAudio = data
        console.log(listOfAudio)
        for (var i = 0; i < listOfAudio.length; i++) {
            listOfAudio
            kind = "audio"
            srclang = listOfAudio[i].languageCode
            label = listOfAudio[i].language
            var track = {
                kind: kind,
                src: audio,
                srclang: srclang,
                label: label
            }
            video.audioTracks().addTrack(track);

            console.log(`I added ${track} to the audio tracks`)


        }
    })
}