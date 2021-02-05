function changeTheme(current, next){
    document.querySelector(`link[title="${next}"]`).removeAttribute("disabled");
    document.querySelector(`link[title="${current}"]`).setAttribute("disabled", "disabled");
}
function copyData(){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    var textarea = document.createElement("textarea");
    textarea.textContent = JSON.stringify(data, null, 4);
    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("copy");  // Security exception may be thrown by some browsers.
        toastr.success('The configuration in JSON format has been copied to your clipboard', 'Copied configuration');
    }
    catch (ex) {
        return false;
    }
    finally {
        document.body.removeChild(textarea);
    }
}
document.addEventListener('DOMContentLoaded', ()=> {
    let titles = document.querySelectorAll('link[rel="alternate stylesheet"]'),
        themeSelector = document.getElementById("select-theme"),
        currentTheme = "default",
        codeContainer = document.getElementById("code-container"),
        root = document.documentElement.style,
        bgColor = document.getElementById("bg-color"),
        bgTransparent = document.getElementById("bg-transparent"),
        showLine = document.getElementById("show-line"),
        showShadow = document.getElementById("show-shadow"),
        marginTop = document.getElementById("margin-top"),
        marginLeft = document.getElementById("margin-left"),
        marginBottom = document.getElementById("margin-bottom"),
        marginRight = document.getElementById("margin-right"),
        borderRadius = document.getElementById("border-radius");

    let shadow, color, margins;
    if(data.hasOwnProperty("shadowEnable")) {
        if(data.shadowEnable) shadow = "0px 0px 30px 0px #000";
        else shadow = "none";
    } else shadow = "none";
    if(data.hasOwnProperty("backgroundTransparent")) {
        if(data.backgroundTransparent) color = "transparent";
        else {
            if(data.hasOwnProperty("backgroundColor"))
                color = data.backgroundColor;
            else
                color = "#c6d1fb";
        }
    }
    if(data.hasOwnProperty("theme")){
        document.querySelector(`link[title="${data.theme}"]`).removeAttribute("disabled");
    }

    if(!data.hasOwnProperty("borderRadius"))
        data.borderRadius = 0;
    if(data.hasOwnProperty("margins"))
        margins = data.margins;
    else
        margins = {};
    if(!margins.hasOwnProperty("top"))
        margins["top"] = 40;
    if(!margins.hasOwnProperty("left"))
        margins["left"] = 40;
    if(!margins.hasOwnProperty("bottom"))
        margins["bottom"] = 40;
    if(!margins.hasOwnProperty("right"))
        margins["right"] = 40;

    root.setProperty('--pre-box-shadow', shadow);
    root.setProperty('--bg-color', color);
    root.setProperty('--pre-border-radius', data.borderRadius + "px");
    root.setProperty('--con-margin-top', margins.top + "px");
    root.setProperty('--con-margin-left', margins.left + "px")
    root.setProperty('--con-margin-bottom', margins.bottom + "px")
    root.setProperty('--con-margin-right', margins.right + "px")

    titles.forEach(title => {
        let option = document.createElement("option");
        option.value = option.innerText = title.title;
        if(title.title == currentTheme)
            option.selected = true;
        themeSelector.appendChild(option);
    });
    themeSelector.addEventListener('change', e => {
        let nextTheme = e.target.value;
        changeTheme(currentTheme, nextTheme);
        currentTheme = nextTheme;
        data.theme = e.target.value;
    });
    bgColor.addEventListener('input', e => {
        data.backgroundColor = e.target.value;
        root.setProperty('--bg-color', e.target.value);
    });
    bgTransparent.addEventListener('input', e => {
        data.backgroundTransparent = e.target.checked;
        if(e.target.checked) color = "transparent";
        else
            color = bgColor.value;
        root.setProperty('--bg-color', color);
    });
    showLine.addEventListener('change', e => {
        data.showLineNumbers = e.target.checked;
        if(e.target.checked)
            root.setProperty('--line-show', 'block');
        else
            root.setProperty('--line-show', 'none');
    });
    showShadow.addEventListener('change', e => {
        data.shadowEnable = e.target.checked;
        if(!e.target.checked)
            root.setProperty('--pre-box-shadow', "none");
        else
            root.setProperty('--pre-box-shadow', "0px 0px 30px 0px #000");
    });
    marginTop.addEventListener('input', e => {
        data.margins.top = e.target.value;
        root.setProperty('--con-margin-top', e.target.value + "px");
    });
    marginLeft.addEventListener('input', e => {
        data.margins.left = e.target.value;
        root.setProperty('--con-margin-left', e.target.value + "px");
    });
    marginBottom.addEventListener('input', e => {
        data.margins.bottom = e.target.value;
        root.setProperty('--con-margin-bottom', e.target.value + "px");
    });
    marginRight.addEventListener('input', e => {
        data.margins.right = e.target.value;
        root.setProperty('--con-margin-right', e.target.value + "px");
    });
    borderRadius.addEventListener('input', e => {
        data.borderRadius = e.target.value;
        root.setProperty('--pre-border-radius', e.target.value + "px");
    });
    hljs.highlightBlock(codeContainer);
    if(data.hasOwnProperty("showLineNumbers"))
        if(data.showLineNumbers)
            hljs.lineNumbersBlock(codeContainer);
    bgColor.value = data.backgroundColor;
    bgTransparent.checked = data.backgroundTransparent;
    showLine.checked = data.showLineNumbers;
    showShadow.checked = data.shadowEnable;
    marginTop.value = data.margins.top;
    marginLeft.value = data.margins.left;
    marginBottom.value = data.margins.bottom;
    marginRight.value = data.margins.right;
    borderRadius.value = data.borderRadius;
});
