$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    $('#btn_a').on('click', function(e) {
        e.preventDefault();
        var username = $('#form_reg [name=username]').val()
        var password = $('#form_reg [name=password] ').val()
            // console.log(username);
            // console.log(password);
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            dataType: 'json',
            data: {
                username: username,
                password: password
            },
            success: function(backData) {
                console.log(backData);
                if (backData.status !== 0) {
                    return layer.msg(backData.message)
                } else {
                    layer.msg('注册成功，请登录！')
                    $('#link_login').click()
                }
            }
        });
    })

    $('#btn_b').on('click', function(e) {
        e.preventDefault()
        var username = $('#form_login [name=username]').val().trim()
            // console.log(username);
        var password = $('#form_login [name=password]').val().trim()
        $.ajax({
            url: '/api/login',
            type: 'post',
            dataType: 'json',
            data: {
                username: username,
                password: password
            },
            success: function(backData) {
                // console.log(backData);
                if (backData.status != 0) {
                    return layer.msg(backData.message)
                } else {
                    layer.msg('登录成功')
                }
                localStorage.setItem('token', backData.token)
                location.href = '/index.html'

            }
        });
    })


})