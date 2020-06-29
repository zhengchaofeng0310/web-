$(function() {
    function intival() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: function(backData) {
                console.log(backData);
                var tplList = template('tpl-table', backData)
                $('tbody').html(tplList)
            }
        });

    }

    intival()
    var index = null
    $('#btnAddCate').on('click', function() {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            type: 'post',
            data: $(this).serialize(),
            success: function(backData) {
                console.log(backData);
                intival()
                layer.close(index)
            }
        });
    })

    var indexEdit = null
    var form = layui.form
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
            // console.log(id);
        $.ajax({
            url: '/my/article/cates/' + id,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            },
            success: function(backData) {
                console.log(backData);
                form.val('form-edit', backData.data)
            }
        });

    })

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(backData) {
                if (backData.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                intival()
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // console.log(id);
        $.ajax({
            url: '/my/article/deletecate/' + id,
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            },
            success: function(backData) {
                console.log(backData);
                if (backData.status != 0) {
                    return layui.layer.msg('删除失败')
                }
                layui.layer.msg('删除成功')
                intival()
            }
        });

    })

})