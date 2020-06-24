$.ajaxPrefilter(function(option) {
    // console.log(option);
    option.url = 'http://ajax.frontend.itheima.net' + option.url
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
        option.complete = function(backData) {
            console.log(backData);
            // console.log(111);
            if (backData.responseJSON.status === 1 && backData.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                    // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }

        }
    }
})