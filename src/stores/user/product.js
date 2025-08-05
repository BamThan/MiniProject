import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [{
      name: 'Flower 1',
      imageUrl: 'https://i.pinimg.com/1200x/a3/6e/b2/a36eb2c43ca110c714c37a94d5309480.jpg',
      quantity: 10,
      about: 'cuteeee',
      status: 'open',
      price: 100,
    },
    {
      name: 'Flower 2',
      imageUrl: 'https://i.pinimg.com/736x/09/5d/d0/095dd0fcd44744bc644f4c12dc484aa8.jpg',
      quantity: 10,
      about: 'gooddd',
      status: 'open',
      price: 200,
    }],
  }),
  actions: {
    filterProducts (searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    }
  }
})
