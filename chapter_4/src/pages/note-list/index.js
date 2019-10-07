//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    noteList: [
      {
        id: 'note1',
        content: 'note1'
      },
      {
        id: 'note2',
        content: 'note2'
      },
      {
        id: 'note3',
        content: 'note3'
      }
    ]
  },
  onCreateNote () {
    wx.navigateTo({
      url: `/pages/note/index?create=true`
    })
  },
  onClickNote (event) {
    const noteId = event.currentTarget.dataset['noteId']
    wx.navigateTo({
      url: `/pages/note/index?noteId=${noteId}`
    })
  }
})
