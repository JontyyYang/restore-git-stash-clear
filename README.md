## restore-git-stash-clear

> git stash 之后， 不小心 git stash clear all 全部删除



### 找回方式 「基本知识」

**找到所有 stash 记录**

```shell
git fsck --lost-found
```

![img](https://cdn.nlark.com/yuque/0/2022/png/359181/1650266974573-795b1690-31a5-4890-80e0-146f4caae4bb.png)

**找到对应的 commitId**

```shell
git show 3be3ff22db44ca5d8104a67ffd550579ddda7289
```

![img](https://cdn.nlark.com/yuque/0/2022/png/359181/1650267047555-5f91caf7-48ef-4700-8fbb-dfa05988d650.png)



**恢复代码**

```shell
git merge 3be3ff22db44ca5d8104a67ffd550579ddda7289
```



### 问题

1. stash 记录太多了，甚至超过了一屏， 一个一个 show 判断是不是的，工作都没了



### 思路

发现操作都是一致的， 找到列表，找到每一个元素，show， show 会有基本信息，比如时间和任务， 可以用代码来做



### 结果

![img](https://cdn.nlark.com/yuque/0/2022/png/359181/1651462600827-c356018c-ce16-422d-9821-dad9e819bd30.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_19%2Ctext_Sm9udHl5%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

可以在代码里加上更多的限制，比如结合时间和用户，可以筛选到更少的信息





### 使用方式

npm i restore-git-stash-clear

restore-git-stash-clear -name 「这里写邮箱前缀」
