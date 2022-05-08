
import fs from 'fs'
import crypto from 'crypto'

export default class MainRepository {
  constructor(file) {
    if (!file) {
      throw new Error('New repo needs a filemane')
    }
    this.file = file
    try {
      fs.accessSync(this.file)                // check if file exists
    } catch {
      fs.writeFileSync(this.file, '[]')       // create file
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.file, { encoding: 'utf8' })       // default encoding: null
    )
  }

  async create(attributes) {
    attributes.id = crypto.randomBytes(8).toString('hex')
    
    const items = await this.getAll()
    items.push(attributes)
    await this.writeAll(items)
    return attributes
  }

  async getOne(id) {
    const items = await this.getAll()
    return items.find(item => item.id === id)
  }

  async deleteOne(id) {
    const items = await this.getAll()
    const itemsFiltered = items.filter((item) => item.id != id)
    await this.writeAll(itemsFiltered)
  }

  async update(id, attributes) {
    const items = await this.getAll()
    let item = items.find(item => item.id === id)

    if (!item) throw new Error(`Not found`)

    Object.assign(item, attributes)                 //    add/update attributes to object 'item'
    await this.writeAll(items)
  }

  async getOneBy(filters) {
    const items = await this.getAll();

    for (let item of items) {
      let found = true;
      for (let key in filters) {
        if (item[key] !== filters[key]) found = false;
      }
      if (found) return item
    }
  }

  async writeAll(items) {                         // helper
    await fs.promises.writeFile(this.file, JSON.stringify(items, null, 2))    // 2 spaces indetn in json
  }
}