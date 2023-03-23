const { createApp } = Vue
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";


createApp({
  data() {
    return {
      events: [],
      checked: [],
      valueSearch: '', 
      eventsFilter: [],
      checkedFilter: []

     

    }
  },
  created() {
    fetch(urlApi)
      .then(response => response.json())
      .then(data => {
        this.events = data.events
        this.eventsFilter = data.events
      
        this.checkedFilter = [...new Set(this.events.map(category => category.category))]
      }).catch(error => console.log(error))
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
