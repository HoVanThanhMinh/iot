var socket = io("http://localhost:6060")

socket.on("server-update-data", function (data) {

    // Home page
    $("#currentTemp").html(data.temp)
    $("#currentHumi").html(data.humi)
    $("#currentLight").html(data.light)

    // Warning mode
    var warningSection = document.getElementById("warningSection")
    if (data.light > 1000) {
        warningSection.classList.add("warning-mode-on")
    } else {
        warningSection.classList.remove("warning-mode-on")
    }
    
    // đổi màu
    var tempChange = document.getElementById("temp")
    if(data.temp <20) tempChange.style.backgroundColor = "#009CFF"
    else if(data.temp >=20 && data.temp <= 40) tempChange.style.backgroundColor =" #FFAE69"
    else if(data.temp >40 && data.temp <100) tempChange.style.backgroundColor = "#FF0000"

    var humChange = document.getElementById("hum")
    if(data.humi <40) humChange.style.backgroundColor = "#7FA3A3"
    else if(data.humi >=40 && data.humi <= 70) humChange.style.backgroundColor =" #57B3B3"
    else if(data.humi >70 && data.humi <100) humChange.style.backgroundColor = "#FF0000"

    // var lightChange = document.getElementById("lux")
    // if(data.light <200) lightChange.style.backgroundColor = "#009CFF"
    // else if(data.light >=200 && data.light <= 400) lightChange.style.backgroundColor =" #FFFACD"
    // else if(data.light >400) lightChange.style.backgroundColor = "#FFE4B5"

    //History page
    $("#id-content").append("<div class='h-para'>" + data.id + "</div>")
    $("#time-content").append("<div class='h-para'>" + data.time + "</div>")
    $("#temp-content").append("<div class='h-para'>" + data.temp + "</div>")
    $("#humi-content").append("<div class='h-para'>" + data.humi + "</div>")
})

socket.on("send-full", function (data) {

    // History page
    $("#time-content").html("")
    $("#temp-content").html("")
    $("#humi-content").html("")
    $("#id-content").html("")
    console.log(data)
    data.forEach(function (item) {
        $("#time-content").append("<div class='h-para'>" + item.time + "</div>")
        $("#temp-content").append("<div class='h-para'>" + item.temp + "</div>")
        $("#humi-content").append("<div class='h-para'>" + item.humi + "</div>")
        $("#id-content").append("<div class='h-para'>" + item.id + "</div>")
    })
})

// ---- Control devices ----
function livingroomLight() {
    var checkBox = document.getElementById("livingroomLight");

    if (checkBox.checked == true) {
        var result1 = confirm("bạn có muốn bật đèn không ? \n nhấn OK để bật đèn cancel để hủy.");
        if(result1){
        //alert('LED On')
        socket.emit("livingroomLightChange", "on")
        }
    } else {
        var result2 = confirm("bạn có muốn tắt đèn không ? \n nhấn OK để bật đèn cancel để hủy.");
        if(result2){
        // alert('LED Off')
        socket.emit("livingroomLightChange", "off")
        }
    }
}

function livingroomAirConditioner() {
    var checkBox = document.getElementById("livingroomAirConditioner");
    if (checkBox.checked == true) {
        var result3 = confirm("bạn có muốn điều hoà không ? \n nhấn OK để bật đèn cancel để hủy.");
        //alert('LED On')
        if(result3){
        socket.emit("livingroomAirConditionerChange", "on")
        }
    } else {
        var result4 = confirm("bạn có muốn tắt điều hoà  không ? \n nhấn OK để bật đèn cancel để hủy.");
        // alert('LED Off')
        if(result4){
        socket.emit("livingroomAirConditionerChange", "off")
    }
}
}

function television() {
    var checkBox = document.getElementById("television");
    if (checkBox.checked == true) {
        var result5 = confirm("bạn có muốn bật TV không ? \n nhấn OK để bật đèn cancel để hủy.");
        //alert('LED On')
        if(result5){
        socket.emit("televisionChange", "on")
        }
    } else {
        var result6 = confirm("bạn có muốn tắt TV không ? \n nhấn OK để bật đèn cancel để hủy.");
        // alert('LED Off')
        if(result6){
        socket.emit("televisionChange", "off")
        }
    }
}

function bedroomLight() {
    var checkBox = document.getElementById("bedroomLight");
    if (checkBox.checked == true) {
        //alert('LED On')
        socket.emit("bedroomLightChange", "on")
    } else {
        // alert('LED Off')
        socket.emit("bedroomLightChange", "off")
    }
}

function bedroomAirConditioner() {
    var checkBox = document.getElementById("bedroomAirConditioner");
    if (checkBox.checked == true) {
        //alert('LED On')
        socket.emit("bedroomAirConditionerChange", "on")
    } else {
        // alert('LED Off')
        socket.emit("bedroomAirConditionerChange", "off")
    }
}

function airVent() {
    var checkBox = document.getElementById("airVent");
    if (checkBox.checked == true) {
        //alert('LED On')
        socket.emit("airVentChange", "on")
    } else {
        // alert('LED Off')
        socket.emit("airVentChange", "off")
    }
}

// ---- RTC ----



