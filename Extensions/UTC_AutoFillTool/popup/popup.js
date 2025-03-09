// Initialize button with user's preferred color
let autoCheckedbtn = document.getElementById("autoCheckedbtn");

// When the button is clicked, inject setPageBackgroundColor into current page
autoCheckedbtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: autoChecked,
    });
});

function autoChecked() {
    let radioBtns = document.querySelectorAll(".radio-item input");

    for (let test = 0; test < radioBtns.length; test++) {
        if (radioBtns[test].value == 5) {
            radioBtns[test].checked = true;
        }
    }
    radioBtns[23].checked = true;

    document.querySelector(".btn-google").click();
}

// ======== App UI ========
document.getElementById("header-close").addEventListener("click", () => {
    let popupViews = chrome.extension.getViews({ type: "popup" });

    // Kiểm tra và đóng tất cả các popup
    popupViews.forEach((element) => {
        element.close();
    });
});

// Chạy mỗi khi popup extension được mở lên
document.addEventListener("DOMContentLoaded", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url.includes("utc.edu.vn")) {
        console.log("đây là trang UTC", tab);
    } else {
        console.log("đây không phải trang UTC", tab);
    }

    const abc = await chrome.storage.sync.get("abc");
});

const navigationItems = Array.from(document.querySelectorAll(".navigation-item"));
const contentTabs = Array.from(document.querySelectorAll(".tab-content"));

navigationItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        console.log("hello hello", e);
        setTabActiveTab(e.target.dataset?.tab);
    });
});

function setTabActiveTab(tabName) {
    contentTabs.forEach((tab) => {
        if (tab.dataset.tab == tabName) {
            // Bỏ active các tab khác
            contentTabs.forEach((item) => item.classList.remove("active"));

            // Active tab hiện tại
            tab.classList.add("active");
        }
    });

    navigationItems.forEach((tab) => {
        if (tab.dataset.tab == tabName) {
            // Bỏ active các tab khác
            navigationItems.forEach((item) => item.classList.remove("active"));

            // Active tab hiện tại
            tab.classList.add("active");
        }
    });
}

// Đặt tab mặc định
setTabActiveTab("home");
