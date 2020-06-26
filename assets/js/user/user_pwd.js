$(function() {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function(value) {
            // console.log(value);
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: function(backData) {
                // console.log(backData);
                if (backData.status != 0) {
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        });
    })

})