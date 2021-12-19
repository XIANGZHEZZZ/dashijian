$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return '昵称长度必须在 1 ~ 6 个字符之中'
            }
        }
    })
    initUserInfo()
    // 获取用户基本信息
    function initUserInfo(){
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
                console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
                // layer.msg(res.message)
            }
        })
    }

    $('#btnReset').on('click', function(e){
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                if(res.status !==0){
                    layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })

})