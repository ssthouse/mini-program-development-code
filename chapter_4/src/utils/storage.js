const NOTE_ID_LIST = 'noteList'
const NOTE_CONTENT_PREFIX = 'noteContent'

function getNoteIdList () {
  return wx.getStorageSync(NOTE_ID_LIST) || []
}

function getNoteList(){
  const noteIdList = getNoteIdList()
  const noteList = []
  for (let noteId of noteIdList) {
    noteList.push({
      id: noteId,
      content: getNoteContent(noteId)
    })
  }
  return noteList
}

function setNoteIdList (noteIdList) {
  wx.setStorage({
    key: NOTE_ID_LIST,
    data: noteIdList || []
  })
}

function getNoteContent (noteId) {
  wx.getStorageSync(NOTE_CONTENT_PREFIX + noteId)
}

function setNoteContent (noteId, content) {
  wx.setStorageSync(NOTE_CONTENT_PREFIX + noteId, content)
}

function createNote () {
  const newNoteId = Date.now()
  const noteIdList = getNoteIdList()
  noteIdList.push(newNoteId)
  setNoteIdList(noteIdList)
  setNoteContent(newNoteId, '')
  return newNoteId
}

module.exports = {
  getNoteIdList,
  getNoteList,
  getNoteContent,
  createNote
}
