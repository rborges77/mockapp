'use strict'

let checkServerHealthURI = "https://private-anon-14dd947258-blissrecruitmentapi.apiary-mock.com/health";
let loadingGIF = $('#loading-block');
let serverHealthPositive = $('#server-health-positive');
let serverHealthNegative = $('#server-health-negative');
let retryButton = $('#retry-button');

$(document).ready(function () {    
    hideServerHealthInfo(serverHealthPositive, 'false');
    hideServerHealthInfo(serverHealthNegative, 'true');
    checkServerHealth("GET", checkServerHealthURI);
    retryButton.click(function(){
        retryCheckingForServerHealth();
    });
});

function checkServerHealth(method, uri) {
    $.ajax({
        crossDomain: true,
        dataType: method,
        url: uri,
        cache: false,
        success: function (html) {
            $('#server-health-positive').show();
        },
        error: function (html) {
            $('#server-health-negative').show();
        },
        complete: function () {
            $('#loading-block').hide();
        }
    });
}

function hideServerHealthInfo(serverHealthInfoToHide, alsoHideRetryButton) {  
    serverHealthInfoToHide.hide();
    
    if(alsoHideRetryButton === 'true'){
        hideRetryButton(retryButton);
    }
}

function retryCheckingForServerHealth(){
    loadingGIF.show();
    hideServerHealthInfo(serverHealthNegative);
    checkServerHealth("GET", checkServerHealthURI);
}

function hideRetryButton(retrybtnToHide){
    retrybtnToHide.hide();
}