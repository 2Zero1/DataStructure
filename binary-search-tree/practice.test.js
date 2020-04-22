
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root == null) {
            this.root = newNode;
        } else{
            let currentRoot = this.root;

            while (true) {
                if (currentRoot.value > value) {
                    if (currentRoot.left != null) {
                        currentRoot = currentRoot.left;
                    }else{
                        currentRoot.left = newNode;
                        break;
                    }
                } else if (currentRoot.value < value){ 
                    if(currentRoot.right != null) {
                        currentRoot = currentRoot.right;
                    }else{
                        currentRoot.right = newNode;
                        break;
                    }
                } else if (currentRoot.value === value){
                    break;
                }
            }
        }
    }

    delete(value) {

        const findMin = (root) => {
            while (root.left) {
                root = root.left;
            }
            return root;
        }
        
        const deleteRecursively = (root, value) => {
            if (root === null) {
                return null;
            } else if ( value < root.value) {
                root.left = deleteRecursively(root.left, value);
            } else if( value > root.value) {
                root.right = this.deleteRecursively(root.right, value);
            } else {
                if(root.left == null && root.right == null) {
                    return null;
                } else if (root.left === null) {
                    root = root.right;
                    return root;
                } else if(root.right === null) {
                    root = root.left;
                    return root;
                } else {
                    let tmp = findMin(root.right);
                    root.value = tmp.value;
                    root.right = deleteRecursively(root.right, tmp.value);
                    return root;
                }
            }
            return root;
        }

        // console.log(value);
         
        this.root = deleteRecursively(this.root, value);

    };
    

    toString(root = this.root) {
        if (root === null) return "";

        let result = '';
        if (root.right == null && root.left == null) {
            result = root.value + "";
            return result;
        }
        result = this.toString(root.left) + "" + result + " "+
             root.value + " " + this.toString(root.right) + " ";

        return result.trim();
    }

    findNode(value) {
        if(this.root == null) return false;
        let currentNode = this.root;
        while(currentNode != null){
        if (currentNode.value > value) {
            currentNode = currentNode.left;
        } else if (currentNode.value < value) {
            currentNode = currentNode.right;
        } else if(currentNode.value === value){
            return true;
        }
    }

        return false;
    }
}

test('insert', () => {
    const bst = new BinarySearchTree();
    bst.insert(3);
    expect(bst.toString()).toBe('3');
    bst.insert(1);
    expect(bst.toString()).toBe('1 3');
    bst.insert(7);
    expect(bst.toString()).toBe('1 3 7');
    bst.insert(5);
    expect(bst.toString()).toBe('1 3 5 7');
});

test('delete', () => {
    const bst = new BinarySearchTree();
    bst.insert(3);
    expect(bst.toString()).toBe('3');
    bst.insert(1);
    expect(bst.toString()).toBe('1 3');
    bst.insert(7);
    expect(bst.toString()).toBe('1 3 7');
    bst.insert(5);
    expect(bst.toString()).toBe('1 3 5 7');
    bst.delete(3);
    expect(bst.toString()).toBe('1 5 7');
    
});
test('toString', () => {
    const bst = new BinarySearchTree();
    bst.insert(1);
    expect(bst.toString()).toBe('1');
    bst.root.right = new Node(2);
    expect(bst.toString()).toBe('1 2');
    bst.root.left = new Node(0);
    expect(bst.toString()).toBe('0 1 2');
    bst.root.right.right = new Node(3);
    expect(bst.toString()).toBe('0 1 2 3');

    const bst1 = new BinarySearchTree();
    bst1.insert(3);
    bst1.insert(1);
    expect(bst1.toString()).toBe('1 3');

});

test('findNode', () => {
    const bst = new BinarySearchTree();
    expect(bst.findNode(1)).toBe(false);
    bst.insert(5);
    expect(bst.findNode(5)).toBe(true);
    bst.insert(3);
    expect(bst.findNode(3)).toBe(true);
    bst.insert(7);
    expect(bst.findNode(7)).toBe(true);
    bst.insert(2);
    expect(bst.findNode(2)).toBe(true);
    bst.delete(5);
    expect(bst.toString()).toBe('2 3 7');
    expect(bst.findNode(5)).toBe(false);
    
})