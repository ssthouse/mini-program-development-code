Component({
  properties: {},
  data: {
    tabList: [
      {
        id: 'recommend',
        title: '个性推荐',
      },
      {
        id: 'playlist',
        title: '歌单',
      },
      {
        id: 'radio',
        title: '主播电台',
      },
      {
        id: 'ranking',
        title: '排行榜',
      }
    ],
    activeTabId: 'recommend'
  },
  methods: {
    onClickSearch() {
      this.triggerEvent('search')
    },
    onClickTab(event) {
      const tabItem = event.currentTarget.dataset['tab']
      this.setData({
        activeTabId: tabItem.id
      })
      this.triggerEvent('change-tab', tabItem.id)
    }
  }
});
