/*
    - 1을 push 할 때 가장 상단에 1이 존재한다.
    - 1,2,3을 push 할 때 가장 상단에 3이 존재한다.
    - 1 을 push 하고 pop 할 경우, 1이 반환되고, stack의 크기는 0이된다.
    - 1,2,3을 push 하고, 3번 팝할 경우 3,2,1 의 순서대로 반환하고, 각 크기를 확인한다.
*/

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

class Stack {
    constructor() {
        this.list = new DoubleLinkedList();
    }
    isEmpty() {
        return this.list.getHead() == null ? true : false;
    }

    push(value) {
        this.list.prepend(value);
    }

    pick() {
        return this.list.getHead();
    }

    getSize() {
        return this.list.getSize();
    }

    pop() {
        const result = this.list.getHead();
        this.list.deleteHead();
        return result;
    }
}



describe('Stack', () => {

    it('should create empty stack', () => {
        const stack = new Stack();
        expect(stack).not.toBeNull()
        expect(stack.isEmpty()).toBe(true);
    })

    it('should add new item at the top of the stack', () => {
        const stack1 = new Stack();
        stack1.push(1);
        expect(stack1.pick()).toBe(1);
        const stack2 = new Stack();
        stack2.push(1);
        stack2.push(2);
        stack2.push(3);
        expect(stack2.pick()).toBe(3);

    })

    it('should give stack\'s item count', () => {
        const stack1 = new Stack();
        stack1.push(1);
        expect(stack1.getSize()).toBe(1);
        stack1.push(1);
        stack1.push(1);
        expect(stack1.getSize()).toBe(3);
    })

    it('should return and remove the top item of stack', () => {
        const stack1 = new Stack();
        stack1.push(1);
        expect(stack1.pop()).toBe(1);
        expect(stack1.getSize()).toBe(0);

        const stack2 = new Stack();
        stack2.push(1);
        stack2.push(2);
        stack2.push(3);
        stack2.push(4);
        stack2.push(5);
        expect(stack2.getSize()).toBe(5);
        expect(stack2.pop()).toBe(5);
        expect(stack2.pop()).toBe(4);
        expect(stack2.getSize()).toBe(3);
        expect(stack2.pop()).toBe(3);
        expect(stack2.pop()).toBe(2);
        expect(stack2.pop()).toBe(1);
        expect(stack2.getSize()).toBe(0);
        expect(stack2.pop()).toBe(null);
    })
});