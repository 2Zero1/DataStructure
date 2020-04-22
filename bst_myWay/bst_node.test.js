/*

*/

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BST {
    constructor() {
        this.root = null;
    }
    isEmpty() {
        return this.root === null;
    }

    insert(value) {
        if (this.isEmpty()) {
            this.root = new Node(value);
        } else {
            this.searchTree(value, this.root);
        }
    }
    searchTree(value, node) {
            if (value > node.value) {
                node.right === null 
                ? node.right = new Node(value) 
                : this.searchTree(value, node.right);
            }else if (value < node.value) {
                node.left === null
                ? node.left = new Node(value)
                : this.searchTree(value, node.left);
            }
    }
    toString (node = this.root) {
        if (node==null) {
            return "";
        }
        
        return (this.toString(node.left)+" " + node.value +" "+ this.toString(node.right)).trim();

        // return node==null 
        //     ? "" : this.toString(node.left)+node.value+" "+this.toString(node.right).trim();
    }
    findMinNode (node = this.root) {
        while (node != null && node.left) {
            node = node.left;
        }
        return node == null ? null : node.value;
    }

    delete(value) {
        this.root = this.deleteSearch(this.root, value);
    }

    deleteSearch(root, value) {
        if (root == null) {
            return null;
        } else if (value < root.value) {
            root.left = this.deleteSearch(root.left, value);
        } else if(value > root.value) {
            root.right = this.deleteSearch(root.right, value);
        } else {
            if(root.left === null && root.right === null) {
                return null;
            } else if (root.left === null) {
                root = root.right;
                return root;
            } else if (root.right === null) {
                root = root.left;
                return root;
            } else {
                const tmp = this.findMinNode(root.right);
                root.value = tmp.value;
                root.right = this.deleteSearch(root.right, tmp.value);
                return root;
            }
        }
    }

    
}
describe('BinarySearchTree', () => {
    describe('constructor', () => {
        it('creates empty BinarySearchTree', () => {
            const bst = new BST();
            expect(bst.isEmpty()).toBe(true);
        });
    });
    describe('findMinNode', () => {
        describe('when Binary searchTree is empty', () => {
            it('findMinNode return null', () => {
                const bst = new BST();
                expect(bst.findMinNode()).toBe(null);
                bst.insert(8);
                expect(bst.findMinNode()).toBe(8);
                bst.insert(7);
                expect(bst.findMinNode()).toBe(7);
                bst.insert(9);
                bst.insert(6);
                bst.insert(1);
                bst.insert(11);
                bst.insert(5);
                expect(bst.findMinNode()).toBe(1);
            })
        });
    });

    describe('toString', () => {
        describe('when BinarySearchTree is empty', () => {
            it('prints nothing', () => {
                const bst = new BST();
                expect(bst.toString()).toBe('');
            });
        });
        describe('when BinarySearchTree is not empty', () => {
            it('prints every node from smaller until biggest', () => {
                const bst = new BST();
                expect(bst.toString()).toBe('');
                bst.insert(5);
                expect(bst.toString()).toBe('5');

                const bst1 = new BST();
                expect(bst1.toString()).toBe('');
                bst1.insert(5);
                bst1.insert(4);
                expect(bst1.toString()).toBe('4 5');

                const bst2 = new BST();
                expect(bst2.toString()).toBe('');
                bst2.insert(5);
                bst2.insert(4);
                bst2.insert(3);
                bst2.insert(2);
                bst2.insert(1);
                expect(bst2.toString()).toBe('1 2 3 4 5');

                const bst3 = new BST();
                expect(bst3.toString()).toBe('');
                bst3.insert(5);
                expect(bst3.toString()).toBe('5');
                bst3.insert(9);
                expect(bst3.toString()).toBe('5 9');
        
            });
        });
    });
    
    describe('insert', () => {
        // describe('when, with, without')
        describe('when BinarySearchTree is empty', () => {
            it('inserts new node into BinarySearchTree\'s root', () => {
                const bst = new BST();
                bst.insert(1);
                expect(bst.root.value).toBe(1);
                expect(bst.isEmpty()).toBe(false);
            })
        });
        describe('when BinarySearchTree is not empty', () => {
            describe('when new node have greater value than current node', () => {
                it('inserts new node into right subtree', () => {
                    const bst = new BST();
                    bst.insert(5);
                    expect(bst.root.value).toBe(5);
                    expect(bst.isEmpty()).toBe(false);
                    bst.insert(6);
                    expect(bst.root.right.value).toBe(6);
                    bst.insert(7);
                    expect(bst.root.right.right.value).toBe(7);
                    bst.insert(8);
                    expect(bst.root.right.right.right.value).toBe(8);

                });
            });
            describe('when new node have smaller value than current node', () => {
                it('inserts new node into left subtree', () => {
                    const bst = new BST();
                    bst.insert(5);
                    expect(bst.root.value).toBe(5);
                    expect(bst.isEmpty()).toBe(false);
                    bst.insert(4);
                    expect(bst.root.left.value).toBe(4);
                    bst.insert(3);
                    expect(bst.root.left.left.value).toBe(3);
                    bst.insert(2);
                    expect(bst.root.left.left.left.value).toBe(2);
                });
            });
        });

        describe('delete', () => {
          describe('when BST is empty', () => {
              it('delete nothing', () => {
                  const bst = new BST();
                  bst.delete(1);
                  expect(bst.isEmpty()).toBe(true);
              })
            
          });
          describe('when BST is not empty', () => {
          it('delete that node from BST', () => {
            const bst = new BST();
            expect(bst.toString()).toBe("");
            bst.insert(4);
            expect(bst.root.value).toBe(4);
            bst.delete(4);
            expect(bst.isEmpty()).toBe(true);

            const bst1 = new BST();
            bst1.insert(5);
            bst1.insert(4);
            bst1.insert(6);
            expect(bst1.toString()).toBe("4 5 6");
            bst1.delete(4);
            expect(bst1.toString()).toBe("5 6");

          });
            }); 
        });

       
        
        describe('when BinarySearchTree is not empty', () => {

            const bst = new BST();
            bst.insert(5);
            expect(bst.root.value).toBe(5);
            expect(bst.isEmpty()).toBe(false);
            bst.insert(6);
            expect(bst.root.right.value).toBe(6);
            bst.insert(4);
            expect(bst.root.left.value).toBe(4);
            bst.insert(3);
            expect(bst.root.left.left.value).toBe(3);

        });

        test('test', () => {
            const a = (node) => {
                node = new Node(1);
            }
            const bst = new BST();
            bst.insert(5);
            bst.insert(6);
            bst.insert(7);
            expect(bst.toString()).toBe('5 6 7');
            // a(bst.right);
            // expect(bst.toString()).toBe('5');
        });
        // it('inserts new node into BinarySearchTree', () => {
        //     const bst = new BST();
        //     expect(bst.isEmpty()).toBe(true);
        //     bst.insert(1);
        //     expect(bst.root.value).toBe(1);
        // })
    });
});
