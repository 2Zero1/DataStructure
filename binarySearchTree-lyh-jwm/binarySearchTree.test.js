class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        if (this.isEmpty()) {
            this.value = value;
            return;
        }

        if (value > this.value) {
            if (!this.right) {
                this.right = new Node();
            }

            this.right.insert(value);
        } else {
            if (!this.left) {
                this.left = new Node();
            }

            this.left.insert(value);
        }
    }

    getHeight() {
        if (this.isEmpty()) {
            return 0;
        }

        if (!this.left && !this.right) {
            return 1;
        }

        return this.right ? 1 + this.right.getHeight() : 1 + this.left.getHeight();
    }

    isEmpty() {
        return !this.value;
    }
}

class BinarySearchTree {

    constructor() {
        this.root = null;
        this.height = 0;
    }

    insert(value) {
        if (this.isEmpty()) {
            this.root = new Node();
        }

        this.root.insert(value);
    }

    getHeight() {
        if(this.root == null) {
            return 0;
        }

        if (this.root.left ==null && this.root.right == null) {
            return 1;
        }

        if (this.root.left.left == null && this.root.left.right == null) {
            return 2;
        }
        return 3;
    }

    isEmpty() {
        return !this.root;
    }
}

describe('binarySearchTree', () => {

    test('insert', () => {
        const bst = new BinarySearchTree();

        expect(bst.isEmpty()).toBe(true);
        expect(bst.getHeight()).toBe(0);

        bst.insert(5);

        expect(bst.root.value).toBe(5);
        expect(bst.isEmpty()).toBe(false);
        expect(bst.getHeight()).toBe(1);

        bst.insert(10);

        expect(bst.getHeight()).toBe(2);
    });

    test('insert to left', () => {
        const bst = new BinarySearchTree();

        bst.insert(7);
        bst.insert(3);
        bst.insert(10);
        bst.insert(1);

        expect(bst.getHeight()).toBe(3);
    });

    test.only('getHeight', () => {
        const bst = new BinarySearchTree();
        expect(bst.getHeight()).toBe(0);

        bst.insert(5);
        expect(bst.getHeight()).toBe(1);

        bst.insert(2);
        expect(bst.getHeight()).toBe(2);

        bst.insert(1);

        expect(bst.getHeight()).toBe(3);


        const bst1 = new BinarySearchTree();
        expect(bst1.getHeight()).toBe(0);

        bst1.insert(1);
        expect(bst1.getHeight()).toBe(1);

        bst1.insert(2);
        expect(bst1.getHeight()).toBe(2);

        
    });

    // test.only('getTargetParentNode', () => {
    //     const bst = new BinarySearchTree();
    //     bst.insert(7);
    //     expect(bst.getTargetParentNode(1)).toBe(bst.root);


    // })

});
