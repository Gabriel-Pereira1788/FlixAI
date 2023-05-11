import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  static async get<T>(key: string): Promise<T> {
    console.log('get');
    const dataUser: T = JSON.parse((await AsyncStorage.getItem(key)) as string);
    return dataUser;
  }

  static async set<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static async remove(key: string) {
    await AsyncStorage.removeItem(key);
  }
}
