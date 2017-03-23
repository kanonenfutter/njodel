function getJodel(url, element, set) {
    $.getJSON(url)
        .done(function (data) {
            console.log(data);
            if (data.next != null) {
                next = data.next;
                console.log(next);
            }
            if (data.details != null) {
                var age = moment(data.details.created_at).fromNow();
                if (data.details.image_url == null) {
                    $(element).append('<div class="jodel oj" style="background-color: #' + data.details.color + ';"> <div class="msg">' +  data.details.message + '</div><div class="karma">OJ - '+ age+ ' - ' +data.details.vote_count + ' Karma</div></div>');
                } else {
                    $(element).append('<div class="jodel oj" style="background-color: #' + data.details.color + ';"><img src="http:'+ data.details.image_url +'" alt="image" class="jimage"><div class="karma">OJ - '+ age+ ' - ' +data.details.vote_count + ' Karma</div></div>');
                }
            };
            $.each( data.replies, function (i, item) {
                var age = moment(item.created_at).fromNow();
                var replier = item.replier;
                if (replier == 0) {
                    replier = "OJ";
                } else {
                    replier = "#"+replier;
                }

                if (item.image_url == null) {
                $(element).append('<div class="jodel" style="background-color: #' + item.color + ';"> <div class="msg">' +  item.message + '</div><div class="karma">'+ 'Verfasser: ' + replier + ' - ' + age + ' - ' + item.vote_count + ' Karma</div></div>');
                } else {
                    $(element).append('<div class="jodel" style="background-color: #' + item.color + ';"><img src="http:'+ item.image_url +'" alt="image" class="jimage"><div class="karma">'+ 'Verfasser: ' + replier + ' - ' + age + ' - ' + item.vote_count + ' Karma</div></div>');
                }
            });
            if (data.next != null) {
                next = data.next;

            } else {
                next = null;
            }

        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("complete");
        });
};