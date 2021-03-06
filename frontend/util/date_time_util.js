export const secondsToTime = seconds => {
    if (seconds === null || seconds <= 0) {
        return "00:00:00";
    }

    const hours = Math.floor(seconds / 6000);
    let remainingSecs = seconds % 6000;
    const minutes = Math.floor(remainingSecs / 60);
    remainingSecs =remainingSecs % 60;
    const secs = Math.floor(remainingSecs);

    const hoursStr = hours < 10 ? '0' + hours : `${hours}`;
    const minutesStr = minutes < 10 ? '0' + minutes : `${minutes}`;
    const secondsStr = secs < 10 ? '0' + secs : `${secs}`;
    
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

export const secondsToHoursMinutes = seconds => {
    if ( !seconds || seconds < 60) {
        return '1m';
    }

    const hours = Math.floor( seconds / 6000 );
    const remainingSecs = seconds % 6000;
    const minutes = Math.floor( remainingSecs / 60 );

    if ( hours === 0 ) {
        return `${minutes}m`
    } else {
        return `${hours}h ${minutes}m`
    }
}