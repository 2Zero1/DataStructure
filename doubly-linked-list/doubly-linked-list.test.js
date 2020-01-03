class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
        
    }
    getValue() {
        return this.value;
    }
}
class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    isEmpty() {
        return this.head == null;
    }
    getHead() {
        return this.head == null ? null : this.head.getValue();
    }
    getTail() {
        return this.tail == null ? null : this.tail.getValue();
    }

    prepend(value) {
        if (this.head == null && this.tail == null) {
            const node = new Node(value);
            this.head = node;
            this.tail = node;
        } else {
            const newNode = new Node(value);
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    append(value) {
        if (this.head == null && this.tail == null) {
            const node = new Node(value);
            this.head = node;
            this.tail = node;
        } else {
            const newNode = new Node(value);
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode
        }
        this.size++;
    }

    contain(value) {
        let tmp = this.head;
        while (tmp != null) {
            if (tmp.value === value) return true;
            tmp = tmp.next;
        }
        return false;
    }

    delete(value) {
        let tmp = this.head;
        while (tmp != null) {
            if (tmp.value === value) {
                if (tmp.prev == null && tmp.next == null) {
                    this.head = null;
                    this.tail = null;
                } else if (tmp.prev == null) {
                    this.head = tmp.next;
                    this.head.prev = null;
                } else if (tmp.next == null) {
                    tmp.prev.next = null;
                    this.tail = tmp.prev;
                } else {
                    tmp.prev.next = tmp.next
                    tmp.next = null
                }
                this.size--;
                return;
            }
            // 이동
            tmp = tmp.next;
        }
    }

    deleteHead() {
        if (this.head != null) {
            this.head = this.head.next
            this.size--;
            if (this.head == null) {
                this.tail = null;
            }
        }
    }

    deleteTail() {
        if (this.tail != null) {
            if (this.tail == this.head) {
                this.tail = null;
                this.head = null;
            } else {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
            this.size--;
        }
    }

    getSize() {
        return this.size;
    }
}

describe('DoublyLinkedList', () => {
    it('should create empty linked list', () => {
        const list = new DoubleLinkedList();
        expect(list).not.toBeNull();
        expect(list.isEmpty()).toBe(true);
    })

    it('should give first node', () => {
        const list = new DoubleLinkedList();
        list.head = new Node(1)
        expect(list.getHead()).toBe(1);
        list.head = new Node(2)
        expect(list.getHead()).toBe(2);
    })

    it('should give last node', () => {
        const list = new DoubleLinkedList();
        list.prepend(1);
        expect(list.getTail()).toBe(1);
        expect(list.getSize()).toBe(1);
        list.prepend(2);
        expect(list.getTail()).toBe(1);
        expect(list.getSize()).toBe(2);
    })

    it('should prepend node to linked list', () => {
        const list = new DoubleLinkedList();
        list.prepend(1);
        expect(list.getHead()).toBe(1);
        expect(list.getSize()).toBe(1);
        list.prepend(2);
        expect(list.getHead()).toBe(2);
        expect(list.getSize()).toBe(2);
        list.prepend(3);
        expect(list.getHead()).toBe(3);
        expect(list.getSize()).toBe(3);

    })

    it('should append node to linked list', () => {
        const list = new DoubleLinkedList();
        list.append(1);
        expect(list.getTail()).toBe(1);
        list.append(2);
        expect(list.getTail()).toBe(2);
        list.append(3);
        expect(list.getTail()).toBe(3);
    })

    it('should find node by value', () => {
        const list = new DoubleLinkedList();
        expect(list.contain(1)).toBe(false);
        list.prepend(1);
        expect(list.contain(1)).toBe(true);
        list.prepend(2);
        expect(list.contain(2)).toBe(true);
        list.prepend(3);
        expect(list.contain(3)).toBe(true);
        list.append(4);
        expect(list.contain(4)).toBe(true);
        list.append(5);
        expect(list.contain(5)).toBe(true);
    })

    it('should delete node by value', () => {

        const list = new DoubleLinkedList();
        list.prepend(1);
        list.delete(1);
        expect(list.getHead()).toBe(null);
        expect(list.getTail()).toBe(null);
        expect(list.getSize()).toBe(0);

        list.prepend(1);
        list.prepend(2);
        list.delete(1);
        expect(list.getHead()).toBe(2);
        expect(list.getTail()).toBe(2);
        expect(list.getSize()).toBe(1);
        list.delete(2);
        expect(list.getSize()).toBe(0);

        list.prepend(1);
        list.prepend(2);
        list.delete(2);
        expect(list.getHead()).toBe(1);
        expect(list.getTail()).toBe(1);
        list.delete(1);

        list.prepend(1);
        list.prepend(2);
        list.prepend(3);
        expect(list.getSize()).toBe(3);
        list.delete(2);
        expect(list.head.value).toBe(3);
        expect(list.head.next.value).toBe(1);
        expect(list.getSize()).toBe(2);

    })

    it('should delete linked list head', () => {

        const list1 = new DoubleLinkedList();
        list1.deleteHead();
        expect(list1.getHead()).toBe(null);
        expect(list1.getTail()).toBe(null);

        const list2 = new DoubleLinkedList();
        list2.prepend(1);
        list2.deleteHead();
        expect(list2.head).toBe(null);
        list2.prepend(1);
        list2.prepend(2);
        list2.deleteHead();
        expect(list2.head.value).toBe(1);

        const list3 = new DoubleLinkedList();
        list3.prepend(1);
        list3.prepend(2);
        list3.prepend(3);
        expect(list3.getSize()).toBe(3);
        expect(list3.head.value).toBe(3);
        expect(list3.head.next.value).toBe(2);
        expect(list3.head.next.next.value).toBe(1);
        list3.deleteHead();
        expect(list3.getSize()).toBe(2);
        expect(list3.head.value).toBe(2);
        expect(list3.head.next.value).toBe(1);
        list3.deleteHead();
        expect(list3.head.value).toBe(1);
        expect(list3.getSize()).toBe(1);

    })

    it('should delete linked list last', () => {

        const list1 = new DoubleLinkedList();
        list1.deleteTail();
        expect(list1.getHead()).toBe(null);
        expect(list1.getTail()).toBe(null);

        const list2 = new DoubleLinkedList();
        list2.prepend(1);
        list2.deleteTail();
        expect(list2.head).toBe(null);
        list2.prepend(1);
        list2.prepend(2);
        list2.deleteTail();
        expect(list2.head.value).toBe(2);
        expect(list2.tail.value).toBe(2);
        list2.deleteTail();
        expect(list2.head).toBe(null);
        expect(list2.tail).toBe(null);

        const list3 = new DoubleLinkedList();
        list3.append(1);
        list3.append(2);
        list3.append(3);
        expect(list3.tail.value).toBe(3);
        expect(list3.tail.prev.value).toBe(2);
        expect(list3.tail.prev.prev.value).toBe(1);
        list3.deleteTail();
        expect(list3.tail.value).toBe(2);
        list3.deleteHead();
        expect(list3.tail.value).toBe(2);

    })

});