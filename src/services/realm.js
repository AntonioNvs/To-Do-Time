import Realm from 'realm'

import ToDo from '../schemas/ToDo'

export default function getRealm() {
  return Realm.open({
    schema: [ToDo],
  })
}