const http = uni.$u.http


//发送用户评论
export const postcommon = (commoninfo) => http.post('/usercomment',commoninfo,{
	params:commoninfo
})
//修改用户收藏
export const changeUserCheck = (changeInfo) => http.post('/changeCheck',changeInfo)
//修改景区收藏数
export const Collection = (data) => http.post('/changeCollection',data,data)
//获取拥有旅游线路的景区
export const getrecommend = () => http.get('/introduce')
//获取景区旅游线路经纬度
export const getTravelrouter = (id) => http.get('/travelrouter/'+ id)
// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
//获取轮播图信息
export const getAdvert = () => http.get('/swiper')
//获取景区信息
export const getIntroduce = () => http.get('/search')
//获取所有图片信息
export const getAllimg = ()=> http.get('/allpostimg')
//获取景区详情
export const getfeedinfo = (id)=> http.get('/allstate/' + id)