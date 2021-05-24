function DetectOS() {
    let userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
    
    if (macosPlatforms.indexOf(platform) !== -1) os = 'Mac OS';
    else if (iosPlatforms.indexOf(platform) !== -1) os = 'iOS';
    else if (windowsPlatforms.indexOf(platform) !== -1) os = 'Windows';
    else if (/Android/.test(userAgent)) os = 'Android';
    else if (!os && /Linux/.test(platform)) os = 'Linux';
    if (/CrOS/.test(userAgent)) os = 'ChromeOS';

    return os;
}

function DetectBrowser() {
    let browser;

    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1 ) browser = 'Opera';
    else if(navigator.userAgent.indexOf("Chrome") !== -1 ) browser = 'Chrome';
    else if(navigator.userAgent.indexOf("Safari") !== -1) browser = 'Safari';
    else if(navigator.userAgent.indexOf("Firefox") !== -1)  browser = 'Firefox';
    else if((navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode === true )) browser = 'IE';
    else browser = 'Unknown';

    return browser;
}

const EXPORTS = {
    DetectOS,
    DetectBrowser
};

export default EXPORTS;