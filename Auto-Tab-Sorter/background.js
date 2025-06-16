
function getRootDomain(urlStr) {
  try {
    const url = new URL(urlStr);
    const hostParts = url.hostname.split('.');
    if (url.hostname.endsWith('.gov.tw') && hostParts.length >= 3) {
      return hostParts.slice(-3).join('.');
    }
    return hostParts.slice(-2).join('.');
  } catch (e) {
    if (urlStr.startsWith("chrome://")) {
      return "chrome-internal";
    }
    return urlStr;
  }
}

function sortTabs() {
  chrome.windows.getAll({ populate: true }, (windows) => {
    const mainWindow = windows[0];
    const allTabs = windows.flatMap(win =>
      win.tabs.map(tab => ({
        ...tab,
        fromWindow: win.id
      }))
    );

    const movableTabs = allTabs.filter(tab =>
      !tab.pinned &&
      !tab.incognito &&
      (tab.url.startsWith("http") || tab.url.startsWith("chrome://"))
    );

    movableTabs.forEach(tab => {
      if (tab.fromWindow !== mainWindow.id) {
        chrome.tabs.move(tab.id, { windowId: mainWindow.id, index: -1 });
      }
    });

    setTimeout(() => {
      chrome.tabs.query({ windowId: mainWindow.id }, (tabs) => {
        const groups = {};
        tabs.forEach(tab => {
          const rootDomain = getRootDomain(tab.url);
          if (!groups[rootDomain]) groups[rootDomain] = [];
          groups[rootDomain].push(tab);
        });

        const sortedHosts = Object.entries(groups)
          .sort((a, b) => {
            const lenDiff = b[1].length - a[1].length;
            return lenDiff !== 0 ? lenDiff : a[0].localeCompare(b[0]);
          });

        for (const [host, tabGroup] of sortedHosts.reverse()) {
          const sortedTabs = tabGroup.sort((a, b) => a.url.localeCompare(b.url));
          const tabIds = sortedTabs.map(t => t.id);
          chrome.tabs.move(tabIds, { index: -1 });
        }
      });
    }, 1000);
  });
}

chrome.action.onClicked.addListener(sortTabs);
