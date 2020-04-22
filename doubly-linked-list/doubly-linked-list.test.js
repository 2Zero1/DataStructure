class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    isEmpty() {
        return this.head == null ? true : false;
    }

    append(value) {
        if (!this.tail) {
            this.head = new Node(value);
            this.tail = this.head;
        }
        else {
            this.tail.next = new Node(value);
            this.tail.next.prev= this.tail;
            this.tail = this.tail.next;
        }

        this.count = this.count + 1;
    }

    prepend(value) {
        if(!this.head) {
            this.head = new Node(value);
            this.tail = this.head;
            return
        }
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        
        this.count = this.count + 1;
    }

    size() {
        return this.count;
    }

    find(value) {
        let currentNode = this.head;
        do {
            if (currentNode.value === value) {
                return true;
            }
            currentNode = currentNode.next
        } while (currentNode !== null)

        return false;
    }

    getHead() {
        return this.head == null ? null : this.head.value;
    }

    getTail() {
        return this.tail && this.tail.value;
    }

    remove(value) {
        let currentNode = this.head;

        if (!this.head) {
            return;
        }
        if (this.head.value === value) {
            this.head = this.head.next;

            this.count = this.count-1;
            return;
        }

        while (currentNode.next.value !== value) {
            currentNode = currentNode.next;
            if(!currentNode.next) {
                return;
            }
        }
        currentNode.next = currentNode.next.next;
        this.count = this.count-1;
    }

    toArray() {
        let currentNode = this.head;
        let array =[];
        do {
            array.push(currentNode.value);
            currentNode = currentNode.next
        } while (currentNode !== null)

        return array;
    }

    toReverseArray() {
        let currentNode = this.tail;
        let array =[];
        do {
            array.push(currentNode.value);
            currentNode = currentNode.prev
        } while (currentNode !== null)

        return array;
    }

}

test('DoublyLinkedList', () => {
    const list = new DoublyLinkedList();

    expect(list.isEmpty()).toBe(true);

    list.append(1);
    expect(list.getHead()).toBe(1);
    expect(list.getTail()).toBe(1);



    list.append(2);
    expect(list.getTail()).toBe(2);
    
    list.append(3);
    expect(list.getTail()).toBe(3);

    list.prepend(0);
    expect(list.getHead()).toBe(0);



    const list2 = new DoublyLinkedList();
    expect(list2.getHead()).toBe(null);
    list2.remove(2);

    list.remove(0);
    expect(list.find(0)).toBe(false);
    list.remove(0);

    expect(list.size()).toBe(3);

    expect(list.toArray()).toEqual([1,2,3]);

    expect(list.toReverseArray()).toEqual([3,2,1]);
    list.append(4);
    expect(list.toReverseArray()).toEqual([4,3,2,1]);

    list.prepend(0);
    expect(list.toReverseArray()).toEqual([4,3,2,1,0]);

    const list3 = new DoublyLinkedList();
    list3.prepend(0);

});