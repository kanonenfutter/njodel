function getJodel(url, element, images_only_flag) {
    $.getJSON(url)
        .done(function (data) {
            //console.log(data);
            if (data.next != null) {
                last_post_id = data.next;
                console.log("Last post:" + last_post_id);
            }
            if (data.details != null) {
                var age = moment(data.details.created_at).fromNow();
                var message = convert_message(data.details.message);
                if (data.details.image_url == null) {
                    $(element).append('<div class="jodel details" style="background-color: #' + data.details.color + ';"> <div class="msg">' +  message + '</div><div class="karma">OJ - '+ age+ ' - ' +data.details.vote_count + ' Karma</div></div>');
                } else {
                    $(element).append('<div class="jodel details" style="background-color: #' + data.details.color + ';"><img src="http:'+ data.details.image_url +'" alt="image" class="jimage"><div class="karma">OJ - '+ age+ ' - ' +data.details.vote_count + ' Karma</div></div>');
                }
            };
            $.each( data.replies, function (i, item) {
                var age = moment(item.created_at).fromNow();
                var message = convert_message(item.message);
                var replier = item.replier;
                if (replier == 0) {
                    replier = "oj";
                } else {
                    replier = replier;
                }


                if (images_only_flag == false) {
                    if (item.image_url == null) {
                        $(element).append('<div class="jodel '+ replier +'"  style="background-color: #' + item.color + ';"> <div class="msg">' +  message + '</div><div class="karma"><p class="vote_count">'+
                            item.vote_count+'</p><br> <i class="fa fa-user" aria-hidden="true"></i> #' + replier + '   <i class="fa fa-clock-o" aria-hidden="true"></i> '+
                            age +'</div></div>');
                    } else {
                        $(element).append('<div class="jodel '+ replier +'" style="background-color: #' + item.color + ';"><img src="http:'+ item.image_url +'" alt="image" class="jimage"><div class="karma"> <p class="vote_count">'+
                            item.vote_count+'</p><br> <i class="fa fa-user" aria-hidden="true"></i> #' + replier + '   <i class="fa fa-clock-o" aria-hidden="true"></i> '+
                            age +'</div></div>');
                    }
                } else {
                    if (item.image_url != null) {
                        $(element).append('<div class="jodel '+ replier +'" style="background-color: #' + item.color + ';"><img src="http:'+ item.image_url +'" alt="image" class="jimage"><div class="karma"> <p class="vote_count">'+
                            item.vote_count+'</p><br> <i class="fa fa-user" aria-hidden="true"></i> #' + replier + '   <i class="fa fa-clock-o" aria-hidden="true"></i> '+
                            age +'</div></div>');
                    } 

                }
            });
            if (data.next != null) {
                last_post_id = data.next;

            } else {
                last_post_id = null;
            }
            if (data.error!= null) {
                $(element).append('<div class="jodel" style="background-color: grey;"><div class="msg">' + data.error + '</div></div>');
            }
            highlightByClass("oj","yellow");

        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("complete");
        });
};


function highlightByClass(classname,colorover,colorout="transparent"){
    var elms=document.getElementsByClassName(classname);
    //console.log(elms.length);
    for(var i=0;i<elms.length;i++){
        elms[i].onclick = function(){
            for(var k=0;k<elms.length;k++){
                elms[k].style.backgroundColor="grey";//colorover;
            }
        };
    }

}

function convert_message(json_msg) {
    var m = json_msg;
    var html_message = m.replace(/\n/g, "<br>");
    // TODO: Replace hashtags with html hyperlinks
    //var html_message = string.replace(/(#)\w+/g, "<a href="">$&</a>");
    return html_message;
}

function isMobile() {
    // Check, if mobile browser
    var ua = navigator.userAgent.toLowerCase();
    var isMobile = ua.indexOf("mobile") > -1;
    //document.getElementById("ua").innerHTML = isMobile;
    return isMobile;
}