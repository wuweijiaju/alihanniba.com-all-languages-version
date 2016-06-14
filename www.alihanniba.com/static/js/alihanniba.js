/**
 * Created by liuli on 15/12/12.
 */

$(document).ready(function(){
    $("#details .ability_about_me").mousemove(function(){
        $("#ability_info").show();
    })
    $("#details .ability_about_me").mouseout(function(){
        $("#ability_info").hide();
    })
})
