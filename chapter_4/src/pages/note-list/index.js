//index.js
//获取应用实例
const app = getApp()
const noteStorage = require('../../utils/storage')

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
  onShow () {
    this.loadNoteList()
  },
  loadNoteList () {
    const noteList = noteStorage.getNoteList()
    this.setData({
      noteList
    })
  },
  onCreateNote () {
    const newNoteId = noteStorage.createNote()
    wx.navigateTo({
      url: `/pages/note/index?noteId=${newNoteId}`
    })
  },
  onClickNote (event) {
    const noteId = event.currentTarget.dataset['noteId']
    wx.navigateTo({
      url: `/pages/note/index?noteId=${noteId}`
    })
  }
})
