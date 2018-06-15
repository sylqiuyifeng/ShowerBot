# Shower bot & Web server

私人使用，不保证安全。

> 为什么会变成这样呢……第一次写了个bot，又写了个小网页。两件快乐事情重合在一起。而这两份快乐，又给我带来更多的快乐。得到的，本该是像梦境一般好用的bot……但是，为什么，会变成这样呢……	
> 音乐功能需要 FFMPEG

## `config.json`
`config.json` 默认不存在，因为里面包含大量私隐信息。请自行根据下方资料创建。

* `token`
* `clientId`
* `clientSecret`
* `refreshToken`
* `userAgent`
* `domain`: 下载功能的域名（可能是ip）
* `port`: 下载功能的port
* `owners`: bot owners ID 列表

## `setting.json`
* `download`: 下载文件目录名称（目前没搞recursive）
* `fileDb`: 文件资料库名称
* `prefix`: 命令前缀
* `rndCount`: 一次抓取的reddit submission数量，用于随机选取submission（hot及new模式）。
* `subs`: Reddit命令
    * (名称): 命令名称
        * `name`: subreddit名称
        * `aliases`: 命令的alias，注意需要是小写
        * `description`: 命令用途描述
        * `default`: 默认模式。可以是 `rnd`, `hot`, `new` （后两者会从该排序里的前20个抽取一个，没有cache所以可能会比较慢）

## Acknowledgement
* Webpage template from [cover](https://fezvrasta.github.io/bootstrap-material-design/docs/4.0/examples/cover/)
* File drag and drop upload from [CSS-Trick](https://css-tricks.com/drag-and-drop-file-uploading/)