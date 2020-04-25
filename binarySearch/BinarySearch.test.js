/*
1. quick sort를 사용.
2. 중앙값을 구한다. 중앙값은 배열의 길이를 나눠 ceil한 값을 사용한다.
3. 중앙값과 내가 찾는 값이 동일한지 비교한다.
4. 크면 오른쪽으로 작으면 왼쪽으로 탐색을 진행한다.
5. 찾을때 까지 반복하며, 못찾았을 경우엔 null 반환한다.
*/


const quickSort = (phoneBook) => {

    if(phoneBook.length === 0) {
        return [];
    }

    const pivot = phoneBook[phoneBook.length-1];

    const lesserThan = [];
    const greaterThan = [];

    
    const phoneBookCopy = phoneBook.slice(0, phoneBook.length-1);

    phoneBookCopy.forEach(element => {
        if(element.phone < pivot.phone) {
            lesserThan.push(element);
            return
        }
        greaterThan.push(element);
    });

    return [...quickSort(lesserThan), pivot, ...quickSort(greaterThan)]
}

const binarySearch = (phoneBook,value, start = 0, end = phoneBook.length - 1) => {
    
    if(start > end) {
        return null;
    }
    const sortedPhoneBook = quickSort(phoneBook);

    const middleIndex = Math.ceil((start + end)/2);

    if(sortedPhoneBook[middleIndex].phone == value) {
        return middleIndex;
    }
    if(sortedPhoneBook[middleIndex].phone > value) {
        return binarySearch(sortedPhoneBook, value, start, middleIndex-1);
    }
    if(sortedPhoneBook[middleIndex].phone < value) {
        return binarySearch(sortedPhoneBook, value, middleIndex+1, end);    
    }
}

test('binarySearch', () => {
    const phoneBook = [
        {name : 'f', phone : '6'}, 
        {name : 'b', phone : '2'},
        {name : 'd', phone : '4'},
        {name : 'c', phone : '3'},
        {name : 'a', phone : '1'},
        {name : 'e', phone : '5'},     
    ];

    expect(binarySearch(
        [
            {name : 'b', phone : '2'},
            {name : 'a', phone : '1'}
        ], '1'))
        .toBe(0);

    expect(binarySearch(
        phoneBook, '1'))
        .toBe(0);
    expect(binarySearch(
        phoneBook, '2'))
        .toBe(1);
    expect(binarySearch(
        phoneBook, '3'))
        .toBe(2);
    expect(binarySearch(
        phoneBook, '4'))
        .toBe(3);
    expect(binarySearch(
        phoneBook, '5'))
        .toBe(4);
    expect(binarySearch(
        phoneBook, '6'))
        .toBe(5);
    expect(binarySearch(
        phoneBook, '7'))
        .toBe(null);
    expect(binarySearch(
        phoneBook, '0'))
        .toBe(null);
});
