---
title: 实现接入bpmn-js
outline: [2,6]
---

接入[bpmn-js](https://bpmn.io/)

## 用到的包

```json
{
  "@bpmn-io/properties-panel": "^1.4.0",
  "@highlightjs/vue-plugin": "^2.1.0",
  "bpmn-js": "^11.3.1",
  "bpmn-js-properties-panel": "^1.17.2",
  "camunda-bpmn-moddle": "^7.0.1",
  "highlight.js": "^11.7.0"
}
```

- @bpmn-io/properties-panel 是用到了其中的entry组件(React组件),用于自定义属性面板
- @highlightjs/vue-plugin 和 highlight.js 是预览XML文件使用到的高亮插件
- bpmn-js 流程图
- bpmn-js-properties-panel 右侧的属性配置面板
- camunda-bpmn-moddle 适配camunda的JSON配置，就是修改属性配置面板的属性

## 代码

#### Bpmn.vue

```vue

<template>
  <div class="bpmn">
    <div class="bpmn-main">
      <div ref="bpmn" id="bpmnContainer" class="bpmn__container"></div>
      <div ref="bpmnPropertiesPanel" id="bpmnPropertiesPanel" class="bpmn__properties-panel"></div>
    </div>
    <Toolbar class="bpmn-toolbar" :bpmn-modeler="bpmnModeler" />
  </div>
</template>

<script setup>
  import { onMounted, ref, defineProps, watch } from 'vue'
  import 'bpmn-js/dist/assets/diagram-js.css'
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
  import 'bpmn-js/dist/assets/bpmn-js.css'
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
  import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
  import 'bpmn-js-properties-panel/dist/assets/element-templates.css'
  import 'bpmn-js-properties-panel/dist/assets/properties-panel.css'
  import BpmnModeler from 'bpmn-js/lib/Modeler.js'
  import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    CamundaPlatformPropertiesProviderModule,
    CloudElementTemplatesPropertiesProviderModule
  } from 'bpmn-js-properties-panel'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json'
  import translate from '@/views/bpmn/components/translate'
  import Toolbar from '@/views/bpmn/components/Toolbar'

  const bpmn = ref()
  const bpmnPropertiesPanel = ref()
  let bpmnModeler = ref(null)

  const props = defineProps({
    xml: {
      type: String,
      required: true
    }
  })

  watch(() => props.xml, () => {
    bpmnModeler.value?.importXML(props.xml)
  })

  onMounted(() => {
    bpmnModeler.value = new BpmnModeler({
      container: bpmn.value,
      propertiesPanel: {
        parent: bpmnPropertiesPanel.value
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule,
        CloudElementTemplatesPropertiesProviderModule,
        {
          translate: ['value', translate]
        }
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    })
  })
</script>

<style scoped lang="scss">
  .bpmn {
    width: 100%;
    height: 100%;

    .bpmn-main {
      width: 100%;
      height: 100%;
      display: flex;

      .bpmn__container {
        width: 100%;
        height: 100%;
        background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGUwZTAiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTQwIDBIMHY0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+') repeat !important;
      }

      .bpmn__properties-panel {
        border: 1px solid rgba(0, 0, 0, 0.1);
        width: 250px;
      }
    }

    .bpmn-toolbar {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }
  }
</style>
```

#### Toolbar.vue

```vue

<template>
  <div class="toolbar">
    <input ref="fileUploadEl" type="file" style="display: none" @change="fileChange" />
    <el-button-group>
      <el-button @click="upload()">
        <a title="上传文件">
          <el-icon size="30">
            <FolderAdd />
          </el-icon>
        </a>
      </el-button>
      <el-button @click="createNewDiagram()">
        <a title="清空">
          <el-icon size="30">
            <Delete />
          </el-icon>
        </a>
      </el-button>
      <el-button @click="downloadXml()">
        <a ref="downloadXmlEl" title="xml下载">
          <el-icon size="30">
            <Download />
          </el-icon>
        </a>
      </el-button>
      <el-button @click="downloadSvg()">
        <a ref="downloadSvgEl" title="svg下载">
          <el-icon size="30">
            <PictureFilled />
          </el-icon>
        </a>
      </el-button>
      <el-button @click="previewXML">
        <a title="xml预览">
          <el-icon size="30">
            <Document />
          </el-icon>
        </a>
      </el-button>
      <el-button @click="previewSvg">
        <a title="svg预览">
          <el-icon size="30">
            <View />
          </el-icon>
        </a>
      </el-button>
    </el-button-group>

    <el-dialog title="XML预览" width="80%" v-model="previewXMLShow">
      <div style="max-height: 65vh;overflow: auto;">
        <highlightjs language='html' :code="previewXMLStr" />
      </div>
    </el-dialog>
    <el-dialog title="SVG预览" width="80%" v-model="previewSvgShow">
      <div style="text-align: center;" v-html="previewSvgData" />
    </el-dialog>
  </div>
</template>

<script setup>
  import { Util } from 'Vue3AppDevSdk'
  import { ref, defineProps } from 'vue'
  import diagramXML from '@/views/bpmn/components/initDiagramXML'

  const props = defineProps({
    bpmnModeler: {
      type: [Object, null],
      required: true
    }
  })

  const fileUploadEl = ref()
  const upload = async () => {
    try {
      await Util.Message.confirm('上传新文件将覆盖当前流程图，确定上传吗？', '提示', {
        type: 'warning',
        closeOnClickModal: false,
        closeOnPressEscape: false
      })
    } catch (e) {
      Util.Message.info('已取消')
      return
    }
    fileUploadEl.value?.click()
  }

  function fileChange () {
    if (fileUploadEl.value && fileUploadEl.value.files) {
      const file = fileUploadEl.value.files[0]
      const fileReader = new FileReader()
      fileUploadEl.value.value = ''
      fileReader.onload = (e) => {
        props.bpmnModeler.importXML(e.target.result)
      }
      fileReader.readAsText(file)
    }
  }

  const createNewDiagram = async () => {
    try {
      await Util.Message.confirm('此操作将清空当前流程图，确定新建吗？', '提示', {
        type: 'warning',
        closeOnClickModal: false,
        closeOnPressEscape: false
      })
    } catch (e) {
      Util.Message.info('已取消')
      return
    }
    props.bpmnModeler.importXML(diagramXML)
  }

  function setEncoded (link, name, data) {
    const encodedData = encodeURIComponent(data)
    if (link.value && data) {
      link.value.className += ('active')
      link.value.setAttribute('href', 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData)
      link.value.setAttribute('download', name)
    } else {
      link.value?.className.replace('active', '')
    }
  }

  const downloadXmlEl = ref()
  const downloadXml = async () => {
    try {
      const { xml } = await props.bpmnModeler.saveXML({ format: true })
      setEncoded(downloadXmlEl, 'diagram.bpmn', xml)
      Util.Message.success('下载成功')
    } catch (error) {
      Util.Message.error('下载失败，请重试')
      console.error(error)
    }
  }

  const downloadSvgEl = ref()
  const downloadSvg = async () => {
    try {
      const { svg } = await props.bpmnModeler.saveSVG()
      setEncoded(downloadSvgEl, 'diagram.svg', svg)
      Util.Message.success('下载成功')
    } catch (error) {
      Util.Message.error('下载失败，请重试')
      console.error(error)
    }
  }

  const previewXMLShow = ref(false)
  const previewXMLStr = ref('')
  const previewXML = async () => {
    try {
      const { xml } = await props.bpmnModeler.saveXML({ format: true })
      previewXMLStr.value = xml
      previewXMLShow.value = true
    } catch (error) {
      Util.Message.error('预览失败，请重试')
      console.error(error)
    }
  }


  const previewSvgShow = ref(false)
  const previewSvgData = ref()
  const previewSvg = async () => {
    try {
      const { svg } = await props.bpmnModeler.saveSVG()
      previewSvgData.value = svg
      previewSvgShow.value = true
    } catch (error) {
      Util.Message.error('预览失败，请重试')
      console.error(error)
    }
  }
</script>

<style scoped lang="scss">
  .toolbar {
    .el-button-group {
      background: rgb(247, 247, 248);
      border: solid 1px rgb(185, 188, 198);
      border-radius: 2px;
      padding: 4px;
    }

    .el-button {
      border-radius: 0;
      border: none;
      background: rgb(247, 247, 248);
      box-sizing: border-box;
    }
  }
</style>
```

#### translate.js

```javascript
import zh from './zh'

export default function (template, replacements) {
  replacements = replacements || {}
  template = (zh)[template] || template
  return template.replace(/{([^}]+)}/g, function (_, key) {
    return replacements[key] || '{' + key + '}'
  })
}
```

#### initDiagramXML.js 和 zh.js

initDiagramXML.js 就是一个空白xml字符串

zh.js 就是一个汉化json

不贴了

## 自定义配置面板

官方提供了[api](https://github.com/bpmn-io/bpmn-js-properties-panel#bpmnpropertiespanelrendererregisterproviderpriority-number-provider-propertiesprovider--void)修改groups

下面是之前的一个例子

```javascript
// import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory'


import CustomSelect from '@/views/extension/CustomSelect'

class ExamplePropertiesProvider {
  constructor (propertiesPanel) {
    propertiesPanel.registerProvider(500, this)
  }

  getGroups (element) {
    return (groups) => {
      for (const group of groups) {
        if (group.id === 'CamundaPlatform__Form') {
          group.entries = [
            CustomSelect(element)
          ]
        }
      }
      // add, modify or remove groups
      // ...
      return groups
    }
  }
}

ExamplePropertiesProvider.$inject = ['propertiesPanel', 'translate']
export default ExamplePropertiesProvider
```

CustomSelect.js

```javascript
import { SelectEntry, isSelectEntryEdited } from '@bpmn-io/properties-panel'
import { useService } from 'bpmn-js-properties-panel'

export default function (element) {
  return {
    id: 'CustomSelect',
    element,
    component: CustomSelectComponent,
    isEdited: isSelectEntryEdited
  }
}

function CustomSelectComponent (props) {
  const { element, id } = props
  const modeling = useService('modeling')
  const translate = useService('translate')
  const debounce = useService('debounceInput')

  const getValue = () => {
    return element.businessObject.spell || ''
  }

  const setValue = value => {
    return modeling.updateProperties(element, {
      spell: value
    })
  }

  const getOptions = () => {
    return [{
      value: '',
      label: translate('<none>')
    }, {
      value: 'formRef',
      label: translate('111')
    }, {
      value: 'formKey',
      label: translate('222')
    }, {
      value: 'formData',
      label: translate('333')
    }, {
      value: 'formData222',
      label: translate('444')
    }]
  }

  return SelectEntry({
    id,
    element,
    description: translate('a CustomSelect'),
    label: translate('CustomSelect'),
    getValue,
    setValue,
    getOptions,
    debounce
  })
}

```
