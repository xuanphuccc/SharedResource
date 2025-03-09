(() => {
    //
    // chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
    //     console.log(obj);
    //     chrome.storage.sync.set({
    //         abc: "abc",
    //     });

    //     console.log(await chrome.storage.sync.get("abc"));
    // });

    

    // const styleElement = document.createElement("link");
    // styleElement.setAttribute("type", "text/css");
    // styleElement.setAttribute("href", "./scripts/custom-style.css");
    // styleElement.setAttribute("rel", "stylesheet");

    // document.head.appendChild(styleElement);

    // console.log(styleElement);

    window.onload = function() {
        document.title = "xp.space";
        document.onclick = function() {
            document.title = "xp.space";
        }

        // Xoá logo mặc định khi khởi động
        const startupLogo = document.getElementById("splash");
        startupLogo.style.display = "none";

        const logoContainerElm = document.createElement("div");
        logoContainerElm.classList.add("xp-logo-container");

        const logoEml = document.createElement("div");
        logoEml.classList.add("xp-logo");
        const logoUrl = chrome.runtime.getURL("images/logo.png");
        logoEml.style.background = `url('${logoUrl}')`;
        logoEml.style.backgroundSize = "contain";
        logoEml.style.backgroundPosition = "center";
        logoEml.style.backgroundRepeat = "no-repeat"

        const logoText = document.createElement("div");
        logoText.innerText = "xp.space"
        logoText.classList.add("xp-logo-text");

        
        logoContainerElm.appendChild(logoEml);
        logoContainerElm.appendChild(logoText);
        

        document.body.appendChild(logoContainerElm);
    }

    
})();
