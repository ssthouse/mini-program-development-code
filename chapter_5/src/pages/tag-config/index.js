const app = getApp()

const tagConfigManager = require('./tag-config-manager')

const allTagList = [
  {
    key: 'top',
    title: '头条'
  }, {
    key: 'shehui',
    title: '社会'
  }, {
    key: 'guonei',
    title: '国内'
  }, {
    key: 'guoji',
    title: '国际'
  },
  {
    key: 'yule',
    title: '娱乐'
  },
  {
    key: 'tiyu',
    title: '体育'
  },
  {
    key: 'junshi',
    title: '军事'
  },
  {
    key: 'keji',
    title: '科技'
  },
  {
    key: 'caijing',
    title: '财经'
  },
  {
    key: 'shishang',
    title: '时尚'
  }
]

Page({
  data: {
    selectedTagList: [],
    unselectedTagList: []
  },
  onLoad(options) {
    // 加载之前的配置信息
    this.loadTagConfig()
  },
  loadTagConfig() {
    const selectedTagList = tagConfigManager.getSelectedTagList()

    const selectedKeySet = selectedTagList.map(selectedTag => {
      return selectedTag.key
    }).reduce((accumulator, curTagKey) => {
      return accumulator.add(curTagKey)
    }, new Set())
    const unselectedTagList = []
    for (let tagItem of allTagList) {
      if (selectedKeySet.has(tagItem.key)) continue
      unselectedTagList.push(tagItem)
    }

    this.setData({
      selectedTagList,
      unselectedTagList
    })
  }
})
