# Chrome Extension

https://github.com/raman-at-pieces/youtube-bookmarker-finished-code

1. File background.js

-   Mục đích: Xử lý các sự kiện với các tabs của trình duyệt
-   Tệp chạy riêng biệt với luồng hiện tại của trình duyệt
-   Không có quyền truy cập vào nội dung của trang web
-   Có thể giao tiếp với extension bằng hệ thống message system
-   Chạy lại mỗi khi truy cập/reload trang web

-   Cách thức hoạt động
    -   Bắt sự kiện trên các tabs và bắn sự kiện sang content.js để xử lý thao tác DOM

```js
chrome.tabs.onUpdated.addListener((tabId, status, tab) => {
    chrome.tabs.sendMessage(
        tabId,
        {
            type: tabId,
            payload: tab,
            status,
        },
        callback
    );
});
```

2. File content.js

-   Mục đích: Xử lý các sự kiện, DOM trên trang web hiện tại
-   Tệp chạy trong ngữ cảnh (context) của trang web đang truy cập
-   Có thể truy cập vào DOM của trang web
-   Chạy ngay khi truy cập/reload vào trang web
-   https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts

-   Cách thức hoạt động:
    -   Nhận sự kiện từ background.js và popup.js để xử lý DOM tương ứng

```js
(() => {
    // case theo loại sự kiện để xử lý tương ứng
    chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
        switch (obj.type) {
            case "ADD":
                // trả response về cho callback của sendMessage
                response("any data");
                break;
        }
    });
})();
```

3. File popup.js

-   Mục đích: Xử lý giao diện trên popup
-   Cách thức hoạt động:
    -   Xử lý các sự kiện tương tác trên poup
    -   Bắn sự kiện sang content.js nếu muốn thao tác với trang web hiện tại

4. Một số scripts có thể thêm:
- Parse JWT token
- Đọc dữ liệu từ localStorage:
  + TenantId
  + TenantCode
  + OrganizationId
  + SessionId
  + UserId

