$(function(){
    var form = layui.form
    // 提示信息 
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        samePwd: function(vaule){
            if(vaule === $('[name=oldPwd]').val()){
                return '新旧密码一致!'
            }
        },
        rePwd: function(vaule){
            if(vaule !== $('[name=newPwd]').val()){
                return '两次密码不一致!'
            }
        }
       
    })

    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res){
                console.log(res);
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                // 原生dom 操作 清除 表单数据
                $('.layui-form')[0].reset()
            }
        })
        
    })
})