/*
1. HashTable 만들고, bucket의 크기를 생성자로 받아 생성한다.
2. HashFunction을 만든다.
3. set()을 만든다.
    - List 생성
    - (key,value)를 추가
4. get()
5. update.
6. delete
7. getkeys
8. has
*/

class HashTable {
    constructor(size) {
        this.size = size;
        this.buckets = Array(size).fill([]);
    }

    hash(key) {
        return key.split('').reduce(
            (acc,cur) => cur.charCodeAt(0) + acc, 0) % this.size;
    }

    set(key, value) {
        const index = this.hash(key);
        const entry = this.buckets[index].find((v) => v.key == key);

        if(entry != null) {
            this.buckets[index].splice(this.buckets[index].findIndex((v) => key == v.key), 1);
        }
        
        this.buckets[this.hash(key)].push({'key':key, 'value':value});
    }

    has(key) {
        const index = this.hash(key);
        
        if (!this.buckets[index] ){
            return false;
        }

        return !!this.buckets[index].find((v) => v.key == key);
    }

    get(key) {
        const index = this.hash(key);
        const entry = this.buckets[index].find((v) => v.key == key);
        return entry.value;
    }

    delete(key) {
        const index = this.hash(key);

        this.buckets[index].splice(this.buckets[index].findIndex((v) => key == v.key), 1);        
    }
}

describe('HashTable', () => {
    test('Make HashTable', () => {
        const hashTable = new HashTable(3);

        expect(hashTable.size).toBe(3);
    });

    test('hash Key with each characters ascii code', () => {
        const hashTable = new HashTable(3);
        expect(hashTable.hash('a')).toBe('a'.charCodeAt(0) % hashTable.size);
        expect(hashTable.hash('ab')).toBe(('a'.charCodeAt(0) + 'b'.charCodeAt(0)) % hashTable.size);
    });

    test('set method', () => {
        const hashTable = new HashTable(3);

        hashTable.set('a', 10);
        expect(hashTable.has('a')).toBeTruthy();

        hashTable.set('d', 11);
        expect(hashTable.get('a')).toBe(10);

        hashTable.set('a', 12);
        expect(hashTable.get('a')).toBe(12);



    });

    test('has method', () => {
        const hashTable = new HashTable(3);
        hashTable.set('a', 10);
        
        expect(hashTable.has('a')).toBeTruthy();
        expect(hashTable.has('b')).toBeFalsy();
    });

    test('get method', () => {
        const hashTable = new HashTable(3);

        hashTable.set('a', 10);
        expect(hashTable.get('a')).toBe(10);

        hashTable.set('d', 11);
        expect(hashTable.get('d')).toBe(11);
        
        hashTable.set('b', 200);
        expect(hashTable.get('b')).toBe(200);

         hashTable.set('1', 200);
        expect(hashTable.get('1')).toBe(200);

        hashTable.set('basdf', 300);
        expect(hashTable.get('basdf')).toBe(300);

        hashTable.set('123sbasa2sa2123sdf', 20300);
        expect(hashTable.get('123sbasa2sa2123sdf')).toBe(20300);

    });

    test('delete method', () => {
        const hashTable = new HashTable(3);

        hashTable.set('이영한', 10);
        expect(hashTable.get('이영한')).toBe(10);

        hashTable.delete('이영한');
        expect(hashTable.has('이영한')).toBeFalsy();
        
        hashTable.set('전우민', 10);
        expect(hashTable.get('전우민')).toBe(10);
        
        hashTable.delete('전우민');
        expect(hashTable.has('전우민')).toBeFalsy();

    });
});
