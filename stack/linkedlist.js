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
export default class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    isEmpty() {
        return this.head == null;
    }
    getFirst() {
        return this.head == null ? null : this.head.getValue();
    }
    getLast() {
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
                if(tmp.prev == null && tmp.next == null){
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
                return;
            }
            // 이동
            tmp = tmp.next;
        }
    }
    deleteHead() {
        if(this.head != null){
        this.head = this.head.next
        if(this.head==null){
            this.tail = null;
        }
        }
    }
    deleteTail() {
        if(this.tail!=null){
            if(this.tail == this.head) {
                this.tail = null;
                this.head = null;
            }else{
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
            
        }
    }

}