# TODO

- avatar切角
- feature:logo
- feature:背景色
- feature:chatpuppy的字符
- bug:图标不显示
- 任务栏背景色
- 调整chatlist页面的search输入框 —> 添加群组的左侧
- 登入登出注册等功能，隐藏到头像后面，从而减少tab页面，以便集成到Taiki-app中

---

1. 群组和联系人的头像，是因为Server端getRandomAvatar()的逻辑导致。

> 可以找到avatar生成服务，来接管该流程；或者NFT生成服务等

2. 🔖 native-base的Icon图标不显示问题

> [使用的图标组件，是在gradle中配置的](https://oblador.github.io/react-native-vector-icons/)

3. 任务栏和Tab栏的配色

> 最好是渐变。可参考手机上之前整理的一些社交UI界面。

4. 聊天界面下拉刷新的体验增强。

> 允许下拉一段距离再刷新

5. 输入时，emoji等图标的不显示

6. 提示的warnging：操作文件夹；未捕获的Promise错误等修复

7. header太丑了

8. 聊天界面的input太丑，fix到底部 & 调整样式

9. 聊天界面的Title太高，字体太大

> [配置](https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md#scene)

10. 聊天界面的username和在线状态，使用chatlist界面的Profile样式

11. 返回键旁边的数字为0