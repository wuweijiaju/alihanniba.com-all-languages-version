/**
 * Created by liuli on 15/12/12.
 */

function showNav(dj){
    $("#top_nav .header_nav .show_nav ."+dj+" a").addClass('showing');
   	$("#top_nav .header_nav .show_nav ."+dj).siblings().eq(0).find('a').removeClass('showing');
}





var alihanniba = {};
alihanniba.init = function(){
    "use strict";
	$(document).ready(function(){
	    $("#details .ability_about_me").mousemove(function(){
	        $("#ability_info").show();
	    })
	    $("#details .ability_about_me").mouseout(function(){
	        $("#ability_info").hide();
	    })
	})
}

alihanniba.home = function(){
    "use strict";
	$(document).ready(function(){

	});
}

alihanniba.bookMark = function(){
    "use strict";
    $(document).ready(function() {
    	showNav('bookmark');
    });


}

alihanniba.tools = function(){
    "use strict";
	$(document).ready(function() {
    	showNav('tools');
	});
}

alihanniba.login = function(){
    "use strict";
    $(document).ready(function() {
        showNav('log');
        $("#login_nav p").on('click',function(event) {
            $(this).addClass('button_checked').siblings().removeClass('button_checked');
            if($("#login_nav #login_button").hasClass('button_checked')){
                $("#login_main form input").show();
                $("#login_main form p").hide();
            }else{
                $("#login_main form input").hide();
                $("#login_main form p").show();
            }
        });
    });
}

alihanniba.log = function(){
    "use strict";
	$(document).ready(function() {
        //导航条样式
        showNav('log');
        var date = new Date();
        var str = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate();
        var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
        var week = dayNames[date.getDay()];
        //富文本编辑器初始化
        KindEditor.ready(function(K){
            window.editor = K.create('#editor_id');
        });
        //渲染日志目录
        $.ajax({
            url: '/list/logList',
            type: 'POST',
            dataType: 'json',
            data: {},
        })
        .done(function(data) {
            if(data.length > 0){
                for (var i = 0; i < data.length; i++) {
                    $("#log_list tbody").append(
                            '<tr class="log_row" data-id="'+data[i].id+'">'+
                                '<td class="log_article_title">'+data[i].title+'</td>'+
                                '<td class="log_article_time">'+data[i].time+'</td>'+
                            '</tr>'
                        )
                }
                $("#log_list tbody").on('click', 'tr', function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    // console.log($(this).attr("data-id"));
                    window.location.href = "/logOne?id=" + $(this).attr("data-id");
                });
            }
        })
        .fail(function() {
            console.log("error");
        })
    	/*
    	sweetalert插件
    	 */
    	$("#edit_log button").on('click',function(event) {
	    	swal({
	    		title: "我要写日志啦~~~",
	    		text: "请先输入标题好不啦",
	    		type: "input",
	    		showCancelButton: true,
	    		closeOnConfirm: false,
	    		animation: "slide-from-top",
	    		inputPlaceholder: "Write something" },
	    		function(inputValue){
	    			if (inputValue === false)
	    				return false;
	    			if (inputValue === "") {
	    				swal.showInputError("你不写标题我会打你的哦!");
	    				return false
	    			}
                    swal({
                        title: "今天是:" + str,
                        text: week,
                        timer: 1500,
                        showConfirmButton: false ,
                        imageUrl: "../images/thumbs-up.jpg"
                    });
                    setTimeout(function(){
                        swal("Nice!", "日志标题是: " + inputValue, "success");
                        $('#editor_box').css('display','block');
                        $('#submit_log').css('display','block');
                        $('.ke-container-default').css({
                            'height':'100%',
                            'width':'100%',
                        });
                        $('#log_title').html(inputValue);
                        $('#log_writeTime').html(str);
                        $('#log_writeWeek').html(week);
                        $("html,body").animate({scrollTop:$("#log_info").offset().top},1000);
                    },2000);
    		});
    	});
    	$("#submit_log").on('click',function(event) {
    		var log_title = $('#log_title').html();
    		var log = editor.html();
    		$.ajax({
    			url: '/log/logWrite',
    			type: 'post',
    			dataType: 'json',
    			data: {
    				title : log_title,
    				log   : log,
                    time  : str,
                    week  : week
    			},
    		})
    		.done(function(data) {
    			console.log(data.code);
                if(data.code === 200){
                    swal({
                        title: "太棒啦",
                        text: "日志保存成功",
                        timer: 3000,
                        imageUrl: "../images/thumbs-up.jpg" ,
                        showConfirmButton: false
                   });
                    setTimeout(function(){
                        window.location.reload();
                    },2000);
                }
    		})
    		.fail(function() {
    			console.log("error");
    		})
    	});
	});

}

alihanniba.logOne = function(){
    "use strict";
    $(document).ready(function() {
        //导航条样式
        showNav('log');
        console.log(document.location.search);
        var search = document.location.search;
        var id = search.replace(/[^0-9]/ig,"");
        console.log(id);
        $.ajax({
            url: 'article/logArticle',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id
            },
        })
        .done(function(data) {
            $(".article_container").append(
                    '<div class="article_title" data-id="'+data[0].id+'">'+data[0].title+'</div>'+
                    '<div class="article_subtitle">'+data[0].time+'&nbsp;'+data[0].week+'</div>'+
                    '<div class="article_seperator"></div>'+
                    '<div class="article_content">'+data[0].log+'</div>'
                )
        })
        .fail(function() {
            console.log("error");
        })



    });
}
alihanniba.movie = function(){
    "use strict";
	$(document).ready(function() {
    	showNav('movie');
    	/*
    	初始化播放器
    	 */
    	projekktor('#player_a', {
        poster: '../images/hacker.jpg',
        title: '我是谁 没有绝对安全的系统',
        width: 640,
        height: 385,
        playlist: [
            {
            1: {src: "http://7xod1r.com2.z0.glb.qiniucdn.com/WhoamI.mp4", type: "video/mp4"}
            }
        ]
        }, function(player) {} // on ready
        );
	});

}

alihanniba.about = function() {
    "use strict";
	$(document).ready(function() {
    	showNav('about');
	});

}






