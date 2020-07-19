export default class ToDo {
  static schema = {
    name: 'ToDo',
    properties: {
      title: 'string',
      dateInitial: 'string',
      dateEnd: 'string',
      seconds: 'int'
    }
  }
}