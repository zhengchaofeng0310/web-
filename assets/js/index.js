$(function() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            if (backData.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // console.log(backData);
            regs(backData)
        },


    });

    function regs(backData) {
        console.log(backData);
        console.log(backData.data.user_pic);
        if (backData.data.user_pic !== null) {
            var first = backData.data.username || backData.data.nickname
            $('.layui-nav-img').attr('src', backData.data.user_pic)
                // console.log(backData.data.user_pic);
            $('.layui-nav-img').show()
            $('.text-avatar').hide()
            $('#welcome').html('欢迎 &nbsp;&nbsp;' + first)
        } else {
            var first = backData.data.username || backData.data.nickname
                // console.log(first);
            $('.layui-nav-img').hide()
            $('.text-avatar').show()
            $('.text-avatar').html(first[0].toUpperCase())
            $('#welcome').html('欢迎 &nbsp;&nbsp;' + first)
        }
    }







    $('#tc').on('click', function() {
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index);
        });
    })
})