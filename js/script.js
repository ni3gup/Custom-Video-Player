$(document).ready(function () {
    $('#video-input').change(setVideo);

    $('#video').click(toggleVideoStatus);
    $('#video').on('play', updatePlayIcon);
    $('#video').on('pause', updatePlayIcon);
    $('#video').on('timeupdate', updateProgress);

    $('#play').click(toggleVideoStatus);
    $('#stop').click(stopVideo);

    $('#progress').change(setVideoProgress);

    $('#volume-btn').click(toggleVolume);

    $("#volume").slider({
        min: 0,
        max: 100,
        value: 100,
        range: "min",
        slide: function (event, ui) {
            const isVideoSelected = checkIsVideoSelected();
            if (!isVideoSelected) {
                return false;
            }
            
            setVolume(ui.value / 100);
        }
    });
});

function setVideo() {
    const file = $(this).prop('files')[0];

    var fileURL = URL.createObjectURL(file);
    $('#video').attr('src', fileURL);

    toggleVideoStatus();
}

function toggleVideoStatus() {
    const video = $('#video').get(0);

    const isVideoSelected = checkIsVideoSelected();
    if (!isVideoSelected) {
        return false;
    }

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function checkIsVideoSelected() {
    if (!$('video').attr('src')) {
        alert('Please select a video file');
        return false;
    }
    return true
}

function updatePlayIcon() {
    const play = $('#play');
    const video = $('#video').get(0);

    const isVideoSelected = checkIsVideoSelected();
    if (!isVideoSelected) {
        return false;
    }

    if (video.paused) {
        play.html('<i class="fa fa-play fa-2x"></i>');
    } else {
        play.html('<i class="fa fa-pause fa-2x"></i>');
    }
}

const updateProgress = () => {
    const video = $('#video').get(0);

    const isVideoSelected = checkIsVideoSelected();
    if (!isVideoSelected) {
        return false;
    }

    const progress = !isNaN(video.currentTime / video.duration * 100) ? video.currentTime / video.duration * 100 : 0

    $('#progress').val(progress);

    // Get Hour
    let hour = Math.floor(video.currentTime / (60 * 60));
    if (hour < 10) {
        hour = '0' + String(hour);
    }

    // Get Minutes
    let mins = Math.floor((video.currentTime % (60 * 60)) / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    // Get Seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    $('#timestamp').html(`${hour}:${mins}:${secs}`);
}

const stopVideo = () => {
    const video = $('#video').get(0);

    const isVideoSelected = checkIsVideoSelected();
    if (!isVideoSelected) {
        return false;
    }

    video.currentTime = 0;
    video.pause();
}

const setVideoProgress = () => {
    const video = $('#video').get(0);

    const isVideoSelected = checkIsVideoSelected();
    if (!isVideoSelected) {
        $('#progress').val(0);
        return false;
    }
    
    video.currentTime = (+progress.value * video.duration) / 100;
}

function setVolume(volume) {
    const video = $('#video').get(0);
    
    if(volume < 1) {
        $('#volume-btn').html('<i class="fa fa-volume-down fa-2x"></i>');
    }

    if(volume === 1) {
        $('#volume-btn').html('<i class="fa fa-volume-up fa-2x"></i>');
    }

    if(volume === 0) {
        $('#volume-btn').html('<i class="fa fa-volume-mute fa-2x"></i>');
    }
    
    video.volume = volume;
}

function toggleVolume() {
    const video = $('#video').get(0);

    const isVideoSelected = checkIsVideoSelected();
    if (!isVideoSelected) {
        return false;
    }

    if (video.volume === 0) {
        $("#volume").slider({
            min: 0,
            max: 100,
            value: 100,
            range: "min",
            slide: function (event, ui) {
                setVolume(ui.value / 100);
            }
        });

        $('#volume-btn').html('<i class="fa fa-volume-up fa-2x"></i>');
        video.volume = 1;
    } else {
        $("#volume").slider({
            min: 0,
            max: 100,
            value: 0,
            range: "min",
            slide: function (event, ui) {
                setVolume(ui.value / 100);
            }
        });

        $('#volume-btn').html('<i class="fa fa-volume-mute fa-2x"></i>');
        video.volume = 0;
    }
}

