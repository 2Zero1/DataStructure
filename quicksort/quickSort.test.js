const quickSort = (phoneBook) => {
    
    if(phoneBook.length === 0) {
        return [];
    }

    const pivot = phoneBook[phoneBook.length-1];
    
    const lesserThan = [];
    const greaterThan = [];

    phoneBook.pop();

    phoneBook.forEach(element => {
        if(element.phone < pivot.phone) {
            lesserThan.push(element);
            return
        }
        greaterThan.push(element);
    });

    return [...quickSort(lesserThan), pivot, ...quickSort(greaterThan)]
}


test('quickSort', () => {
    const phoneBook = [
        {name : 'f', phone : '6'}, 
        {name : 'b', phone : '2'},
        {name : 'd', phone : '4'},
        {name : 'c', phone : '3'},
        {name : 'a', phone : '1'},
        {name : 'e', phone : '5'},     
    ];

    const expectedResult = [
        {name : 'a', phone : '1'},
        {name : 'b', phone : '2'},
        {name : 'c', phone : '3'},
        {name : 'd', phone : '4'},
        {name : 'e', phone : '5'},     
        {name : 'f', phone : '6'}, 
    ];

    expect(quickSort(
        [
            {name : 'b', phone : '2'},
            {name : 'a', phone : '1'}
        ]))
        .toEqual(
            [
                {name : 'a', phone : '1'},
                {name : 'b', phone : '2'}
            ]
            );
    expect(quickSort(
        [
            {name : 'c', phone : '3'},
            {name : 'b', phone : '2'},
            {name : 'a', phone : '1'}
        ]))
        .toEqual(
            [
                {name : 'a', phone : '1'},
                {name : 'b', phone : '2'}, 
                {name : 'c', phone : '3'}
            ]
            );

    expect(quickSort(phoneBook)).toEqual(expectedResult);
    
})