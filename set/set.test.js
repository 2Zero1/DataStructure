/*
1. 집합 생성
    - 중복 안되는 것에 주의
2. 원소 생성
3. 원소 삭제
4. 집합 원소들 얻기
5. 원소 존재유무
6. 집합의 크기
7. 집합 비교
    - 동일
    - 부분집합
8. 집합 연산.
    - 교집합
    - 합집합
    - 곱집합
    - 차집합
*/
class MySet {
    constructor(...values) {
        this.values = [];
        values.forEach(value => {
            this.add(value);
        });
    }

    getValues() {
        return this.values;
    }

    include(value) {
        return this.values.includes(value);
    }

    add(value) {
        if(!this.include(value)) {
            this.values.push(value);
        }
    }

    size() {
        return this.values.length;
    }

    delete(value) {
        const index = this.values.indexOf(value);
        if(index === -1) {
            return
        }
        this.values.splice(index,1);
    }

    isEqual(set) {
        if(this.size() !== set.size()) {
            return false;
        }
        this.values.sort((a, b) => a - b);
        set.values.sort((a, b) => a - b);

        for(let i = 0; i < this.size(); i++) {
            if(this.values[i] !== set.values[i]) {
                return false;
            }
        }
        return true;
    }

    isSubsetOf(set) {
        if(this.size() == 0 && set.size() == 0) {
            return true;
        }
        if(this.size()==0) {
            return true;
        }
        if(this.size() > set.size()) {
            return false;
        }

        for(let i = 0; i < this.size() && i < set.size(); i++) {
            if (!set.include(this.values[i])) {
                return false;
            }
        }
        return true;

    }
    union(otherSet) {
        const set = new MySet(...otherSet.getValues(),...this.getValues());
        return set;
    }
    intersect(otherSet) {
        return new MySet(...this.getValues().filter(v => otherSet.include(v)));
    } 
    difference(otherSet) {
        const thisSet = new MySet(...this.getValues());
        otherSet.getValues().forEach(v => thisSet.delete(v));
        return new MySet(...thisSet.getValues());
    }

}

describe('set', () => {

    test('Difference', () => {
        const set1 = new MySet();
        const set2 = new MySet();
        expect(set1.difference(set2).getValues()).toEqual([]);
        set1.add(1);
        set1.add(2);
        expect(set1.difference(set2).getValues()).toEqual([1,2]);
        expect(set2.difference(set1).getValues()).toEqual([]);

        set2.add(1);
        expect(set1.difference(set2).getValues()).toEqual([2]);
        expect(set2.difference(set1).getValues()).toEqual([]);
        
        set1.add(3);
        set1.add(4);
        set1.add(5);
        set1.add(6);
        expect(set1.difference(set2).getValues()).toEqual([2,3,4,5,6]);
        expect(set2.difference(set1).getValues()).toEqual([]);


    })
    test('intersection', () => {
        const set1 = new MySet();
        const set2 = new MySet();
        expect(set1.intersect(set2).getValues()).toEqual([]);
        set1.add(1);
        expect(set1.intersect(set2).getValues()).toEqual([]);
        set2.add(1);
        expect(set1.intersect(set2).getValues()).toEqual([1]);
        set1.add(2);
        expect(set1.intersect(set2).getValues()).toEqual([1]);
        expect(set2.intersect(set1).getValues()).toEqual([1]);
        set1.add(3);
        set1.add(4);
        set1.add(5);
        set2.add(2);
        set2.add(3);
        set2.add(7);
        expect(set2.intersect(set1).getValues()).toEqual([1,2,3]);




        // set1.add(2);
        // set1.add(3);
        // set1.add(4);

        // set2.add(1);
        // set2.add(2);
        // set2.add(3);
        // expect(set1.intersect(set2).getValues()).toEqual([1,2,3]);


    })
    test('union', () => {
        const set1 = new MySet();
        const set2 = new MySet();
        expect(set1.union(set2).getValues()).toEqual([]);
        // set1.add(1);
        // set1.add(2);
        // set1.add(3);
        // set1.add(4);
        // expect(set1.union(set2).getValues()).toEqual([1,2,3,4]);
        // set2.add(1);
        // set2.add(2);
        // set2.add(3);
        // expect(set1.union(set2).getValues()).toEqual([1,2,3,4]);

    })

    test('makeSet', () => {
        
        const set = new MySet(1,2,3,4,5);
        expect(set.getValues()).toEqual([1,2,3,4,5]);

        const set1 = new MySet(1,2,3,4,5,2,2,2);
        expect(set1.getValues()).toEqual([1,2,3,4,5]);
    });

    test('add', () => {
        const set = new MySet();

        set.add(1);
        expect(set.include(1)).toBeTruthy();

        set.add(1);
        expect(set.include(1)).toBeTruthy();
        expect(set.size()).toBe(1);
    })

    test('size', () => {
        const set = new MySet();

        set.add(1);
        set.add(1);
        expect(set.size()).toBe(1);
    });

    test('delete', () => {
        const set = new MySet(1,2,3,4,5,2,2,2);
        set.delete(1);

        expect(set.size()).toBe(4);
        set.delete(2);
        expect(set.size()).toBe(3);
        
        expect(set.include(1)).toBeFalsy();
        expect(set.include(2)).toBeFalsy();
    });

    test('is same set', () => {
        const set1 = new MySet();
        const set2 = new MySet();

        expect(set1.isEqual(set2)).toBeTruthy();
        
        set1.add(3);
        expect(set1.isEqual(set2)).toBeFalsy();

        set2.add(2);
        expect(set1.isEqual(set2)).toBeFalsy();

        set1.add(2);
        set2.add(3);
        expect(set1.isEqual(set2)).toBeTruthy();
    });

    test('is Subset', () => {
        const set1 = new MySet();
        const set2 = new MySet();

        expect(set1.isSubsetOf(set2)).toBeTruthy();

        set2.add(3);
        expect(set1.isSubsetOf(set2)).toBeTruthy();

        expect(set2.isSubsetOf(set1)).toBeFalsy();

        set1.add(1);
        set1.add(2);
        set1.add(3);
        set1.add(4);
        set1.add(5);
        expect(set1.isSubsetOf(set2)).toBeFalsy();  
        expect(set2.isSubsetOf(set1)).toBeTruthy();

        set2.add(1);
        set2.add(2);
        expect(set2.isSubsetOf(set1)).toBeTruthy();
        set2.add(4);
        set2.add(5);
        expect(set2.isSubsetOf(set1)).toBeTruthy();
        expect(set1.isSubsetOf(set2)).toBeTruthy();

    });
});