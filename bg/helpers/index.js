export function setBadgeCount(count) {
    let text = '';

    if (count) {
        text = count.toString();
    }

    chrome.browserAction.setBadgeText({text});
}

export function injectContentScripts(tabs) {
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].url.indexOf('chrome://') === -1) {
            chrome.tabs.executeScript(tabs[i].id, { file: 'content.js' });
        }
    }
}
export function createTabFromLink(url) {
    let GOOGLE_FAVICON_SERVICE = 'https://www.google.com/s2/favicons?domain=';

    return fetch(url)
        .then(response => response.text())
        .then(response => {
            let titleRegex = /<\s*?title.*?>(.*?)<.*?\/\s*?title\s*?>/;
            let favicon = GOOGLE_FAVICON_SERVICE + url;
            let title;
            let match;

            match = titleRegex.exec(response);
            title = match && match[1];

            return {
                url,
                title,
                favicon
            };
        });
}