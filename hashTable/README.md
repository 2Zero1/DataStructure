# HashMap

## 이해

1. Key-Value type의 저장소이다.
2. Hash를 사용하여 key를 index를 변경하고, index를 이용하여 array에 저장한다.
3. 시간 복잡도는 O(1)이며 최악일 경우, O(n)이다.
4. index를 얻기 위해 array의 크기로 나눠 나머지값으로 결정하는데, 중복되는 경우가 있기 때문에, LinkedList를 동일한 index에 여러 Key-Value 데이터를 저장할 수 있다.
5. 동일한 key값 set(key, value)로 입력할 경우 이전의 value가 새로운 것에 의해 덮어씌워진다.

## 계획

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

## 실행

## 회고
