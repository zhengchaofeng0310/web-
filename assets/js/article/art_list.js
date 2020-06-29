$(function() {
    var form = layui.form
    var layer = layui.layer
    var laypage = layui.laypage;


    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    //把dataFormat放在需要的时间处理的地方|dataFormat
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
            //不要忘记补零
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function lists() {
        $.ajax({
            url: '/my/article/list',
            type: 'get',
            data: q,
            success: function(backData) {
                if (backData.status != 0) {
                    layer.msg('获取文章分类列表失败!')
                }
                // console.log(backData);
                var htmlstr = template('tpl-table', backData)
                $('tbody').html(htmlstr)
                renderPage(backData.total)
            }
        });
    }
    lists()
    saixuan()

    function saixuan() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: function(backData) {
                // console.log(backData);
                if (backData.status != 0) {
                    layer.msg('获取文章分类列表失败!')
                }
                var htmlStr = template('tpl-cate', backData)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        });
    }

    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
            // console.log(cate_id);
        var state = $('[name=state]').val()
            // console.log(state);
        q.cate_id = cate_id
        q.state = state
        lists()

    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                // console.log(obj.curr)
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                    // console.log(first);
                if (!first) {
                    lists()
                }
            }
        })

    }

    $('tbody').on('click', '.btn-delete', function() {
        var len = $('.btn-delete').length
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/delete/' + id,
            type: 'get',
            success: function(backData) {
                // console.log(backData);
                if (backData.status != 0) {
                    layer.msg('删除失败')
                }
                layer.msg('删除成功')
                if (len === 1) {
                    // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                    // 页码值最小必须是 1
                    q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                }
                lists()

            }
        });
    })

    $('tbody').on('click', '.btn-bj', function() {

        var id = $(this).attr('data-id')

        location.href = '/article/art_pub.html?id=' + id
    })

})