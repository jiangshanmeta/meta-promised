# meta-promised

这个项目是尝试实现 [vue-promise](https://github.com/posva/vue-promised) 所实现的效果

## Usage

```javascript
Vue.component('meta-promised', metaPromised)
```

在模板中：

```html
<meta-promised :promise="promise">
    <template slot="pending">
        请求中
    </template>
    <template slot-scope="scope" slot="then">
        <div>{{scope.msg}}</div>
    </template>
    <template slot-scope="scope" slot="catch">
        <div style="color:red;">{{scope.err}}</div>
    </template>
</meta-promised>
```

## API

props

|  Name  | Description  |  Type  | Required |
|  :---: |     :--:     |  :--:  | :-----:  |
|  promise | 需要meta-promise组件处理的promise | Promise | true |


slots

| Name | Description | Scope |
|  :---: |     :--:     |  :--:  |
|  default | promise未决议时展示的内容 | - |
|  pending | 同 non scoped default | - | 
|  then    | promise resolved 时展示的内容 | resolved value |
|  default | 同 scoped default | resolved value |
|  catch   | promise rejected 时展示的内容 | rejected value |

## 差异

虽说是仿写vue-promised这个项目，但还是有些差异的。

最大的差异是我修复了一个bug。想象这么一个场景，第一个promise是5s后才会被决议，但是2s后用户操作或者什么原因，生成了一个新的promise传递给meta-promise组件，那我们是否还需要关心第一个promise？答案是否定的，我们现在仅仅需要关心第二个promise。这也是我在example目录下实现的例子想要表达的内容。

还有些小feature，比如promises参数，这个我认为应该由开发者调用Promise.all生成一个promise实例来处理，就没有去做实现。