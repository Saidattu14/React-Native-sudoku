//Takes the sudoku and create a new array by locking the elements in the sudoku
export function sudoku_number_locker(input)
{
    var a = input
    var b= [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ];
    for(let i = 0; i<= 8;i++)
    {
        for(let j = 0; j<=8;j++)
        {
            if(a[i][j] == 0)
            {
             b[i][j] = 0;
            }
            else
            {
                b[i][j] = 1;
            }
        }
    }
    return b;
} 
