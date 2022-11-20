function closePopup(){
    popup = document.getElementById("popupLibrary")
    popup.style.display = "none"
}

function saveSettings(event) {
    event.preventDefault()
    language = document.getElementById("language").value
    document.cookie = "language=" + language + "; path=/";
    port = document.getElementById("port").value
    document.cookie = "port=" + port + "; path=/";
    checkbox = document.getElementsByName("discordRPCCheckbox")[0]
    document.cookie = "discordRPCCheckbox=" + checkbox.value + "; path=/";

    form = document.getElementById("saveSettingsForm")
    form.action = "/saveSettings"
    form.submit()
}

function createAccount(event) {
    form = document.getElementById("createAccount")
    form.action = "/createAccount"
    form.submit()
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function addLibrary(){
    const popupLibrary = document.getElementById("popupLibrary")
    popupLibrary.style.display = "block"
}

window.onload = function() {
    languageCookie = getCookie("language")
    document.getElementById("language").value = languageCookie
    portCookie = getCookie("port")
    if (portCookie !== undefined) {
        document.getElementById("port").value = portCookie
    }
    discordCookie = getCookie("discordRPCCheckbox")
    if (discordCookie !== undefined) {
        document.getElementById("discordRPCCheckbox").value = discordCookie
}
    if (discordCookie == "on") {
        document.getElementsByClassName("slider")[0].click()
    }
    typeInputList = document.getElementById("type")
    typeInputList.addEventListener("change", function() {
        if (typeInputList.value == "Kid") {
            passwordAccountCreator = document.getElementsByClassName("passwordAccountCreator")[0]
            passwordAccountCreator.style.display = "none"
        } else {
            passwordAccountCreator = document.getElementsByClassName("passwordAccountCreator")[0]
            passwordAccountCreator.style.display = "block"
        }
    })
    checkbox = document.getElementsByName("discordRPCCheckbox")[0].value = 'off'

    slider = document.getElementsByClassName("slider")[0]
    slider.addEventListener("click", function() {
        checkbox = document.getElementsByName("discordRPCCheckbox")[0]
        if (checkbox.value == "on") {
            checkbox.value = "off"
        } else {
            checkbox.value = "on"
        }
    })
    setLibraryMenu()
}

var crossPopup = document.getElementById("crossPopup")
crossPopup.addEventListener("click", function() {
    closePopup()
})

var allRadios = document.getElementsByName('libType');
for (var i = 0; i < allRadios.length; i++) {
    allRadios[i].addEventListener('change', function() {
        var id = this.id;
        var theLabel = document.querySelector('label[for="' + id + '"]');
        var theIonIcon = theLabel.querySelector('ion-icon');
            theIonIcon.classList.add('selected');
            otherRadios = document.getElementsByName('libType');
            for (var j = 0; j < otherRadios.length; j++) {
                var otherId = otherRadios[j].id;
                if (otherId !== id) {
                    var otherLabel = document.querySelector('label[for="' + otherId + '"]');
                    var otherIonIcon = otherLabel.querySelector('ion-icon');
                    otherIonIcon.classList.remove('selected');
            }}
    });
}


function setLibraryMenu() {
    const libraryName = document.getElementById("libraryName")
    libraryName.addEventListener("change", function() {
        if (libraryName.value === "") {
            const errorMessagesText = document.createElement("p")
            errorMessagesText.classList.add("errorMessagesText")
            errorMessagesText.innerHTML = "Please enter a library name !"
            libraryNameDiv = document.getElementsByClassName("libraryName")[0]
            libraryNameDiv.appendChild(errorMessagesText)
        } else {
            const errorMessages = document.getElementsByClassName("errorMessages")[0]
            errorMessages.remove()
        }
    })
}

function newLib(){
    let libType
    var allRadios = document.getElementsByName('libType');
    for (var i = 0; i < allRadios.length; i++) {
        if (allRadios[i].checked) {
            libType = allRadios[i].getAttribute("libType")
        }
    }
    const libName = document.getElementById("libraryName").value
    const libPath = document.getElementById("libraryPath").value
    const libUsers = document.getElementsByClassName("settingsCheckbox")
    console.log(libUsers)
    let defaultUsers = ""
    for (let i = 0; i < libUsers.length; i++) {
        if (libUsers[i].checked) {
            console.log(libUsers[i].getAttribute("username"))
            defaultUsers += ","+libUsers[i].getAttribute("username")
        }
    }

    if (defaultUsers.startsWith(",")) {
        defaultUsers = defaultUsers.substring(1)
    }

    if (libName === "") {
        alert("Please enter a library name !")
    }
    if (libPath === "") {
        alert("Please enter a library path !")
    }


    if (libName !== "" && libPath !== "") {
        fetch("/createLib", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                libName: libName,
                libPath: libPath,
                libType: libType,
                libUsers: defaultUsers
            })
          }).then(res => {
            return res.json()
          }).then(data => {
            error = data.error
            if (error === "worked") {
                location.reload()
            } else {
                alert("The library already exists !\nPlease choose another name.")
            }
          })
    }
}