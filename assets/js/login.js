$(function(){
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 校验密码
    var form = layui.form
    // 提示信息 
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 检验两次密码是否一致
        repwd: function(value){
            var pwd = $('.reg-box [name = password]').val()
            if(pwd !== value){
                return '两次密码不一样'
            }
        }
    })

    // 注册
    $('#form-reg').on('submit', function(e){
        e.preventDefault()
        
        const data = {
            username: $('.reg-box [name = username]').val(),
            password: $('.reg-box [name = password]').val()
        }
        
        $.post('/api/reguser', data, function(res){
            
            if(res.status !==0){
                
                return layer.msg(res.message)
            }
            
            layer.msg('注册成功 请登录! ')
            $('#link_login').click()
        })
    })
    // http://www.liulongbin.top:3007/api/reguser

    // 登录
    $('#form-login').submit(function(e){
        e.preventDefault()
       
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#form-login').serialize(),
            success: function(res){
                // console.log(res);
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                // token值 保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // console.log(res.token);

                // 登录成功跳转后台主页
                location.href = '/index.html'
            }
        })
    })
})