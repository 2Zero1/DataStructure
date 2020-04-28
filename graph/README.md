# Graph

## 이해

1. 버텍스가 존재한다.
2. 간선이 있다.
3. 방향이 존재할 수도 없을 수도 있다.

## 계획

1. addVertex를 넣는다.
2. addEdge
3. addDirectedEdge
4. isConnected
5. hasVertex
6. getGraph
7. deleteVertex
    - 방향이 있는 경우
      - 있는 경우, 해당 vertex를 삭제한다.
    - 방향이 없는 경우
      - 없는 경우, 해당 vertex를 삭제하기 전에 모든 연결된 애들 vertex에 있는 vertex를 삭제한 후에 해당 vertex를삭제한다.
8. deleteEdge
    - 방향이 있는 경우
      - from to 가 있을 경우, from에서 to를 삭제한다.
    - 방향이 없는 경우
      - from과 to에서 서로를 삭제한다.
9. 내일 이 버전을 나눠서 진행한다.

## 실행

## 회고
