const tagConfigManager = require('./tag-config-manager')
const allTagList = require('./all-tags')

const app = getApp()

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
    this.updateTagList(selectedTagList)
  },
  updateTagList(selectedTagList) {
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
  },
  onRemoveTag(event) {
    const tagIndex = event.currentTarget.dataset['tagIndex']
    this.data.selectedTagList.splice(tagIndex, 1)
    this.updateTagList(this.data.selectedTagList)
  },
  onAddTag(event) {
    const tagIndex = event.currentTarget.dataset['tagIndex']
    const newTag = this.data.unselectedTagList[tagIndex]
    this.data.selectedTagList.push(newTag)
    this.updateTagList(this.data.selectedTagList)
  },
  saveSetting(){
    tagConfigManager.setSelectedTagList(this.data.selectedTagList)
    wx.navigateBack()
  }
})
