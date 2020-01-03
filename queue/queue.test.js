/*
- 두개의 스택을 이용하여 queue를 구현한다.
    - 첫번째 스택은 enqueue를 하기 위한 스택
    - 두번째 스택은 dequeue를 하기 위한 스택
- enqueue를 할 경우
        - 첫번째 스택에 enqueue를 하고
- dequeue를 할 경우
        - 첫번째 스택의 값을 모두 pop 하여 두번째 스택에 넣는다.
        - 다 옮겼다면, 첫번째스택에 가장 맨 처음에 넣었던 값이 두번째 스택에선 가장 마지막에 들어오고 top에 위치할 것이다.
        - 두번째 스택의 값을 pop하여 값을 반환하고,
        - 두번째 스택에 있던 모든 값들을 다시 pop하여 첫번째 스택으로 옮긴다.
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

class Queue {
    constructor() {
        this.enqueueStack = new Stack();
        this.dequeueStack = new Stack();
    }
    isEmpty() {
        return this.enqueueStack.isEmpty();
    }
    pick() {
        if (this.isEmpty == true) {
            return null;
        } else { 
            this.setDequeueMode();
            const result = this.dequeueStack.pick();
            this.setEnqueueMode();
            return result;
        }
    }

    enqueue(value) {
        this.enqueueStack.push(value);
        
    }
    dequeue() {
        this.setDequeueMode();
        const result = this.dequeueStack.pop();
        this.setEnqueueMode();
        return result;
    }

    getSize() {
        return this.enqueueStack.getSize();
    }

    setDequeueMode() {
        while (this.enqueueStack.isEmpty() == false) {
            this.dequeueStack.push(this.enqueueStack.pop());
        }
    }
    setEnqueueMode() {
        while (this.dequeueStack.isEmpty() == false) {
            this.enqueueStack.push(this.dequeueStack.pop());
        }
    }
}

describe('Queue', () => {

    it('Should Create Empty Queue', () => {
        const queue = new Queue();
        expect(queue).not.toBeNull();
        expect(queue.isEmpty()).toBe(true);
    });

    it('Should Give The Element At The Front Of Queue Without Removing', () => {
        const queue = new Queue();
        queue.enqueueStack.push(1);
        expect(queue.pick()).toBe(1);
        queue.enqueueStack.push(2);
        expect(queue.pick()).toBe(1);
        expect(queue.getSize()).toBe(2);
    })

    it('Should Put Element At The Behind Of Queue', () => {
        const queue = new Queue();
        queue.enqueue(1);
        expect(queue.pick()).toBe(1);
        queue.enqueue(2);
        expect(queue.pick()).toBe(1);
    })

    it('Should Return Element At The Front Of Queue And Remove', () => {
        const queue = new Queue();
        queue.enqueue(1);
        expect(queue.pick()).toBe(1);
        expect(queue.dequeue()).toBe(1);
        expect(queue.getSize()).toBe(0);

        const queue1 = new Queue();
        queue1.enqueue(1);
        queue1.enqueue(2);
        queue1.enqueue(3);
        queue1.enqueue(4);
        expect(queue1.getSize()).toBe(4);
        expect(queue1.pick()).toBe(1);
        expect(queue1.dequeue()).toBe(1);
        expect(queue1.dequeue()).toBe(2);
        expect(queue1.dequeue()).toBe(3);
        expect(queue1.dequeue()).toBe(4);
        expect(queue1.getSize()).toBe(0);


        const queue2 = new Queue();
        queue2.enqueue(4);
        queue2.enqueue(3);
        expect(queue2.dequeue()).toBe(4);
        queue2.enqueue(2);
        expect(queue2.dequeue()).toBe(3);
        expect(queue2.dequeue()).toBe(2);
    })
});