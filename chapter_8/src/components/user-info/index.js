Component({
  properties: {
    nickName: {
      type: String,
      value: ''
    },
    avatarUrl: {
      type: String,
      value: ''
    },
    userId: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {
    onClick() {
      this.triggerEvent('click', this.data.userId)
    },
  }
});
