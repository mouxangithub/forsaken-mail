邮箱接码平台
forked from [denghongcai/forsaken-mail](https://github.com/denghongcai/forsaken-mail)

基于[denghongcai/forsaken-mail](https://github.com/denghongcai/forsaken-mail)修改的监听全域邮件

使用方法：
1.首先你得有个域名，这步怎么注册就不多说了，自行百度
2.使用docker和docker-compose在当前目录下执行docker-compose up -d原神启动，也不多讲了，自行查阅资料
3.放行服务器的25端口，这个必须放行，然后3000是web端口，不需要放行用反代也行，也不多讲了，懂的都懂，不懂就自行查资料或者问ChatGPT
4.接下来就是域名解析了，首先用A记录解析到你的主机IP上，例如：主机记录（@为默认一级，填其他则是二级多级）：@，记录类型选A类型记录IP，记录值填服务器IP，保存，域名试试能不能访问到web
5.如果第四步没问题就进入最后步骤，解析邮箱域名，主机记录这个就不多说了，默认一级@，最终呈现的邮箱就是@你的域名，也可以多设点，比如填mail，最终呈现结果就是：xxx@mail.你的主域名，如果你的@已经解析了主机了，不用担心，看看类型是不是不一样，A类型和此处的MX类型是不一样的，A类型和MX类型可以共存，比如你A类型的@跳转的是主页，但你邮件服务也想直接用主域名不加多级使用，此处也是可以的，直接主机记录写@，然后类型选择MX，最后这个记录值选择第四步的域名这个就是邮件主机，直接MX解析值到这个域名即可，哪怕多级MX也都指向这个值，这样你就可以无限级的白嫖邮箱服务，比如@mail.xxx.xyz，@email.xxx.xyz，@mx.xxx.xyz都安排上都行，按你自己的需求来

