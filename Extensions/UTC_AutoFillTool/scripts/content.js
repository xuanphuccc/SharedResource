(() => {
    //
    chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
        console.log(obj);
        chrome.storage.sync.set({
            abc: "abc",
        });

        console.log(await chrome.storage.sync.get("abc"));
    });

    console.log("hello world");
})();
