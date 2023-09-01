import {useQueryRealm, useRealm} from '@database';
import {Realm} from '@realm/react';

export class ObjectId extends Realm.BSON.ObjectID {}

export function makeId() {
  return new Realm.BSON.ObjectID();
}

export function useDatabase() {
  const realm = useRealm();

  function create<QueryData extends Pick<OmittedRealmTypes<QueryData>, never>>(
    queryKey: string,
    data: QueryData,
  ) {
    realm.write(() => {
      realm.create<QueryData>(queryKey, data);
    });
  }

  function edit<QueryData extends Pick<OmittedRealmTypes<QueryData>, never>>(
    queryKey: string,
    data: QueryData,
  ) {
    realm.write(() => {
      realm.create<QueryData>(queryKey, data, Realm.UpdateMode.Modified);
    });
  }

  function deleteItem(object: any) {
    realm.write(() => {
      realm.delete(object);
    });
  }

  return {
    create,
    edit,
    deleteItem,
  };
}

type ResponseQuery<T> = Realm.Results<T & Realm.Object<unknown, never>>;

type Query<Object> =
  | string
  | ((new (...args: any) => Object) & Realm.ObjectClass<any>);

export function useGetQuery<Object>(
  query: Query<Object>,
): ResponseQuery<Object> {
  return useQueryRealm(query);
}
