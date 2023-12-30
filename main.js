let type = "mp4"

const dialog = document.querySelector("dialog");

const closeButton = document.querySelector("dialog button");

closeButton.addEventListener("click", () => {
    dialog.close()
})

document.getElementById("download").addEventListener("click", async () => {


    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry

        console.log(tabs)

        let currentTab = tabs[0].url

        const userTab = document.getElementById("select").value

        console.log(userTab)

        if (userTab !== "") {
            currentTab = userTab
        }


    const apiResponse = await fetch("https://co.wuk.sh/api/json", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"             
        },
        body: JSON.stringify({
            url: currentTab,
            filenamePattern: "basic",
            isAudioOnly: (type === "mp3") ? true : false
        })
    })

    const apiResponsePart2 = await apiResponse.json()

    console.log(apiResponsePart2)

    if (apiResponsePart2.status === "stream") {
        const newApiRes = await (await fetch(`${apiResponsePart2.url}&p=1`)).json()

        if (newApiRes.status === "continue") {

            console.log(apiResponsePart2.url)

            
            window.location.assign(apiResponsePart2.url)
        }

    } else if (apiResponsePart2.status === "redirect") {
        console.log(apiResponsePart2.url)
        window.open(apiResponsePart2.url)
    } else {
        dialog.showModal()
            document.getElementById("result").innerHTML = apiResponsePart2.text
    }
    })
})

document.getElementById("mp3").addEventListener("click", () => {
     // Remove glow from all buttons
     var allButtons = document.getElementsByTagName("button");
     for (var i = 0; i < allButtons.length; i++) {
       allButtons[i].classList.remove("glow");
     }


     // Add glow to the selected button
     document.getElementById("mp3").classList.add("glow");

     type = "mp3"
})

document.getElementById("mp4").addEventListener("click", () => {
    // Remove glow from all buttons
    var allButtons = document.getElementsByTagName("button");
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].classList.remove("glow");
}



    // Add glow to the selected button
    document.getElementById("mp4").classList.add("glow");

    type = "mp4"  
})

document.getElementById("settings").addEventListener("click", () => {
    window.location = "settings.html"
})
