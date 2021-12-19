$(function(){
    var layer = layui.layer

    var $image = $('#image')

    const options = {
        aspectRation: 1,
        preview: '.img-preview'
    }

    $image.cropper(options)

    $('#btnChooseImage').on('click', function(){
        // console.log('ok');
        $('#file').click()
    })

    // 为绑定的文件框 change 事件
    $('#file').on('change', function(e){
        // console.log(e);
        var fileslist = e.target.files
        // console.log(fileslist);
        if(fileslist.length === 0){
            return layer.msg('请选择图片！')
        }

        // 选择成功后 替换 原图片

        // 拿文件换路劲
        var file = e.target.files[0]

        var imgURL = URL.createObjectURL(file)
        // console.log(file);
        // console.log(imgURL);

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路劲
            .cropper(options) 

    })

    // 确认上传图片
    $('#btnUpload').on('click', function(){
        var dataURL = $image
        .cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        })
        .toDataURL('image/png')

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res){
                // console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })

    })
})