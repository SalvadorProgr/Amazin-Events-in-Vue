const { createApp } = Vue
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";


createApp({
  data() {
    return {
      events: undefined,
      categories: undefined,
      eventsFilter: [],
      valueSearch: '',
      checked: [],
      currentDate: ''
    }
  },
  created() {
    fetch(urlApi)
      .then(response => response.json())
      .then(data => {
        this.currentDate = Date.parse(data.currentDate)
        this.events = data.events.filter(element => Date.parse(element.date) > this.currentDate)
        this.eventsFilter = this.events
        this.categories = [... new Set(this.events.map(event => event.category))]
        console.log(this.categories)
      })
      .catch(err => console.log(err))
  },
  methods: {
    filter() {
      this.eventsFilter = this.events.filter(event => {
        return (this.checked.includes(event.category) || this.checked.length === 0) &&
          event.name.toLowerCase().includes(this.valueSearch.toLowerCase())
      })

    }
  }

}).mount('#app')