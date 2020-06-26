$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            dataType: 'json',
            success: function(backData) {
                // console.log(id);
                // console.log(backData);
                if (backData.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // $('.layui-input-block [name=username]').val(backData.data.username)
                // pwds(backData.data)
                // console.log(backData)
                form.val('formUserInfo', backData.data)
            }
        });
    }

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})