const noteStorage = require('../../utils/storage')
const regeneratorRuntime = require('../../lib/runtime') // eslint-disable-line


Page({
  data: {
    noteId: ''
  },
  onLoad (options) {
    const noteId = options['noteId']
    if (!noteId) {
      wx.showToast({
        duration: 2000,
        title: '便签参数错误'
      })
      wx.navigateBack()
    }
    this.data.noteId = noteId
    this.initEditorContent()
  },
  async initEditorContent () {
    const contents = noteStorage.getNoteContent(this.data.noteId)
    const editor = await this.getNoteEditor()
    editor.setContents(contents)
  },
  saveEditorContent () {

  },
  async getNoteEditor () {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery().select('#note-editor').context(function (res) {
        resolve(res.context)
      }).exec()
    })
    // const noteEditor = this.selectComponent('#note-editor')
    // console.log(noteEditor)
  },
  async getNoteEditorContent () {
    const editor = await this.getNoteEditor()
    return new Promise((resolve, reject) => {
      editor.getContents({
        success (contents) {
          resolve(contents)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },
  async onInput (event) {
    // const contents = await this.getNoteEditorContent()
    // console.log(contents)
    console.log(event.detail)
    // TODO 保存contents
    noteStorage.setNoteContent(this.data.noteId, event.detail)
  },
  // toolbar部分回调函数
  async onClickBold () {
    const editor = await this.getNoteEditor()
    editor.format('bold')
  },
  async onClickItalic () {
    const editor = await this.getNoteEditor()
    editor.format('italic')
  },
  async onClickUnderline () {
    const editor = await this.getNoteEditor()
    editor.format('underline')
  },
  async onClickStrike () {
    const editor = await this.getNoteEditor()
    editor.format('strike')
  },
  async onClickHeading1 () {
    const editor = await this.getNoteEditor()
    editor.format('header', 'H1')
  },
  async onClickHeading2 () {
    const editor = await this.getNoteEditor()
    editor.format('header', 'H2')
  },
  async onClickHeading3 () {
    const editor = await this.getNoteEditor()
    editor.format('header', 'H3')
  },
  async onClickClear () {
    const editor = await this.getNoteEditor()
    editor.removeFormat()
  }
})
