Component({
  properties: {},
  data: {
    dateNumber: 0,
  },
  methods: {},
  lifetimes:{
    attached() {
      const today = new Date()
      this.setData({
        dateNumber: today.getDate()
      })
    }
  }
})
