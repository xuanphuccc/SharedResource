/**
 * Được gọi khi người dùng điều hướng một trang web bất kỳ
 * và sẽ được gọi trên mọi tab, mọi điều hướng
 */
chrome.tabs.onUpdated.addListener((tabId, status, tab) => {
    console.log("background: ", tab);
    chrome.tabs.sendMessage(tabId, {
        type: tabId,
        payload: tab,
        status,
    });
});

/**
 * Sử dụng webNavigation.onCompleted để thay thế với bộ lọc
 */
// const filter = {
//     url: [
//       {
//         urlMatches: 'https://www.google.com/',
//       },
//     ],
//   };

//   chrome.webNavigation.onCompleted.addListener(() => {
//     console.info("The user has loaded my favorite website!");
//   }, filter);
