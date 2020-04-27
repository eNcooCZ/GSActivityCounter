const getMonthlyActivity = () => {
    var activityInSeconds = 0;
    const month = new Date().getMonth()+1;
    const rows = document.querySelectorAll('tr');
    
    for(var i = 1; i < rows.length; i++) {
        const data = getTimeFromRow(rows[i], month);
        if(data == -1)
            break;
        else
            activityInSeconds = parseInt(activityInSeconds + data, 10);
    }
    if(activityInSeconds >= 72000)
        return "Aktivita je splněna";
    else
        return getFormatedTime(parseInt(activityInSeconds, 10)) + ", zbývá " + getFormatedTime(parseInt(72000 - activityInSeconds, 10));
}

const getTimeFromRow = (el, month) => {
    const row = el.children;
    const elMonth = row[0].innerText.charAt(5) + row[0].innerText.charAt(6);

    if(elMonth != month)
        return -1;

    const time = row[3].innerText;
    const hours = parseInt(time.charAt(3) + time.charAt(4), 10);
    const minutes = parseInt(time.charAt(6) + time.charAt(7), 10);
    const seconds = parseInt(time.charAt(9) + time.charAt(10), 10);

    return getTimeInSeconds(hours, minutes, seconds);
}

const getTimeInSeconds = (hours, minutes, seconds) => {
    return seconds + minutes*60 + hours*60*60;
}

const getFormatedTime = (seconds) => {
    var val = seconds;
    const sec = Math.floor(val%60);
    val = val/60;
    const min = Math.floor(val%60);
    val = val/60;
    const hours = Math.floor(val%24);

    return hours + ":" + min + ":" + sec;
}

const title = document.querySelector('.block .fHeading');
title.innerHTML += " ("+ getMonthlyActivity() +")";